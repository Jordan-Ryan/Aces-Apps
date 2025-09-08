'use client'

import { Project } from '@/types/Project'
import { useState } from 'react'
import { DollarSign, Target, TrendingUp, Users, AlertCircle, CheckCircle } from 'lucide-react'

interface BusinessTabProps {
  project: Project
  isEditing: boolean
  onUpdate: (project: Project) => void
}

export function BusinessTab({ project, isEditing, onUpdate }: BusinessTabProps) {
  const [editingField, setEditingField] = useState<string | null>(null)

  const handleUpdate = (field: string, value: any) => {
    onUpdate({
      ...project,
      details: {
        ...project.details,
        business: {
          ...project.details.business,
          [field]: value
        }
      }
    })
  }

  const handleBusinessRiskUpdate = (index: number, value: string) => {
    const newRisks = [...project.details.business.businessRisks]
    newRisks[index] = value
    handleUpdate('businessRisks', newRisks)
  }

  const addBusinessRisk = () => {
    handleUpdate('businessRisks', [...project.details.business.businessRisks, ''])
  }

  const removeBusinessRisk = (index: number) => {
    const newRisks = project.details.business.businessRisks.filter((_, i) => i !== index)
    handleUpdate('businessRisks', newRisks)
  }

  return (
    <div className="space-y-6">
      {/* Monetization Strategy */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <DollarSign className="w-5 h-5 mr-2 text-green-600" />
          Monetization Strategy
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Revenue Model
            </label>
            {isEditing ? (
              <select
                value={project.monetization}
                onChange={(e) => onUpdate({ ...project, monetization: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-void-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-jewel-500 focus:border-transparent"
              >
                <option value="Free">Free</option>
                <option value="Freemium">Freemium</option>
                <option value="Paid">Paid</option>
                <option value="Subscription">Subscription</option>
                <option value="Ads">Ads</option>
              </select>
            ) : (
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  project.monetization === 'Free' ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300' :
                  project.monetization === 'Freemium' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300' :
                  project.monetization === 'Paid' ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300' :
                  'bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300'
                }`}>
                  {project.monetization}
                </span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Estimated Cost
            </label>
            {isEditing ? (
              <input
                type="number"
                value={project.estimatedCost}
                onChange={(e) => onUpdate({ ...project, estimatedCost: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-void-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-jewel-500 focus:border-transparent"
                placeholder="0"
              />
            ) : (
              <p className="text-gray-600 dark:text-gray-300">${project.estimatedCost.toLocaleString()}</p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Detailed Strategy
          </label>
          {isEditing ? (
            <textarea
              value={project.details.business.monetizationStrategy}
              onChange={(e) => handleUpdate('monetizationStrategy', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-void-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-jewel-500 focus:border-transparent resize-none"
              rows={3}
              placeholder="Describe your revenue model in detail..."
            />
          ) : (
            <p className="text-gray-600 dark:text-gray-300">{project.details.business.monetizationStrategy}</p>
          )}
        </div>
      </div>

      {/* Market Analysis */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2 text-blue-600" />
          Market Analysis
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Target Market Size
            </label>
            {isEditing ? (
              <input
                type="text"
                value={project.details.business.targetMarketSize}
                onChange={(e) => handleUpdate('targetMarketSize', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-void-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-jewel-500 focus:border-transparent"
                placeholder="e.g., 1M+ potential users"
              />
            ) : (
              <p className="text-gray-600 dark:text-gray-300">{project.details.business.targetMarketSize}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Unique Value Proposition
            </label>
            {isEditing ? (
              <input
                type="text"
                value={project.details.business.uniqueValueProposition}
                onChange={(e) => handleUpdate('uniqueValueProposition', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-void-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-jewel-500 focus:border-transparent"
                placeholder="What makes you different?"
              />
            ) : (
              <p className="text-gray-600 dark:text-gray-300">{project.details.business.uniqueValueProposition}</p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Competitor Analysis
          </label>
          {isEditing ? (
            <textarea
              value={project.details.business.competitorAnalysis}
              onChange={(e) => handleUpdate('competitorAnalysis', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-void-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-jewel-500 focus:border-transparent resize-none"
              rows={4}
              placeholder="Analyze your main competitors and how you differentiate..."
            />
          ) : (
            <p className="text-gray-600 dark:text-gray-300">{project.details.business.competitorAnalysis}</p>
          )}
        </div>
      </div>

      {/* Pricing Strategy */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
          Pricing Strategy
        </h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Pricing Details
          </label>
          {isEditing ? (
            <textarea
              value={project.details.business.pricingStrategy}
              onChange={(e) => handleUpdate('pricingStrategy', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-void-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-jewel-500 focus:border-transparent resize-none"
              rows={3}
              placeholder="Describe your pricing tiers, free trial periods, etc..."
            />
          ) : (
            <p className="text-gray-600 dark:text-gray-300">{project.details.business.pricingStrategy}</p>
          )}
        </div>
      </div>

      {/* Market Validation */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2 text-indigo-600" />
          Market Validation
        </h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Validation Results
          </label>
          {isEditing ? (
            <textarea
              value={project.details.business.marketValidation}
              onChange={(e) => handleUpdate('marketValidation', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-void-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-jewel-500 focus:border-transparent resize-none"
              rows={3}
              placeholder="What validation have you done? User interviews, surveys, MVP testing..."
            />
          ) : (
            <p className="text-gray-600 dark:text-gray-300">{project.details.business.marketValidation}</p>
          )}
        </div>
      </div>

      {/* Business Risks */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2 text-red-500" />
          Business Risks
        </h3>
        
        {isEditing ? (
          <div className="space-y-3">
            {project.details.business.businessRisks.map((risk, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="flex-1">
                  <textarea
                    value={risk}
                    onChange={(e) => handleBusinessRiskUpdate(index, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-void-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-jewel-500 focus:border-transparent resize-none"
                    rows={2}
                    placeholder="Describe the business risk and mitigation strategy"
                  />
                </div>
                <button
                  onClick={() => removeBusinessRisk(index)}
                  className="text-red-500 hover:text-red-700 mt-2"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              onClick={addBusinessRisk}
              className="text-jewel-600 hover:text-jewel-700 text-sm flex items-center"
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Add Business Risk
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {project.details.business.businessRisks.length > 0 ? (
              project.details.business.businessRisks.map((risk, index) => (
                <div key={index} className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-red-800 dark:text-red-300 text-sm">{risk}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 italic">No business risks identified</p>
            )}
          </div>
        )}
      </div>

      {/* Business Metrics */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Business Metrics
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              ${project.estimatedCost.toLocaleString()}
            </div>
            <div className="text-sm text-green-800 dark:text-green-300">Estimated Cost</div>
          </div>
          
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {project.monetization}
            </div>
            <div className="text-sm text-blue-800 dark:text-blue-300">Revenue Model</div>
          </div>
          
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {project.details.business.businessRisks.length}
            </div>
            <div className="text-sm text-red-800 dark:text-red-300">Business Risks</div>
          </div>
        </div>
      </div>
    </div>
  )
}
