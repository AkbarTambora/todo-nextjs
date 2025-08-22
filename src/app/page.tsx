import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Target, Trophy, Users, Zap, Star } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 gradient-bg opacity-90"></div>
        <div className="relative container mx-auto px-4">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Kelola Tugasmu dengan
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Gamifikasi
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              Tingkatkan produktivitas dengan sistem poin, streak, dan leaderboard. 
              Jadikan menyelesaikan tugas sebagai sebuah permainan yang menyenangkan!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signin">
                <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold px-8 py-3">
                  Mulai Sekarang
                </Button>
              </Link>
              <Link href="/demo">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 font-semibold px-8 py-3">
                  Lihat Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating Cards Animation */}
        <div className="absolute top-20 left-10 opacity-20">
          <CheckCircle className="w-12 h-12 text-white animate-pulse" />
        </div>
        <div className="absolute top-40 right-20 opacity-20">
          <Trophy className="w-16 h-16 text-yellow-300 animate-bounce" />
        </div>
        <div className="absolute bottom-20 left-1/4 opacity-20">
          <Star className="w-8 h-8 text-white animate-ping" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Fitur yang Membuat Perbedaan
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Lebih dari sekadar todo list biasa. Dapatkan motivasi ekstra dengan fitur gamifikasi yang engaging.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="glass-effect hover:shadow-xl transition-all duration-300 border-0">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Sistem Poin</CardTitle>
                <CardDescription>
                  Dapatkan poin setiap kali menyelesaikan tugas. Semakin sulit tugasnya, semakin besar poinnya!
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-effect hover:shadow-xl transition-all duration-300 border-0">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Streak Harian</CardTitle>
                <CardDescription>
                  Pertahankan konsistensi dengan streak harian. Semakin lama streak, semakin tinggi multiplier poin!
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-effect hover:shadow-xl transition-all duration-300 border-0">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Leaderboard</CardTitle>
                <CardDescription>
                  Berkompetisi dengan teman atau kolega. Lihat siapa yang paling produktif minggu ini!
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-effect hover:shadow-xl transition-all duration-300 border-0">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Achievement</CardTitle>
                <CardDescription>
                  Unlock berbagai pencapaian dan badge. Dari "First Task" hingga "Productivity Master"!
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-effect hover:shadow-xl transition-all duration-300 border-0">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Tim & Kolaborasi</CardTitle>
                <CardDescription>
                  Buat tim dengan rekan kerja atau teman. Kerja sama untuk mencapai target bersama.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-effect hover:shadow-xl transition-all duration-300 border-0">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-green-500 rounded-xl flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Analytics</CardTitle>
                <CardDescription>
                  Lihat insight produktivitas harian, mingguan, dan bulanan dengan grafik yang menarik.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Siap Meningkatkan Produktivitas?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan pengguna yang sudah merasakan perbedaannya. 
            Mulai perjalanan produktivitas Anda hari ini!
          </p>
          <Link href="/auth/signin">
            <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg">
              Daftar Gratis Sekarang
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">TodoApp Modern</h3>
            <p className="text-gray-400 mb-6">
              Aplikasi todo dengan gamifikasi untuk produktivitas maksimal
            </p>
            <div className="flex justify-center space-x-6">
              <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                Tentang
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                Kontak
              </Link>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800">
              <p className="text-gray-400">
                © 2024 TodoApp Modern. All rights reserved. Made with ❤️ for productivity.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}