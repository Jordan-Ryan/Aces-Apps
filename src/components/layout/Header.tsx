'use client'

import { User } from 'lucide-react'
import { ThemeSwitcher } from '@/components/themes/ThemeSwitcher'

export function Header() {

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

          </div>
        </div>

      </div>
    </header>
  )
}


