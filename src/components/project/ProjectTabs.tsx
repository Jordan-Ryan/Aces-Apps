'use client'

import { Project } from '@/types/Project'
import { useState } from 'react'
import { FileText, Code, DollarSign, Calendar, ExternalLink } from 'lucide-react'
import { OverviewTab } from './tabs/OverviewTab'
import { DevelopmentTab } from './tabs/DevelopmentTab'
import { BusinessTab } from './tabs/BusinessTab'
import { PlanningTab } from './tabs/PlanningTab'
import { LinksTab } from './tabs/LinksTab'

interface ProjectTabsProps {
  project: Project
  isEditing: boolean
  onUpdate: (project: Project) => void
}

const tabs = [
  { id: 'overview', label: 'Overview', icon: FileText },
  { id: 'development', label: 'Development', icon: Code },
  { id: 'business', label: 'Business', icon: DollarSign },
  { id: 'planning', label: 'Planning', icon: Calendar },
  { id: 'links', label: 'Links', icon: ExternalLink }
]

export function ProjectTabs({ project, isEditing, onUpdate }: ProjectTabsProps) {
  const [activeTab, setActiveTab] = useState('overview')

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab project={project} isEditing={isEditing} onUpdate={onUpdate} />
      case 'development':
        return <DevelopmentTab project={project} isEditing={isEditing} onUpdate={onUpdate} />
      case 'business':
        return <BusinessTab project={project} isEditing={isEditing} onUpdate={onUpdate} />
      case 'planning':
        return <PlanningTab project={project} isEditing={isEditing} onUpdate={onUpdate} />
      case 'links':
        return <LinksTab project={project} isEditing={isEditing} onUpdate={onUpdate} />
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
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center ${
                activeTab === tab.id
                  ? 'border-accent-500 text-accent-600 dark:text-accent-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
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