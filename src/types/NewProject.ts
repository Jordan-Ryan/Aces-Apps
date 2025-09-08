export interface NewProjectForm {
  name: string
  description: string
  status: 'Planning' | 'Development' | 'Testing' | 'Launch' | 'Maintenance' | 'On Hold'
  technology: string[]
  estimatedTimeline: string
  teamSize: number
  complexity: 'Low' | 'Medium' | 'High'
  monetization: 'Free' | 'Freemium' | 'Paid' | 'Subscription' | 'Ads'
  estimatedCost: number
  currentBlockers: string[]
  nextMilestones: string[]
  marketValidation: string
  competitorAnalysis: string
  launchStrategy: string
}

export interface ParsedProject {
  name: string
  description: string
  status: 'Planning' | 'Development' | 'Testing' | 'Launch' | 'Maintenance' | 'On Hold'
  technology: string[]
  estimatedTimeline: string
  teamSize: number
  complexity: 'Low' | 'Medium' | 'High'
  monetization: 'Free' | 'Freemium' | 'Paid' | 'Subscription' | 'Ads'
  estimatedCost: number
  currentBlockers: string[]
  nextMilestones: string[]
  marketValidation: string
  competitorAnalysis: string
  launchStrategy: string
  details: {
    problemStatement: string
    targetUsers: string
    features: {
      mustHave: string[]
      shouldHave: string[]
      couldHave: string[]
    }
    technical: {
      frontend: string
      backend: string
      architecture: string
    }
  }
}

export interface AddProjectState {
  isOpen: boolean
  activeTab: 'template' | 'scratch'
  templateContent: string
  parsedData: ParsedProject | null
  formData: NewProjectForm
  errors: string[]
  isLoading: boolean
}