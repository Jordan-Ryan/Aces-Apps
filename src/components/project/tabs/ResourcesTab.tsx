'use client'

import { Project } from '@/types/Project'
import { Users, Link, FileText, ExternalLink } from 'lucide-react'

interface ResourcesTabProps {
  project: Project
  isEditing: boolean
  onUpdate: (project: Project) => void
}

export function ResourcesTab({ project, isEditing, onUpdate }: ResourcesTabProps) {
  const handleTeamChange = (index: number, value: string) => {
    if (isEditing) {
      const updatedTeam = [...project.team]
      updatedTeam[index] = value
      
      onUpdate({
        ...project,
        team: updatedTeam
      })
    }
  }

  const addTeamMember = () => {
    if (isEditing) {
      onUpdate({
        ...project,
        team: [...project.team, 'New Team Member']
      })
    }
  }

  const removeTeamMember = (index: number) => {
    if (isEditing && project.team.length > 1) {
      const updatedTeam = project.team.filter((_, i) => i !== index)
      onUpdate({
        ...project,
        team: updatedTeam
      })
    }
  }

  return (
    <div className="space-y-8">
      {/* Team Members */}
      <div>
        <h3 className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white mb-4">
          <Users className="w-5 h-5 text-jewel-600" />
          <span>Team Members</span>
        </h3>
        
        <div className="space-y-3">
          {project.team.map((member, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-jewel-600 dark:text-jewel-400 font-medium text-sm">
                  {member.charAt(0).toUpperCase()}
                </span>
              </div>
              
              {isEditing ? (
                <div className="flex-1 flex items-center space-x-2">
                  <input
                    type="text"
                    value={member}
                    onChange={(e) => handleTeamChange(index, e.target.value)}
                    className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    placeholder="Team member name..."
                  />
                  {project.team.length > 1 && (
                    <button
                      onClick={() => removeTeamMember(index)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                    >
                      ×
                    </button>
                  )}
                </div>
              ) : (
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {member}
                </span>
              )}
            </div>
          ))}
        </div>

        {isEditing && (
          <button
            onClick={addTeamMember}
            className="mt-4 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            + Add Team Member
          </button>
        )}
      </div>

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

      {/* Quick Links */}
      <div>
        <h3 className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white mb-4">
          <Link className="w-5 h-5 text-jewel-600" />
          <span>Quick Links</span>
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
    </div>
  )
}
