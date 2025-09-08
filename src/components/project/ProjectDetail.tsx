'use client'

import { Project } from '@/types/Project'
import { ProjectTabs } from './ProjectTabs'
import { useState } from 'react'
import { Edit, Save, X } from 'lucide-react'
import { useProjects } from '@/contexts/ProjectContext'

interface ProjectDetailProps {
  project: Project
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const { updateProject } = useProjects()
  const [isEditing, setIsEditing] = useState(false)
  const [editedProject, setEditedProject] = useState(project)

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

  const handleSave = () => {
    updateProject(project.id, editedProject)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedProject(project)
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      {/* Project Header */}
      <div className="bg-white dark:bg-void-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            {isEditing ? (
              <input
                type="text"
                value={editedProject.name}
                onChange={(e) => setEditedProject({ ...editedProject, name: e.target.value })}
                className="text-2xl font-bold text-gray-900 dark:text-white bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-jewel-500 focus:outline-none w-full"
              />
            ) : (
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {project.name}
              </h1>
            )}
            
            {isEditing ? (
              <textarea
                value={editedProject.description}
                onChange={(e) => setEditedProject({ ...editedProject, description: e.target.value })}
                className="mt-2 text-gray-600 dark:text-gray-400 bg-transparent border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:border-jewel-500 focus:outline-none w-full resize-none"
                rows={2}
              />
            ) : (
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {project.description}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
              {project.status}
            </span>
            
            {isEditing ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center space-x-1 px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </div>
            ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-1 px-3 py-1 bg-jewel-500 dark:bg-jewel-600 text-white rounded-md hover:bg-jewel-600 dark:hover:bg-jewel-700 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div 
              className="bg-accent-500 dark:bg-accent-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-500 dark:text-gray-400">Monetization</span>
            <p className="font-medium text-gray-900 dark:text-white">{project.monetization}</p>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Last Updated</span>
            <p className="font-medium text-gray-900 dark:text-white">
              {new Date(project.lastUpdated).toLocaleDateString()}
            </p>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Est. Completion</span>
            <p className="font-medium text-gray-900 dark:text-white">
              {new Date(project.estimatedCompletion).toLocaleDateString()}
            </p>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Technologies</span>
            <p className="font-medium text-gray-900 dark:text-white">{project.technology.length}</p>
          </div>
        </div>
      </div>

      {/* Project Tabs */}
      <ProjectTabs project={isEditing ? editedProject : project} isEditing={isEditing} onUpdate={setEditedProject} />
    </div>
  )
}
