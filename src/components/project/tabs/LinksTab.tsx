'use client'

import { Project } from '@/types/Project'
import { useState } from 'react'
import { ExternalLink, Github, Figma, Code, BarChart3, Globe, FileText, Shield } from 'lucide-react'

interface LinksTabProps {
  project: Project
  isEditing: boolean
  onUpdate: (project: Project) => void
}

export function LinksTab({ project, isEditing, onUpdate }: LinksTabProps) {
  const [editingField, setEditingField] = useState<string | null>(null)

  const handleUpdate = (category: string, field: string, value: any) => {
    onUpdate({
      ...project,
      details: {
        ...project.details,
        links: {
          ...project.details.links,
          [category]: {
            ...project.details.links[category as keyof typeof project.details.links],
            [field]: value
          }
        }
      }
    })
  }

  const handleArrayUpdate = (category: string, field: string, index: number, value: string) => {
    const currentArray = project.details.links[category as keyof typeof project.details.links][field as keyof any] as string[]
    const newArray = [...currentArray]
    newArray[index] = value
    handleUpdate(category, field, newArray)
  }

  const addArrayItem = (category: string, field: string) => {
    const currentArray = project.details.links[category as keyof typeof project.details.links][field as keyof any] as string[]
    handleUpdate(category, field, [...currentArray, ''])
  }

  const removeArrayItem = (category: string, field: string, index: number) => {
    const currentArray = project.details.links[category as keyof typeof project.details.links][field as keyof any] as string[]
    const newArray = currentArray.filter((_, i) => i !== index)
    handleUpdate(category, field, newArray)
  }

  const LinkInput = ({ value, onChange, placeholder, icon: Icon }: { value: string, onChange: (value: string) => void, placeholder: string, icon: any }) => (
    <div className="flex items-center space-x-2">
      <Icon className="w-4 h-4 text-gray-400 flex-shrink-0" />
      {isEditing ? (
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-void-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-jewel-500 focus:border-transparent"
          placeholder={placeholder}
        />
      ) : (
        <div className="flex-1">
          {value ? (
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-jewel-600 dark:text-jewel-400 hover:text-jewel-700 dark:hover:text-jewel-300 underline"
            >
              {value}
            </a>
          ) : (
            <span className="text-gray-500 dark:text-gray-400 italic">Not set</span>
          )}
        </div>
      )}
    </div>
  )

  return (
    <div className="space-y-8">
      {/* Development Links */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Code className="w-5 h-5 mr-2 text-blue-500" />
          Development
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              GitHub Repository
            </label>
            <LinkInput
              value={project.details.links.development.github}
              onChange={(value) => handleUpdate('development', 'github', value)}
              placeholder="https://github.com/username/repo"
              icon={Github}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Figma Design
            </label>
            <LinkInput
              value={project.details.links.development.figma}
              onChange={(value) => handleUpdate('development', 'figma', value)}
              placeholder="https://figma.com/file/..."
              icon={Figma}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Cursor Workspace
            </label>
            <LinkInput
              value={project.details.links.development.cursor}
              onChange={(value) => handleUpdate('development', 'cursor', value)}
              placeholder="https://cursor.sh/workspace/..."
              icon={Code}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              GPT Space
            </label>
            <LinkInput
              value={project.details.links.development.gptSpace}
              onChange={(value) => handleUpdate('development', 'gptSpace', value)}
              placeholder="https://chat.openai.com/g/..."
              icon={ExternalLink}
            />
          </div>
        </div>
      </div>

      {/* Business Links */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-green-500" />
          Business Research
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Analytics Dashboard
            </label>
            <LinkInput
              value={project.details.links.business.analytics}
              onChange={(value) => handleUpdate('business', 'analytics', value)}
              placeholder="https://analytics.google.com/..."
              icon={BarChart3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Competitor Research
            </label>
            {isEditing ? (
              <div className="space-y-2">
                {project.details.links.business.competitorResearch.map((link, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="url"
                      value={link}
                      onChange={(e) => handleArrayUpdate('business', 'competitorResearch', index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-void-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-jewel-500 focus:border-transparent"
                      placeholder="https://competitor.com"
                    />
                    <button
                      onClick={() => removeArrayItem('business', 'competitorResearch', index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem('business', 'competitorResearch')}
                  className="text-jewel-600 hover:text-jewel-700 text-sm"
                >
                  + Add Competitor Link
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {project.details.links.business.competitorResearch.length > 0 ? (
                  project.details.links.business.competitorResearch.map((link, index) => (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-jewel-600 dark:text-jewel-400 hover:text-jewel-700 dark:hover:text-jewel-300 underline"
                    >
                      {link}
                    </a>
                  ))
                ) : (
                  <span className="text-gray-500 dark:text-gray-400 italic">No competitor links</span>
                )}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Market Research
            </label>
            {isEditing ? (
              <div className="space-y-2">
                {project.details.links.business.marketResearch.map((link, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="url"
                      value={link}
                      onChange={(e) => handleArrayUpdate('business', 'marketResearch', index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-void-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-jewel-500 focus:border-transparent"
                      placeholder="https://research.com"
                    />
                    <button
                      onClick={() => removeArrayItem('business', 'marketResearch', index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem('business', 'marketResearch')}
                  className="text-jewel-600 hover:text-jewel-700 text-sm"
                >
                  + Add Research Link
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {project.details.links.business.marketResearch.length > 0 ? (
                  project.details.links.business.marketResearch.map((link, index) => (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-jewel-600 dark:text-jewel-400 hover:text-jewel-700 dark:hover:text-jewel-300 underline"
                    >
                      {link}
                    </a>
                  ))
                ) : (
                  <span className="text-gray-500 dark:text-gray-400 italic">No research links</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Marketing Links */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Globe className="w-5 h-5 mr-2 text-purple-500" />
          Marketing
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Landing Page
            </label>
            <LinkInput
              value={project.details.links.marketing.landingPage}
              onChange={(value) => handleUpdate('marketing', 'landingPage', value)}
              placeholder="https://yourapp.com"
              icon={Globe}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Press Kit
            </label>
            <LinkInput
              value={project.details.links.marketing.pressKit}
              onChange={(value) => handleUpdate('marketing', 'pressKit', value)}
              placeholder="https://press.yourapp.com"
              icon={FileText}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Social Media
            </label>
            {isEditing ? (
              <div className="space-y-2">
                {project.details.links.marketing.socialMedia.map((link, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="url"
                      value={link}
                      onChange={(e) => handleArrayUpdate('marketing', 'socialMedia', index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-void-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-jewel-500 focus:border-transparent"
                      placeholder="https://twitter.com/yourapp"
                    />
                    <button
                      onClick={() => removeArrayItem('marketing', 'socialMedia', index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem('marketing', 'socialMedia')}
                  className="text-jewel-600 hover:text-jewel-700 text-sm"
                >
                  + Add Social Media Link
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {project.details.links.marketing.socialMedia.length > 0 ? (
                  project.details.links.marketing.socialMedia.map((link, index) => (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-jewel-600 dark:text-jewel-400 hover:text-jewel-700 dark:hover:text-jewel-300 underline"
                    >
                      {link}
                    </a>
                  ))
                ) : (
                  <span className="text-gray-500 dark:text-gray-400 italic">No social media links</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Legal Links */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-red-500" />
          Legal & Compliance
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Privacy Policy
            </label>
            <LinkInput
              value={project.details.links.legal.privacyPolicy}
              onChange={(value) => handleUpdate('legal', 'privacyPolicy', value)}
              placeholder="https://yourapp.com/privacy"
              icon={FileText}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Terms of Service
            </label>
            <LinkInput
              value={project.details.links.legal.termsOfService}
              onChange={(value) => handleUpdate('legal', 'termsOfService', value)}
              placeholder="https://yourapp.com/terms"
              icon={FileText}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              App Store Guidelines
            </label>
            <LinkInput
              value={project.details.links.legal.appStoreGuidelines}
              onChange={(value) => handleUpdate('legal', 'appStoreGuidelines', value)}
              placeholder="https://developer.apple.com/guidelines"
              icon={ExternalLink}
            />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left">
            <div className="flex items-center space-x-2 mb-2">
              <Github className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="font-medium text-gray-900 dark:text-white">Create GitHub Repo</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Set up a new repository for this project</p>
          </button>

          <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left">
            <div className="flex items-center space-x-2 mb-2">
              <Figma className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="font-medium text-gray-900 dark:text-white">Create Figma File</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Start designing the user interface</p>
          </button>

          <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left">
            <div className="flex items-center space-x-2 mb-2">
              <Globe className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="font-medium text-gray-900 dark:text-white">Create Landing Page</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Build a simple landing page</p>
          </button>

          <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="font-medium text-gray-900 dark:text-white">Generate Legal Docs</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Create privacy policy and terms</p>
          </button>
        </div>
      </div>
    </div>
  )
}
