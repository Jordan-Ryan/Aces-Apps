'use client'

import { Project } from '@/types/Project'
import { useState } from 'react'
import { Code, Database, Globe, AlertTriangle, CheckCircle } from 'lucide-react'

interface DevelopmentTabProps {
  project: Project
  isEditing: boolean
  onUpdate: (project: Project) => void
}

export function DevelopmentTab({ project, isEditing, onUpdate }: DevelopmentTabProps) {
  const [editingField, setEditingField] = useState<string | null>(null)

  const handleUpdate = (field: string, value: any) => {
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

  const handleRiskUpdate = (index: number, value: string) => {
    const newRisks = [...project.details.technical.risks]
    newRisks[index] = value
    handleUpdate('risks', newRisks)
  }

  const addRisk = () => {
    handleUpdate('risks', [...project.details.technical.risks, ''])
  }

  const removeRisk = (index: number) => {
    const newRisks = project.details.technical.risks.filter((_, i) => i !== index)
    handleUpdate('risks', newRisks)
  }

  return (
    <div className="space-y-6">
      {/* Tech Stack */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Code className="w-5 h-5 mr-2 text-jewel-600" />
          Technology Stack
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Frontend
            </label>
            {isEditing ? (
              <input
                type="text"
                value={project.details.technical.frontend}
                onChange={(e) => handleUpdate('frontend', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-void-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-jewel-500 focus:border-transparent"
                placeholder="e.g., React Native, Flutter, Swift"
              />
            ) : (
              <p className="text-gray-600 dark:text-gray-300">{project.details.technical.frontend}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Backend
            </label>
            {isEditing ? (
              <input
                type="text"
                value={project.details.technical.backend}
                onChange={(e) => handleUpdate('backend', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-void-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-jewel-500 focus:border-transparent"
                placeholder="e.g., Node.js, Python, Firebase"
              />
            ) : (
              <p className="text-gray-600 dark:text-gray-300">{project.details.technical.backend}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Database
            </label>
            {isEditing ? (
              <input
                type="text"
                value={project.details.technical.database}
                onChange={(e) => handleUpdate('database', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-void-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-jewel-500 focus:border-transparent"
                placeholder="e.g., PostgreSQL, MongoDB, SQLite"
              />
            ) : (
              <p className="text-gray-600 dark:text-gray-300">{project.details.technical.database}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Platform
            </label>
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600 dark:text-gray-300">
                {project.technology.includes('React Native') ? 'Cross-platform' : 
                 project.technology.includes('iOS') ? 'iOS' :
                 project.technology.includes('Android') ? 'Android' : 'Web'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Integrations */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Database className="w-5 h-5 mr-2 text-jewel-600" />
          API Integrations
        </h3>
        
        {isEditing ? (
          <div className="space-y-2">
            {project.details.technical.integrations.map((integration, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={integration}
                  onChange={(e) => {
                    const newIntegrations = [...project.details.technical.integrations]
                    newIntegrations[index] = e.target.value
                    handleUpdate('integrations', newIntegrations)
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-void-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-jewel-500 focus:border-transparent"
                  placeholder="e.g., OpenAI API, Stripe, Google Maps"
                />
                <button
                  onClick={() => {
                    const newIntegrations = project.details.technical.integrations.filter((_, i) => i !== index)
                    handleUpdate('integrations', newIntegrations)
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              onClick={() => handleUpdate('integrations', [...project.details.technical.integrations, ''])}
              className="text-jewel-600 hover:text-jewel-700 text-sm"
            >
              + Add Integration
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {project.details.technical.integrations.length > 0 ? (
              project.details.technical.integrations.map((integration, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-jewel-100 dark:bg-jewel-900/20 text-jewel-800 dark:text-jewel-300 text-sm rounded-full"
                >
                  {integration}
                </span>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 italic">No integrations specified</p>
            )}
          </div>
        )}
      </div>

      {/* Technical Risks */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
          Technical Risks & Mitigation
        </h3>
        
        {isEditing ? (
          <div className="space-y-3">
            {project.details.technical.risks.map((risk, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="flex-1">
                  <textarea
                    value={risk}
                    onChange={(e) => handleRiskUpdate(index, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-void-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-jewel-500 focus:border-transparent resize-none"
                    rows={2}
                    placeholder="Describe the risk and mitigation strategy"
                  />
                </div>
                <button
                  onClick={() => removeRisk(index)}
                  className="text-red-500 hover:text-red-700 mt-2"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              onClick={addRisk}
              className="text-jewel-600 hover:text-jewel-700 text-sm flex items-center"
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Add Risk
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {project.details.technical.risks.length > 0 ? (
              project.details.technical.risks.map((risk, index) => (
                <div key={index} className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-red-800 dark:text-red-300 text-sm">{risk}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 italic">No technical risks identified</p>
            )}
          </div>
        )}
      </div>

      {/* Development Status */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Development Status
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {project.progress}%
            </div>
            <div className="text-sm text-blue-800 dark:text-blue-300">Completion</div>
          </div>
          
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {project.details.technical.integrations.length}
            </div>
            <div className="text-sm text-green-800 dark:text-green-300">Integrations</div>
          </div>
          
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {project.details.technical.risks.length}
            </div>
            <div className="text-sm text-red-800 dark:text-red-300">Risks</div>
          </div>
        </div>
      </div>
    </div>
  )
}
