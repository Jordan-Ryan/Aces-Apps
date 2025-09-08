'use client'

import { Project } from '@/types/Project'
import { useState } from 'react'
import { OverviewTab } from './tabs/OverviewTab'
import { FeaturesTab } from './tabs/FeaturesTab'
import { TechnicalTab } from './tabs/TechnicalTab'
import { TimelineTab } from './tabs/TimelineTab'
import { ResourcesTab } from './tabs/ResourcesTab'

interface ProjectTabsProps {
  project: Project
  isEditing: boolean
  onUpdate: (project: Project) => void
}

const tabs = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'features', label: 'Features', icon: '✨' },
  { id: 'technical', label: 'Technical', icon: '⚙️' },
  { id: 'timeline', label: 'Timeline', icon: '📅' },
  { id: 'resources', label: 'Resources', icon: '📚' }
]

export function ProjectTabs({ project, isEditing, onUpdate }: ProjectTabsProps) {
  const [activeTab, setActiveTab] = useState('overview')

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab project={project} isEditing={isEditing} onUpdate={onUpdate} />
      case 'features':
        return <FeaturesTab project={project} isEditing={isEditing} onUpdate={onUpdate} />
      case 'technical':
        return <TechnicalTab project={project} isEditing={isEditing} onUpdate={onUpdate} />
      case 'timeline':
        return <TimelineTab project={project} isEditing={isEditing} onUpdate={onUpdate} />
      case 'resources':
        return <ResourcesTab project={project} isEditing={isEditing} onUpdate={onUpdate} />
      default:
        return <OverviewTab project={project} isEditing={isEditing} onUpdate={onUpdate} />
    }
  }

  return (
    <div className="bg-white dark:bg-void-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-accent-500 text-accent-600 dark:text-accent-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  )
}
