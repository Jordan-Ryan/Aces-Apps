'use client'

import { Project } from '@/types/Project'
import { useState } from 'react'
import { Calendar, AlertTriangle, CheckCircle, DollarSign, Target, Rocket } from 'lucide-react'

interface PlanningTabProps {
  project: Project
  isEditing: boolean
  onUpdate: (project: Project) => void
}

export function PlanningTab({ project, isEditing, onUpdate }: PlanningTabProps) {
  const [editingField, setEditingField] = useState<string | null>(null)

  const handleUpdate = (field: string, value: any) => {
    onUpdate({
      ...project,
      details: {
        ...project.details,
        planning: {
          ...project.details.planning,
          [field]: value
        }
      }
    })
  }

  const handleBlockerUpdate = (index: number, value: string) => {
    const newBlockers = [...project.details.planning.currentBlockers]
    newBlockers[index] = value
    handleUpdate('currentBlockers', newBlockers)
  }

  const addBlocker = () => {
    handleUpdate('currentBlockers', [...project.details.planning.currentBlockers, ''])
  }

  const removeBlocker = (index: number) => {
    const newBlockers = project.details.planning.currentBlockers.filter((_, i) => i !== index)
    handleUpdate('currentBlockers', newBlockers)
  }

  const handleActionUpdate = (index: number, value: string) => {
    const newActions = [...project.details.planning.nextActions]
    newActions[index] = value
    handleUpdate('nextActions', newActions)
  }

  const addAction = () => {
    handleUpdate('nextActions', [...project.details.planning.nextActions, ''])
  }

  const removeAction = (index: number) => {
    const newActions = project.details.planning.nextActions.filter((_, i) => i !== index)
    handleUpdate('nextActions', newActions)
  }

  const handleMilestoneUpdate = (index: number, field: string, value: any) => {
    const newMilestones = [...project.details.planning.weeklyMilestones]
    newMilestones[index] = { ...newMilestones[index], [field]: value }
    handleUpdate('weeklyMilestones', newMilestones)
  }

  const addMilestone = () => {
    const newMilestone = {
      title: '',
      dueDate: '',
      completed: false,
      description: ''
    }
    handleUpdate('weeklyMilestones', [...project.details.planning.weeklyMilestones, newMilestone])
  }

  const removeMilestone = (index: number) => {
    const newMilestones = project.details.planning.weeklyMilestones.filter((_, i) => i !== index)
    handleUpdate('weeklyMilestones', newMilestones)
  }

  const handleCostUpdate = (field: string, value: number) => {
    const newCosts = { ...project.details.planning.estimatedCosts, [field]: value }
    newCosts.total = newCosts.developmentTools + newCosts.servicesApis + newCosts.appStoreFees + newCosts.marketingBudget
    handleUpdate('estimatedCosts', newCosts)
  }

  return (
    <div className="space-y-6">
      {/* Current Blockers */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
          Current Blockers
        </h3>
        
        {isEditing ? (
          <div className="space-y-3">
            {project.details.planning.currentBlockers.map((blocker, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="flex-1">
                  <textarea
                    value={blocker}
                    onChange={(e) => handleBlockerUpdate(index, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-void-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-jewel-500 focus:border-transparent resize-none"
                    rows={2}
                    placeholder="Describe what's blocking progress..."
                  />
                </div>
                <button
                  onClick={() => removeBlocker(index)}
                  className="text-red-500 hover:text-red-700 mt-2"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              onClick={addBlocker}
              className="text-jewel-600 hover:text-jewel-700 text-sm flex items-center"
            >
              <AlertTriangle className="w-4 h-4 mr-1" />
              Add Blocker
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {project.details.planning.currentBlockers.length > 0 ? (
              project.details.planning.currentBlockers.map((blocker, index) => (
                <div key={index} className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-red-800 dark:text-red-300 text-sm">{blocker}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 italic">No current blockers</p>
            )}
          </div>
        )}
      </div>

      {/* Next Actions */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
          Next Actions
        </h3>
        
        {isEditing ? (
          <div className="space-y-3">
            {project.details.planning.nextActions.map((action, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="flex-1">
                  <input
                    type="text"
                    value={action}
                    onChange={(e) => handleActionUpdate(index, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-void-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-jewel-500 focus:border-transparent"
                    placeholder="What needs to be done next?"
                  />
                </div>
                <button
                  onClick={() => removeAction(index)}
                  className="text-red-500 hover:text-red-700 mt-2"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              onClick={addAction}
              className="text-jewel-600 hover:text-jewel-700 text-sm flex items-center"
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Add Action
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {project.details.planning.nextActions.length > 0 ? (
              project.details.planning.nextActions.map((action, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-green-800 dark:text-green-300 text-sm">{action}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 italic">No next actions defined</p>
            )}
          </div>
        )}
      </div>

      {/* Weekly Milestones */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-blue-500" />
          Weekly Milestones
        </h3>
        
        {isEditing ? (
          <div className="space-y-4">
            {project.details.planning.weeklyMilestones.map((milestone, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={milestone.title}
                      onChange={(e) => handleMilestoneUpdate(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-void-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-jewel-500 focus:border-transparent"
                      placeholder="Milestone title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Due Date
                    </label>
                    <input
                      type="date"
                      value={milestone.dueDate}
                      onChange={(e) => handleMilestoneUpdate(index, 'dueDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-void-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-jewel-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    value={milestone.description}
                    onChange={(e) => handleMilestoneUpdate(index, 'description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-void-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-jewel-500 focus:border-transparent resize-none"
                    rows={2}
                    placeholder="Describe what needs to be accomplished"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={milestone.completed}
                      onChange={(e) => handleMilestoneUpdate(index, 'completed', e.target.checked)}
                      className="rounded border-gray-300 text-jewel-600 focus:ring-jewel-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Completed</span>
                  </label>
                  <button
                    onClick={() => removeMilestone(index)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={addMilestone}
              className="text-jewel-600 hover:text-jewel-700 text-sm flex items-center"
            >
              <Calendar className="w-4 h-4 mr-1" />
              Add Milestone
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {project.details.planning.weeklyMilestones.length > 0 ? (
              project.details.planning.weeklyMilestones.map((milestone, index) => (
                <div key={index} className={`p-3 rounded-lg border ${
                  milestone.completed 
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                    : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`font-medium ${
                      milestone.completed 
                        ? 'text-green-800 dark:text-green-300' 
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {milestone.title}
                    </h4>
                    <div className="flex items-center space-x-2">
                      {milestone.completed && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {milestone.dueDate}
                      </span>
                    </div>
                  </div>
                  <p className={`text-sm ${
                    milestone.completed 
                      ? 'text-green-700 dark:text-green-400' 
                      : 'text-gray-600 dark:text-gray-300'
                  }`}>
                    {milestone.description}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 italic">No milestones defined</p>
            )}
          </div>
        )}
      </div>

      {/* Cost Breakdown */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <DollarSign className="w-5 h-5 mr-2 text-green-500" />
          Cost Breakdown
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Development Tools
            </label>
            {isEditing ? (
              <input
                type="number"
                value={project.details.planning.estimatedCosts.developmentTools}
                onChange={(e) => handleCostUpdate('developmentTools', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-void-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-jewel-500 focus:border-transparent"
                placeholder="0"
              />
            ) : (
              <p className="text-gray-600 dark:text-gray-300">${project.details.planning.estimatedCosts.developmentTools.toLocaleString()}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Services & APIs
            </label>
            {isEditing ? (
              <input
                type="number"
                value={project.details.planning.estimatedCosts.servicesApis}
                onChange={(e) => handleCostUpdate('servicesApis', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-void-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-jewel-500 focus:border-transparent"
                placeholder="0"
              />
            ) : (
              <p className="text-gray-600 dark:text-gray-300">${project.details.planning.estimatedCosts.servicesApis.toLocaleString()}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              App Store Fees
            </label>
            {isEditing ? (
              <input
                type="number"
                value={project.details.planning.estimatedCosts.appStoreFees}
                onChange={(e) => handleCostUpdate('appStoreFees', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-void-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-jewel-500 focus:border-transparent"
                placeholder="0"
              />
            ) : (
              <p className="text-gray-600 dark:text-gray-300">${project.details.planning.estimatedCosts.appStoreFees.toLocaleString()}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Marketing Budget
            </label>
            {isEditing ? (
              <input
                type="number"
                value={project.details.planning.estimatedCosts.marketingBudget}
                onChange={(e) => handleCostUpdate('marketingBudget', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-void-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-jewel-500 focus:border-transparent"
                placeholder="0"
              />
            ) : (
              <p className="text-gray-600 dark:text-gray-300">${project.details.planning.estimatedCosts.marketingBudget.toLocaleString()}</p>
            )}
          </div>
        </div>

        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-900 dark:text-white">Total Estimated Cost</span>
            <span className="text-2xl font-bold text-jewel-600 dark:text-jewel-400">
              ${project.details.planning.estimatedCosts.total.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Launch Strategy */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Rocket className="w-5 h-5 mr-2 text-purple-500" />
          Launch Strategy
        </h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Launch Plan
          </label>
          {isEditing ? (
            <textarea
              value={project.launchStrategy}
              onChange={(e) => onUpdate({ ...project, launchStrategy: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-void-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-jewel-500 focus:border-transparent resize-none"
              rows={4}
              placeholder="Describe your launch strategy, marketing approach, and timeline..."
            />
          ) : (
            <p className="text-gray-600 dark:text-gray-300">{project.launchStrategy}</p>
          )}
        </div>
      </div>

      {/* Planning Summary */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Planning Summary
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {project.details.planning.currentBlockers.length}
            </div>
            <div className="text-sm text-red-800 dark:text-red-300">Blockers</div>
          </div>
          
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {project.details.planning.nextActions.length}
            </div>
            <div className="text-sm text-green-800 dark:text-green-300">Next Actions</div>
          </div>
          
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {project.details.planning.weeklyMilestones.length}
            </div>
            <div className="text-sm text-blue-800 dark:text-blue-300">Milestones</div>
          </div>
          
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              ${project.details.planning.estimatedCosts.total.toLocaleString()}
            </div>
            <div className="text-sm text-purple-800 dark:text-purple-300">Total Cost</div>
          </div>
        </div>
      </div>
    </div>
  )
}
