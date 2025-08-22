"use server"

import { prisma } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { Priority } from "@prisma/client"
import { getPointsForTask, calculateStreak } from "@/lib/utils"

export async function getTasks(page: number = 1, limit: number = 10) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    throw new Error("Unauthorized")
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  if (!user) {
    throw new Error("User not found")
  }

  const skip = (page - 1) * limit
  
  const [tasks, totalTasks] = await Promise.all([
    prisma.task.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      include: {
        category: true,
      }
    }),
    prisma.task.count({
      where: { userId: user.id }
    })
  ])

  const totalPages = Math.ceil(totalTasks / limit)

  return {
    tasks,
    pagination: {
      currentPage: page,
      totalPages,
      totalTasks,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    }
  }
}

export async function createTask(data: {
  title: string
  description?: string
  priority?: Priority
  dueDate?: Date
  categoryId?: string
}) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    throw new Error("Unauthorized")
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  if (!user) {
    throw new Error("User not found")
  }

  if (!data.title || data.title.trim().length < 3) {
    throw new Error("Title must be at least 3 characters long")
  }

  const pointsValue = getPointsForTask(data.priority || "MEDIUM")

  const task = await prisma.task.create({
    data: {
      title: data.title.trim(),
      description: data.description?.trim(),
      priority: data.priority || "MEDIUM",
      dueDate: data.dueDate,
      pointsValue,
      userId: user.id,
      categoryId: data.categoryId,
    },
    include: {
      category: true,
    }
  })

  revalidatePath("/dashboard")
  return task
}

export async function updateTask(id: string, data: {
  title?: string
  description?: string
  isCompleted?: boolean
  priority?: Priority
  dueDate?: Date
  categoryId?: string
}) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    throw new Error("Unauthorized")
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  if (!user) {
    throw new Error("User not found")
  }

  const existingTask = await prisma.task.findFirst({
    where: { id, userId: user.id }
  })

  if (!existingTask) {
    throw new Error("Task not found")
  }

  // If task is being completed, update user stats
  if (data.isCompleted && !existingTask.isCompleted) {
    await updateUserStatsOnTaskCompletion(user.id, existingTask.pointsValue)
  }

  const updateData: any = {
    ...data,
    completedAt: data.isCompleted ? new Date() : null,
  }

  // Recalculate points if priority changed
  if (data.priority && data.priority !== existingTask.priority) {
    updateData.pointsValue = getPointsForTask(data.priority)
  }

  const task = await prisma.task.update({
    where: { id },
    data: updateData,
    include: {
      category: true,
    }
  })

  revalidatePath("/dashboard")
  return task
}

export async function deleteTask(id: string) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    throw new Error("Unauthorized")
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  if (!user) {
    throw new Error("User not found")
  }

  const task = await prisma.task.findFirst({
    where: { id, userId: user.id }
  })

  if (!task) {
    throw new Error("Task not found")
  }

  await prisma.task.delete({
    where: { id }
  })

  revalidatePath("/dashboard")
  return { success: true }
}

async function updateUserStatsOnTaskCompletion(userId: string, points: number) {
  // Get or create user stats
  let userStats = await prisma.userStats.findUnique({
    where: { userId }
  })

  if (!userStats) {
    userStats = await prisma.userStats.create({
      data: { userId }
    })
  }

  // Get completed tasks to calculate streak
  const completedTasks = await prisma.task.findMany({
    where: { 
      userId,
      isCompleted: true,
      completedAt: { not: null }
    },
    select: { completedAt: true },
    orderBy: { completedAt: "desc" }
  })

  const completedDates = completedTasks
    .map(task => task.completedAt!)
    .filter(Boolean)

  const currentStreak = calculateStreak(completedDates)
  const bestStreak = Math.max(currentStreak, userStats.bestStreak)

  // Update user stats
  await prisma.userStats.update({
    where: { userId },
    data: {
      totalPoints: { increment: points },
      currentStreak,
      bestStreak,
      tasksCompleted: { increment: 1 },
    }
  })
}

export async function getUserStats() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    throw new Error("Unauthorized")
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      userStats: true,
      _count: {
        select: {
          tasks: true,
        }
      }
    }
  })

  if (!user) {
    throw new Error("User not found")
  }

  const totalTasks = user._count.tasks
  const completedTasks = await prisma.task.count({
    where: { 
      userId: user.id,
      isCompleted: true 
    }
  })

  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)
  
  const todayEnd = new Date()
  todayEnd.setHours(23, 59, 59, 999)

  const todayTasks = await prisma.task.count({
    where: {
      userId: user.id,
      createdAt: {
        gte: todayStart,
        lte: todayEnd
      }
    }
  })

  const todayCompleted = await prisma.task.count({
    where: {
      userId: user.id,
      isCompleted: true,
      completedAt: {
        gte: todayStart,
        lte: todayEnd
      }
    }
  })

  return {
    userStats: user.userStats || {
      totalPoints: 0,
      currentStreak: 0,
      bestStreak: 0,
      tasksCompleted: 0,
    },
    totalTasks,
    completedTasks,
    pendingTasks: totalTasks - completedTasks,
    todayTasks,
    todayCompleted,
    completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
  }
}