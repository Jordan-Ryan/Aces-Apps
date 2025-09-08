'use client'

import { Project } from '@/types/Project'
import { CheckCircle, Circle, AlertCircle } from 'lucide-react'

interface FeaturesTabProps {
  project: Project
  isEditing: boolean
  onUpdate: (project: Project) => void
}

export function FeaturesTab({ project, isEditing, onUpdate }: FeaturesTabProps) {
  const handleFeatureToggle = (category: keyof typeof project.details.features, index: number) => {
    if (isEditing) {
      const updatedFeatures = { ...project.details.features }
      const feature = updatedFeatures[category][index]
      
      // Simple toggle - in a real app, you'd have a completed field
      console.log(`Toggled ${category} feature: ${feature}`)
    }
  }

  const FeatureList = ({ 
    title, 
    features, 
    category, 
    icon, 
    color 
  }: { 
    title: string
    features: string[]
    category: keyof typeof project.details.features
    icon: React.ReactNode
    color: string
  }) => (
    <div className="space-y-3">
      <h4 className="flex items-center space-x-2 text-md font-semibold text-gray-900 dark:text-white">
        <span className={color}>{icon}</span>
        <span>{title}</span>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          ({features.length})
        </span>
      </h4>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start space-x-3">
            <button
              onClick={() => handleFeatureToggle(category, index)}
              className="mt-0.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              disabled={!isEditing}
            >
              <Circle className="w-4 h-4" />
            </button>
            <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div className="space-y-8">
      <div className="grid gap-8">
        <FeatureList
          title="Must Have"
          features={project.details.features.mustHave}
          category="mustHave"
          icon={<AlertCircle className="w-5 h-5" />}
          color="text-red-500"
        />
        
        <FeatureList
          title="Should Have"
          features={project.details.features.shouldHave}
          category="shouldHave"
          icon={<CheckCircle className="w-5 h-5" />}
          color="text-yellow-500"
        />
        
        <FeatureList
          title="Could Have"
          features={project.details.features.couldHave}
          category="couldHave"
          icon={<Circle className="w-5 h-5" />}
          color="text-green-500"
        />
      </div>
    </div>
  )
}
