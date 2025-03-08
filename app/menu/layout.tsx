import '../globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={inter.className}>
      {children}
    </div>
  )
}

