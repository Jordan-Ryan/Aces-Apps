'use client'

import { Project } from '@/types/Project'

interface OverviewTabProps {
  project: Project
  isEditing: boolean
  onUpdate: (project: Project) => void
}

export function OverviewTab({ project, isEditing, onUpdate }: OverviewTabProps) {
  const handleTextChange = (field: string, value: string) => {
    if (isEditing) {
      onUpdate({
        ...project,
        details: {
          ...project.details,
          [field]: value
        }
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Problem Statement */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Problem Statement
        </h3>
        {isEditing ? (
          <textarea
            value={project.details.problemStatement}
            onChange={(e) => handleTextChange('problemStatement', e.target.value)}
            className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent-500 focus:border-transparent resize-none"
            rows={4}
            placeholder="Describe the problem this project aims to solve..."
          />
        ) : (
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {project.details.problemStatement}
          </p>
        )}
      </div>

      {/* Target Users */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Target Users
        </h3>
        {isEditing ? (
          <textarea
            value={project.details.targetUsers}
            onChange={(e) => handleTextChange('targetUsers', e.target.value)}
            className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent-500 focus:border-transparent resize-none"
            rows={2}
            placeholder="Who are the target users for this project?"
          />
        ) : (
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {project.details.targetUsers}
          </p>
        )}
      </div>

      {/* Goals */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Goals
        </h3>
        {isEditing ? (
          <textarea
            value={project.details.goals}
            onChange={(e) => handleTextChange('goals', e.target.value)}
            className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent-500 focus:border-transparent resize-none"
            rows={3}
            placeholder="What are the main goals of this project?"
          />
        ) : (
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {project.details.goals}
          </p>
        )}
      </div>

      {/* Technology Stack */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Technology Stack
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.technology.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-accent-100 dark:bg-accent-900/20 text-accent-800 dark:text-accent-300 text-sm rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
