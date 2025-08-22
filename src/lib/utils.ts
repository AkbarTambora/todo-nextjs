import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

export function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (diffInSeconds < 60) {
    return "Baru saja"
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes} menit yang lalu`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours} jam yang lalu`
  } else {
    const days = Math.floor(diffInSeconds / 86400)
    return `${days} hari yang lalu`
  }
}

export function calculateStreak(completedDates: Date[]): number {
  if (completedDates.length === 0) return 0
  
  const sortedDates = completedDates
    .map(date => new Date(date.getFullYear(), date.getMonth(), date.getDate()))
    .sort((a, b) => b.getTime() - a.getTime())
  
  let streak = 1
  let currentDate = sortedDates[0]
  
  for (let i = 1; i < sortedDates.length; i++) {
    const previousDate = new Date(currentDate)
    previousDate.setDate(previousDate.getDate() - 1)
    
    if (sortedDates[i].getTime() === previousDate.getTime()) {
      streak++
      currentDate = sortedDates[i]
    } else {
      break
    }
  }
  
  return streak
}

export function getPointsForTask(priority: string): number {
  switch (priority) {
    case "LOW":
      return 5
    case "MEDIUM":
      return 10
    case "HIGH":
      return 15
    case "URGENT":
      return 25
    default:
      return 10
  }
}

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case "LOW":
      return "text-green-600 bg-green-50"
    case "MEDIUM":
      return "text-blue-600 bg-blue-50"
    case "HIGH":
      return "text-orange-600 bg-orange-50"
    case "URGENT":
      return "text-red-600 bg-red-50"
    default:
      return "text-gray-600 bg-gray-50"
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}