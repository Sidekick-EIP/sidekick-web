import './globals.css'
import { Inter } from 'next/font/google'
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sidekick',
  description: 'Sidekick web app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="min-h-screen flex flex-col">
      <body className='h-full flex flex-col flex-1 bg-[#151719]'>
        <Header />
        <div className='flex-1'>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
