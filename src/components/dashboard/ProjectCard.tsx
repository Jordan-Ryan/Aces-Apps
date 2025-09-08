'use client'

import { Project } from '@/types/Project'
import { motion } from 'framer-motion'
import { Calendar, Users, Code, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Planning':
        return 'bg-blue-100 text-blue-800 dark:bg-jewel-900/20 dark:text-jewel-400'
      case 'In Progress':
        return 'bg-green-100 text-green-800 dark:bg-gray-700 dark:text-gray-300'
      case 'Review':
        return 'bg-yellow-100 text-yellow-800 dark:bg-gray-600 dark:text-gray-300'
      case 'Completed':
        return 'bg-gray-100 text-gray-800 dark:bg-stark-900/20 dark:text-stark-400'
      case 'On Hold':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-stark-900/20 dark:text-stark-400'
    }
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <Link href={`/project/${project.id}`}>
        <div className="bg-white dark:bg-void-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-200 cursor-pointer">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-jewel-600 dark:group-hover:text-jewel-400 transition-colors">
                {project.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                {project.description}
              </p>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
              {project.status}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
              <span>Progress</span>
              <span>{project.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-accent-500 dark:bg-accent-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>

          {/* Technology Stack */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {project.technology.slice(0, 3).map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-accent-100 dark:bg-accent-900/20 text-accent-800 dark:text-accent-300 text-xs rounded-md"
                >
                  {tech}
                </span>
              ))}
              {project.technology.length > 3 && (
                <span className="px-2 py-1 bg-accent-100 dark:bg-accent-900/20 text-accent-800 dark:text-accent-300 text-xs rounded-md">
                  +{project.technology.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-300">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{project.team.length}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(project.lastUpdated).toLocaleDateString()}</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
