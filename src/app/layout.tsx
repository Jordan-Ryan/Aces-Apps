import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { ProjectProvider } from '@/contexts/ProjectContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AcesApps - Project Management Tool',
  description: 'A modern web application for managing app development projects',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <ProjectProvider>
            {children}
          </ProjectProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
