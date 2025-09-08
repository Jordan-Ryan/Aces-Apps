'use client'

import { Project } from '@/types/Project'
import { Code, Database, Plug, AlertTriangle } from 'lucide-react'

interface TechnicalTabProps {
  project: Project
  isEditing: boolean
  onUpdate: (project: Project) => void
}

export function TechnicalTab({ project, isEditing, onUpdate }: TechnicalTabProps) {
  const handleTextChange = (field: string, value: string) => {
    if (isEditing) {
      onUpdate({
        ...project,
        details: {
          ...project.details,
          technical: {
            ...project.details.technical,
            [field]: value
          }
        }
      })
    }
  }

  const handleArrayChange = (field: 'integrations' | 'risks', value: string) => {
    if (isEditing) {
      const items = value.split('\n').filter(item => item.trim())
      onUpdate({
        ...project,
        details: {
          ...project.details,
          technical: {
            ...project.details.technical,
            [field]: items
          }
        }
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Architecture */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white mb-3">
            <Code className="w-5 h-5 text-jewel-600" />
            <span>Frontend</span>
          </h3>
          {isEditing ? (
            <input
              type="text"
              value={project.details.technical.frontend}
              onChange={(e) => handleTextChange('frontend', e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              placeholder="Frontend technology stack..."
            />
          ) : (
            <p className="text-gray-700 dark:text-gray-300">
              {project.details.technical.frontend}
            </p>
          )}
        </div>

        <div>
          <h3 className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white mb-3">
            <Code className="w-5 h-5 text-jewel-600" />
            <span>Backend</span>
          </h3>
          {isEditing ? (
            <input
              type="text"
              value={project.details.technical.backend}
              onChange={(e) => handleTextChange('backend', e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              placeholder="Backend technology stack..."
            />
          ) : (
            <p className="text-gray-700 dark:text-gray-300">
              {project.details.technical.backend}
            </p>
          )}
        </div>
      </div>

      {/* Database */}
      <div>
        <h3 className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white mb-3">
          <Database className="w-5 h-5 text-jewel-600" />
          <span>Database</span>
        </h3>
        {isEditing ? (
          <input
            type="text"
            value={project.details.technical.database}
            onChange={(e) => handleTextChange('database', e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            placeholder="Database technology..."
          />
        ) : (
          <p className="text-gray-700 dark:text-gray-300">
            {project.details.technical.database}
          </p>
        )}
      </div>

      {/* Integrations */}
      <div>
        <h3 className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white mb-3">
          <Plug className="w-5 h-5 text-jewel-600" />
          <span>Integrations</span>
        </h3>
        {isEditing ? (
          <textarea
            value={project.details.technical.integrations.join('\n')}
            onChange={(e) => handleArrayChange('integrations', e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent-500 focus:border-transparent resize-none"
            rows={4}
            placeholder="One integration per line..."
          />
        ) : (
          <div className="flex flex-wrap gap-2">
            {project.details.technical.integrations.map((integration, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 text-sm rounded-full"
              >
                {integration}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Risks */}
      <div>
        <h3 className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white mb-3">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <span>Technical Risks</span>
        </h3>
        {isEditing ? (
          <textarea
            value={project.details.technical.risks.join('\n')}
            onChange={(e) => handleArrayChange('risks', e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent-500 focus:border-transparent resize-none"
            rows={4}
            placeholder="One risk per line..."
          />
        ) : (
          <ul className="space-y-2">
            {project.details.technical.risks.map((risk, index) => (
              <li key={index} className="flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300 text-sm">
                  {risk}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
