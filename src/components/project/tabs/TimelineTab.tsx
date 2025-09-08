'use client'

import { Project } from '@/types/Project'
import { Calendar, Clock, CheckCircle } from 'lucide-react'

interface TimelineTabProps {
  project: Project
  isEditing: boolean
  onUpdate: (project: Project) => void
}

export function TimelineTab({ project, isEditing, onUpdate }: TimelineTabProps) {
  const handlePhaseChange = (index: number, field: string, value: string) => {
    if (isEditing) {
      const updatedTimeline = [...project.details.timeline]
      updatedTimeline[index] = {
        ...updatedTimeline[index],
        [field]: value
      }
      
      onUpdate({
        ...project,
        details: {
          ...project.details,
          timeline: updatedTimeline
        }
      })
    }
  }

  const handleDeliverableChange = (phaseIndex: number, deliverableIndex: number, value: string) => {
    if (isEditing) {
      const updatedTimeline = [...project.details.timeline]
      updatedTimeline[phaseIndex].deliverables[deliverableIndex] = value
      
      onUpdate({
        ...project,
        details: {
          ...project.details,
          timeline: updatedTimeline
        }
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {project.details.timeline.map((phase, phaseIndex) => (
          <div key={phaseIndex} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                {isEditing ? (
                  <input
                    type="text"
                    value={phase.phase}
                    onChange={(e) => handlePhaseChange(phaseIndex, 'phase', e.target.value)}
                    className="text-lg font-semibold text-gray-900 dark:text-white bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-jewel-500 focus:outline-none w-full"
                    placeholder="Phase name..."
                  />
                ) : (
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {phase.phase}
                  </h3>
                )}
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                {isEditing ? (
                  <input
                    type="text"
                    value={phase.duration}
                    onChange={(e) => handlePhaseChange(phaseIndex, 'duration', e.target.value)}
                    className="bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-jewel-500 focus:outline-none w-20"
                    placeholder="Duration..."
                  />
                ) : (
                  <span>{phase.duration}</span>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">
                Deliverables
              </h4>
              <ul className="space-y-2">
                {phase.deliverables.map((deliverable, deliverableIndex) => (
                  <li key={deliverableIndex} className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={deliverable}
                        onChange={(e) => handleDeliverableChange(phaseIndex, deliverableIndex, e.target.value)}
                        className="flex-1 text-gray-700 dark:text-gray-300 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-jewel-500 focus:outline-none"
                        placeholder="Deliverable..."
                      />
                    ) : (
                      <span className="text-gray-700 dark:text-gray-300 text-sm">
                        {deliverable}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {isEditing && (
        <button
          onClick={() => {
            const newPhase = {
              phase: 'New Phase',
              duration: '4w',
              deliverables: ['New deliverable']
            }
            onUpdate({
              ...project,
              details: {
                ...project.details,
                timeline: [...project.details.timeline, newPhase]
              }
            })
          }}
          className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:border-jewel-500 hover:text-jewel-600 dark:hover:text-jewel-400 transition-colors"
        >
          + Add Phase
        </button>
      )}
    </div>
  )
}
