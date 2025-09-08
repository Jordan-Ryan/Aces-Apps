'use client'

import { Search, User, Menu } from 'lucide-react'
import { ThemeSwitcher } from '@/components/themes/ThemeSwitcher'
import { useState } from 'react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white dark:bg-void-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-jewel-500 dark:bg-jewel-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                AcesApps
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex items-center space-x-6">
              <a href="/" className="text-gray-700 dark:text-gray-300 hover:text-jewel-600 dark:hover:text-jewel-400 transition-colors">
                Dashboard
              </a>
              <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-jewel-600 dark:hover:text-jewel-400 transition-colors">
                Projects
              </a>
              <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-jewel-600 dark:hover:text-jewel-400 transition-colors">
                Analytics
              </a>
            </nav>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <ThemeSwitcher />
            
            {/* User profile */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </div>
              <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">
                Owner
              </span>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col space-y-2">
              <a href="/" className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-jewel-600 dark:hover:text-jewel-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors">
                Dashboard
              </a>
              <a href="#" className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-jewel-600 dark:hover:text-jewel-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors">
                Projects
              </a>
              <a href="#" className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-jewel-600 dark:hover:text-jewel-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors">
                Analytics
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
