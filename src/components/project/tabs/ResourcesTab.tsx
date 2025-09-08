'use client'

import { Project } from '@/types/Project'
import { FileText, Link, ExternalLink, Download, Upload } from 'lucide-react'

interface ResourcesTabProps {
  project: Project
  isEditing: boolean
  onUpdate: (project: Project) => void
}

export function ResourcesTab({ project, isEditing, onUpdate }: ResourcesTabProps) {
  return (
    <div className="space-y-8">
      {/* Technology Stack */}
      <div>
        <h3 className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white mb-4">
          <FileText className="w-5 h-5 text-jewel-600" />
          <span>Technology Stack</span>
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {project.technology.map((tech, index) => (
            <div
              key={index}
              className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-center text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {tech}
            </div>
          ))}
        </div>
      </div>

      {/* Project Resources */}
      <div>
        <h3 className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white mb-4">
          <Link className="w-5 h-5 text-jewel-600" />
          <span>Project Resources</span>
        </h3>
        
        <div className="space-y-3">
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <ExternalLink className="w-4 h-4 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Project Repository</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  GitHub repository for this project
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <ExternalLink className="w-4 h-4 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Design System</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Figma design files and style guide
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <ExternalLink className="w-4 h-4 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Documentation</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Technical documentation and API specs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Import/Export */}
      <div>
        <h3 className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white mb-4">
          <Download className="w-5 h-5 text-jewel-600" />
          <span>Data Management</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left">
            <div className="flex items-center space-x-3">
              <Download className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Export Project</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Download project data as JSON
                </p>
              </div>
            </div>
          </button>

          <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left">
            <div className="flex items-center space-x-3">
              <Upload className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Import Data</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Import project data from file
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Project Statistics */}
      <div>
        <h3 className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white mb-4">
          <FileText className="w-5 h-5 text-jewel-600" />
          <span>Project Statistics</span>
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {project.technology.length}
            </div>
            <div className="text-sm text-blue-800 dark:text-blue-300">Technologies</div>
          </div>
          
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {project.progress}%
            </div>
            <div className="text-sm text-green-800 dark:text-green-300">Progress</div>
          </div>
          
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {project.details.features.mustHave.length}
            </div>
            <div className="text-sm text-purple-800 dark:text-purple-300">Must-Have Features</div>
          </div>
          
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {project.estimatedCost > 0 ? `$${project.estimatedCost.toLocaleString()}` : 'N/A'}
            </div>
            <div className="text-sm text-orange-800 dark:text-orange-300">Est. Cost</div>
          </div>
        </div>
      </div>
    </div>
  )
}