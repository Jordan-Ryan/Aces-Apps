export interface Project {
  id: string
  name: string
  description: string
  status: 'Planning' | 'Development' | 'Testing' | 'Launch' | 'Maintenance' | 'On Hold'
  technology: string[]
  progress: number
  lastUpdated: string
  estimatedCompletion: string
  
  // Solo developer fields
  monetization: 'Free' | 'Freemium' | 'Paid' | 'Subscription' | 'Ads'
  estimatedCost: number
  currentBlockers: string[]
  nextMilestones: string[]
  marketValidation: string
  competitorAnalysis: string
  launchStrategy: string
  
  details: ProjectDetails
}

export interface ProjectDetails {
  problemStatement: string
  targetUsers: string
  goals: string
  features: {
    mustHave: string[]
    shouldHave: string[]
    couldHave: string[]
  }
  technical: {
    frontend: string
    backend: string
    database: string
    integrations: string[]
    risks: string[]
  }
  business: {
    monetizationStrategy: string
    revenueModel: string
    targetMarketSize: string
    competitorAnalysis: string
    uniqueValueProposition: string
    pricingStrategy: string
    marketValidation: string
    businessRisks: string[]
  }
  planning: {
    currentBlockers: string[]
    nextActions: string[]
    weeklyMilestones: Milestone[]
    learningRequirements: string[]
    estimatedCosts: CostBreakdown
    launchChecklist: ChecklistItem[]
    postLaunchPlan: string
  }
  links: {
    development: {
      github: string
      figma: string
      cursor: string
      gptSpace: string
    }
    business: {
      competitorResearch: string[]
      marketResearch: string[]
      analytics: string
    }
    marketing: {
      landingPage: string
      socialMedia: string[]
      pressKit: string
    }
    legal: {
      privacyPolicy: string
      termsOfService: string
      appStoreGuidelines: string
    }
  }
  timeline: TimelinePhase[]
}

export interface TimelinePhase {
  phase: string
  duration: string
  deliverables: string[]
}

export interface Milestone {
  title: string
  dueDate: string
  completed: boolean
  description: string
}

export interface CostBreakdown {
  developmentTools: number
  servicesApis: number
  appStoreFees: number
  marketingBudget: number
  total: number
}

export interface ChecklistItem {
  title: string
  completed: boolean
  dueDate?: string
  priority: 'High' | 'Medium' | 'Low'
}

export interface ProjectFilters {
  search: string
  status: string
  technology: string
  sortBy: 'name' | 'progress' | 'lastUpdated' | 'estimatedCompletion'
  sortOrder: 'asc' | 'desc'
}

export type Theme = 'light' | 'dark' | 'system'