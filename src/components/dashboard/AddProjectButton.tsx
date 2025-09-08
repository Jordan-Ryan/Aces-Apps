'use client'

import { Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

export function AddProjectButton() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="bg-jewel-500 hover:bg-jewel-600 dark:bg-jewel-600 dark:hover:bg-jewel-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2"
        aria-label="Add new project"
      >
        <Plus className="w-6 h-6" />
        {isHovered && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            className="whitespace-nowrap font-medium"
          >
            New Project
          </motion.span>
        )}
      </button>
    </motion.div>
  )
}
