'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, FileText, Plus, CheckCircle, AlertCircle } from 'lucide-react'
import { AddProjectState, NewProjectForm, ParsedProject } from '@/types/NewProject'
import { parseTemplate, validateProject, generateProjectId } from '@/utils/templateParser'
import { useProjects } from '@/contexts/ProjectContext'
import { Project } from '@/types/Project'

interface AddProjectModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddProjectModal({ isOpen, onClose }: AddProjectModalProps) {
  const { addProject } = useProjects()
  const [state, setState] = useState<AddProjectState>({
    isOpen: false,
    activeTab: 'template',
    templateContent: '',
    parsedData: null,
    formData: {
      name: '',
      description: '',
      status: 'Planning',
      technology: [],
      estimatedTimeline: '12 weeks',
      teamSize: 1,
      complexity: 'Medium'
    },
    errors: [],
    isLoading: false
  })

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  const handleTemplateParse = () => {
    if (!state.templateContent.trim()) {
      setState(prev => ({ ...prev, errors: ['Please paste template content'] }))
      return
    }

    setState(prev => ({ ...prev, isLoading: true, errors: [] }))

    setTimeout(() => {
      const parsed = parseTemplate(state.templateContent)
      
      if (!parsed) {
        setState(prev => ({ 
          ...prev, 
          isLoading: false, 
          errors: ['Failed to parse template. Please check the format and try again.'] 
        }))
        return
      }

      const errors = validateProject(parsed)
      if (errors.length > 0) {
        setState(prev => ({ 
          ...prev, 
          isLoading: false, 
          errors 
        }))
        return
      }

      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        parsedData: parsed,
        formData: {
          name: parsed.name,
          description: parsed.description,
          status: parsed.status,
          technology: parsed.technology,
          estimatedTimeline: parsed.estimatedTimeline,
          teamSize: parsed.teamSize,
          complexity: parsed.complexity
        }
      }))
    }, 1000)
  }

  const handleCreateProject = () => {
    const projectData = state.activeTab === 'template' ? state.parsedData : state.formData
    
    if (!projectData) {
      setState(prev => ({ ...prev, errors: ['No project data available'] }))
      return
    }

    const errors = validateProject(projectData as ParsedProject)
    if (errors.length > 0) {
      setState(prev => ({ ...prev, errors }))
      return
    }

    // Convert to Project format
    const newProject: Omit<Project, 'id'> = {
      name: projectData.name,
      description: projectData.description,
      status: projectData.status,
      technology: projectData.technology,
      progress: 0,
      lastUpdated: new Date().toISOString().split('T')[0],
      estimatedCompletion: new Date(Date.now() + 12 * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      monetization: projectData.monetization || 'Free',
      estimatedCost: projectData.estimatedCost || 0,
      currentBlockers: projectData.currentBlockers || [],
      nextMilestones: projectData.nextMilestones || [],
      marketValidation: projectData.marketValidation || '',
      competitorAnalysis: projectData.competitorAnalysis || '',
      launchStrategy: projectData.launchStrategy || '',
      details: state.activeTab === 'template' && state.parsedData ? {
        ...state.parsedData.details,
        business: {
          monetizationStrategy: '',
          revenueModel: '',
          targetMarketSize: '',
          competitorAnalysis: '',
          uniqueValueProposition: '',
          pricingStrategy: '',
          marketValidation: '',
          businessRisks: []
        },
        planning: {
          currentBlockers: [],
          nextActions: [],
          weeklyMilestones: [],
          learningRequirements: [],
          estimatedCosts: {
            developmentTools: 0,
            servicesApis: 0,
            appStoreFees: 0,
            marketingBudget: 0,
            total: 0
          },
          launchChecklist: [],
          postLaunchPlan: ''
        },
        links: {
          development: {
            github: '',
            figma: '',
            cursor: '',
            gptSpace: ''
          },
          business: {
            competitorResearch: [],
            marketResearch: [],
            analytics: ''
          },
          marketing: {
            landingPage: '',
            socialMedia: [],
            pressKit: ''
          },
          legal: {
            privacyPolicy: '',
            termsOfService: '',
            appStoreGuidelines: ''
          }
        }
      } : {
        problemStatement: 'Problem statement to be defined',
        targetUsers: 'Target users to be defined',
        goals: 'Project goals to be defined',
        features: {
          mustHave: ['Core functionality'],
          shouldHave: [],
          couldHave: []
        },
        technical: {
          frontend: 'Frontend technology to be determined',
          backend: 'Backend technology to be determined',
          database: 'Database technology to be determined',
          integrations: [],
          risks: []
        },
        business: {
          monetizationStrategy: '',
          revenueModel: '',
          targetMarketSize: '',
          competitorAnalysis: '',
          uniqueValueProposition: '',
          pricingStrategy: '',
          marketValidation: '',
          businessRisks: []
        },
        planning: {
          currentBlockers: [],
          nextActions: [],
          weeklyMilestones: [],
          learningRequirements: [],
          estimatedCosts: {
            developmentTools: 0,
            servicesApis: 0,
            appStoreFees: 0,
            marketingBudget: 0,
            total: 0
          },
          launchChecklist: [],
          postLaunchPlan: ''
        },
        links: {
          development: {
            github: '',
            figma: '',
            cursor: '',
            gptSpace: ''
          },
          business: {
            competitorResearch: [],
            marketResearch: [],
            analytics: ''
          },
          marketing: {
            landingPage: '',
            socialMedia: [],
            pressKit: ''
          },
          legal: {
            privacyPolicy: '',
            termsOfService: '',
            appStoreGuidelines: ''
          }
        },
        timeline: [
          { phase: 'Planning', duration: '4w', deliverables: ['Requirements', 'Design'] },
          { phase: 'Development', duration: '8w', deliverables: ['Core features', 'Testing'] }
        ]
      }
    }

    addProject(newProject)
    onClose()
    
    // Reset state
    setState({
      isOpen: false,
      activeTab: 'template',
      templateContent: '',
      parsedData: null,
      formData: {
        name: '',
        description: '',
        status: 'Planning',
        technology: [],
        estimatedTimeline: '12 weeks',
        teamSize: 1,
        complexity: 'Medium'
      },
      errors: [],
      isLoading: false
    })
  }

  const handleFormChange = (field: keyof NewProjectForm, value: any) => {
    setState(prev => ({
      ...prev,
      formData: { ...prev.formData, [field]: value }
    }))
  }

  const addTechnology = (tech: string) => {
    if (tech.trim() && !state.formData.technology.includes(tech.trim())) {
      setState(prev => ({
        ...prev,
        formData: {
          ...prev.formData,
          technology: [...prev.formData.technology, tech.trim()]
        }
      }))
    }
  }

  const removeTechnology = (tech: string) => {
    setState(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        technology: prev.formData.technology.filter(t => t !== tech)
      }
    }))
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-void-800 rounded-lg shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Add New Project
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setState(prev => ({ ...prev, activeTab: 'template', errors: [] }))}
              className={`flex-1 flex items-center justify-center space-x-2 px-6 py-4 font-medium transition-colors ${
                state.activeTab === 'template'
                  ? 'text-accent-600 dark:text-accent-400 border-b-2 border-accent-500'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>From Template</span>
            </button>
            <button
              onClick={() => setState(prev => ({ ...prev, activeTab: 'scratch', errors: [] }))}
              className={`flex-1 flex items-center justify-center space-x-2 px-6 py-4 font-medium transition-colors ${
                state.activeTab === 'scratch'
                  ? 'text-accent-600 dark:text-accent-400 border-b-2 border-accent-500'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>From Scratch</span>
            </button>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {state.activeTab === 'template' ? (
              <TemplateTab
                templateContent={state.templateContent}
                onContentChange={(content) => setState(prev => ({ ...prev, templateContent: content }))}
                onParse={handleTemplateParse}
                parsedData={state.parsedData}
                isLoading={state.isLoading}
              />
            ) : (
              <ScratchTab
                formData={state.formData}
                onFormChange={handleFormChange}
                onAddTechnology={addTechnology}
                onRemoveTechnology={removeTechnology}
              />
            )}

            {/* Errors */}
            {state.errors.length > 0 && (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-red-800 dark:text-red-400 mb-1">
                      Please fix the following errors:
                    </h4>
                    <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                      {state.errors.map((error, index) => (
                        <li key={index}>• {error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateProject}
              disabled={state.isLoading || (state.activeTab === 'template' && !state.parsedData)}
              className="px-6 py-2 bg-accent-500 text-white rounded-lg hover:bg-accent-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              {state.isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Create Project</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// Template Tab Component
function TemplateTab({
  templateContent,
  onContentChange,
  onParse,
  parsedData,
  isLoading
}: {
  templateContent: string
  onContentChange: (content: string) => void
  onParse: () => void
  parsedData: ParsedProject | null
  isLoading: boolean
}) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Paste AI-Generated Template
        </label>
        <textarea
          value={templateContent}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder="Paste your AI-generated project template here..."
          className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-void-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-accent-500 focus:border-transparent resize-none"
        />
      </div>

      <button
        onClick={onParse}
        disabled={!templateContent.trim() || isLoading}
        className="w-full px-4 py-2 bg-jewel-500 text-white rounded-lg hover:bg-jewel-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Parsing Template...</span>
          </>
        ) : (
          <>
            <FileText className="w-4 h-4" />
            <span>Parse Template</span>
          </>
        )}
      </button>

      {parsedData && (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-start space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-green-800 dark:text-green-400 mb-2">
                Template Parsed Successfully!
              </h4>
              <div className="text-sm text-green-700 dark:text-green-300 space-y-1">
                <p><strong>Project:</strong> {parsedData.name}</p>
                <p><strong>Description:</strong> {parsedData.description}</p>
                <p><strong>Technologies:</strong> {parsedData.technology.join(', ')}</p>
                <p><strong>Team Size:</strong> {parsedData.teamSize} people</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Scratch Tab Component
function ScratchTab({
  formData,
  onFormChange,
  onAddTechnology,
  onRemoveTechnology
}: {
  formData: NewProjectForm
  onFormChange: (field: keyof NewProjectForm, value: any) => void
  onAddTechnology: (tech: string) => void
  onRemoveTechnology: (tech: string) => void
}) {
  const [newTech, setNewTech] = useState('')

  const handleAddTech = () => {
    if (newTech.trim()) {
      onAddTechnology(newTech)
      setNewTech('')
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Project Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => onFormChange('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-void-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            placeholder="Enter project name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Status
          </label>
          <select
            value={formData.status}
            onChange={(e) => onFormChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-void-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent-500 focus:border-transparent"
          >
            <option value="Planning">Planning</option>
            <option value="In Progress">In Progress</option>
            <option value="Review">Review</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Description *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => onFormChange('description', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-void-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-accent-500 focus:border-transparent resize-none"
          rows={3}
          placeholder="Describe your project"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Technologies *
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.technology.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-accent-100 dark:bg-accent-900/20 text-accent-800 dark:text-accent-300 text-sm rounded-full flex items-center space-x-2"
            >
              <span>{tech}</span>
              <button
                onClick={() => onRemoveTechnology(tech)}
                className="text-accent-600 dark:text-accent-400 hover:text-accent-800 dark:hover:text-accent-200"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            value={newTech}
            onChange={(e) => setNewTech(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTech()}
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-void-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            placeholder="Add technology"
          />
          <button
            onClick={handleAddTech}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Timeline
          </label>
          <input
            type="text"
            value={formData.estimatedTimeline}
            onChange={(e) => onFormChange('estimatedTimeline', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-void-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            placeholder="e.g., 12 weeks"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Team Size
          </label>
          <input
            type="number"
            min="1"
            value={formData.teamSize}
            onChange={(e) => onFormChange('teamSize', parseInt(e.target.value) || 1)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-void-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Complexity
          </label>
          <select
            value={formData.complexity}
            onChange={(e) => onFormChange('complexity', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-void-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent-500 focus:border-transparent"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>
    </div>
  )
}
