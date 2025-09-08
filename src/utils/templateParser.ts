import { ParsedProject } from '@/types/NewProject'

export function parseTemplate(content: string): ParsedProject | null {
  try {
    console.log('=== PARSING TEMPLATE ===')
    const lines = content.split('\n')
    console.log('Total lines:', lines.length)
    const parsed: Partial<ParsedProject> = {
      details: {
        problemStatement: '',
        targetUsers: '',
        features: {
          mustHave: [],
          shouldHave: [],
          couldHave: []
        },
        technical: {
          frontend: '',
          backend: '',
          architecture: ''
        }
      }
    }

    let currentSection = ''
    let currentFeatureType = ''
    let hasCapturedName = false

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      // Detect section headers (handles emoji headings and plain headings)
      if (
        line.startsWith('## ') ||
        /^(📱|🎯|🚀|📋|👥|🔧|🛠️|✅|⚠️|🔍|📅|💰|🎨)\b/.test(line) ||
        /^(PROJECT_NAME|QUICK_SUMMARY|PROJECT_METADATA|PROBLEM_STATEMENT|TARGET_USERS|MVP_FEATURES|TECHNICAL_OVERVIEW|BUSINESS_MODEL|DEVELOPMENT_PLAN|LAUNCH_STRATEGY|COST_BREAKDOWN|SUCCESS_METRICS)$/i.test(line)
      ) {
        const section = line
          .replace(/^##\s*/, '')
          .replace(/^[^A-Za-z]+/, '')
          .trim()
        currentSection = section.toLowerCase().replace(/\s+/g, '_')
        console.log('Found section:', currentSection)
        continue
      }

      // Handle PROJECT_METADATA section specifically
      if (line.includes('PROJECT_METADATA') || line.includes('🚀')) {
        currentSection = 'project_metadata'
        console.log('Found PROJECT_METADATA section')
        continue
      }

      // Special handling for TECHNOLOGY line that might not be in a section
      if (line.startsWith('TECHNOLOGY:')) {
        const techString = line.split(':')[1]?.trim()
        console.log('Found standalone technology line:', line, 'Extracted:', techString)
        if (techString) {
          parsed.technology = techString
            .replace(/[\[\]"]/g, '')
            .split(',')
            .map(t => t.trim())
            .filter(t => t.length > 0)
          console.log('Parsed standalone technologies:', parsed.technology)
        }
        continue
      }

      // If we haven't captured a name yet, use the first non-empty line as the name
      if (!hasCapturedName && line.length > 0 && !currentSection) {
        parsed.name = line.replace(/^[^A-Za-z]+/, '').trim()
        console.log('Captured name:', parsed.name)
        hasCapturedName = true
        continue
      }

      // Parse PROJECT_NAME
      if (currentSection === 'project_name' && line.startsWith('**') && line.endsWith('**')) {
        parsed.name = line.replace(/\*\*/g, '').trim()
      }

      // Parse QUICK_SUMMARY (accept bold or plain lines; capture until next section)
      if (currentSection === 'quick_summary' && line.length > 0) {
        const text = line.replace(/\*\*/g, '').trim()
        parsed.description = parsed.description ? `${parsed.description} ${text}` : text
        console.log('Building description:', parsed.description)
      }

      // Parse PROJECT_METADATA
      if (currentSection === 'project_metadata' || currentSection === 'projectmetadata') {
        if (line.includes('**STATUS**') || line.startsWith('STATUS')) {
          const status = line.split(':')[1]?.trim().replace(/\*/g, '')
          parsed.status = status as any || 'Planning'
        }
        if (line.includes('**TECHNOLOGY**') || line.startsWith('TECHNOLOGY')) {
          const techString = line.split(':')[1]?.trim()
          console.log('Found technology line:', line, 'Extracted:', techString)
          if (techString) {
            parsed.technology = techString
              .replace(/[\[\]"]/g, '')
              .split(',')
              .map(t => t.trim())
              .filter(t => t.length > 0)
            console.log('Parsed technologies:', parsed.technology)
          }
        }
        // Handle multi-line technology arrays
        if (currentSection === 'project_metadata' && line.startsWith('TECHNOLOGY:')) {
          const techString = line.split(':')[1]?.trim()
          console.log('Found technology line (multi-line):', line, 'Extracted:', techString)
          if (techString) {
            parsed.technology = techString
              .replace(/[\[\]"]/g, '')
              .split(',')
              .map(t => t.trim())
              .filter(t => t.length > 0)
            console.log('Parsed technologies (multi-line):', parsed.technology)
          }
        }
        if (line.includes('**ESTIMATED_TIMELINE**') || line.startsWith('ESTIMATED_TIMELINE')) {
          parsed.estimatedTimeline = line.split(':')[1]?.trim().replace(/\*/g, '') || '12 weeks'
        }
        if (line.includes('**TEAM_SIZE**') || line.startsWith('TEAM_SIZE')) {
          const teamSize = line.split(':')[1]?.trim()
          parsed.teamSize = parseInt(teamSize) || 1
        }
        if (line.includes('**COMPLEXITY**') || line.startsWith('COMPLEXITY')) {
          const complexity = line.split(':')[1]?.trim().replace(/\*/g, '')
          parsed.complexity = complexity as any || 'Medium'
        }
        if (line.includes('**MONETIZATION**') || line.startsWith('MONETIZATION')) {
          const monetization = line.split(':')[1]?.trim().replace(/\*/g, '')
          // Map common monetization terms to our enum values
          const monetizationMap: { [key: string]: string } = {
            'free': 'Free',
            'freemium': 'Freemium',
            'paid': 'Paid',
            'subscription': 'Subscription',
            'ads': 'Ads',
            'advertising': 'Ads'
          }
          parsed.monetization = monetizationMap[monetization.toLowerCase()] || 'Free'
        }
      }

      // Parse PROBLEM_STATEMENT
      if (currentSection === 'problem_statement' && line.length > 0) {
        const text = line.replace(/\*\*/g, '').trim()
        parsed.details!.problemStatement = parsed.details!.problemStatement
          ? `${parsed.details!.problemStatement} ${text}`
          : text
      }

      // Parse TARGET_USERS
      if (currentSection === 'target_users') {
        if (line.startsWith('**Primary User:**')) {
          parsed.details!.targetUsers = line.replace('**Primary User:**', '').trim()
        } else if (line.toLowerCase().startsWith('primary user:')) {
          parsed.details!.targetUsers = line.replace(/^[^:]+:/, '').trim()
        } else if (line.toLowerCase().startsWith('goals:')) {
          const goals = line.replace(/^[^:]+:/, '').trim()
          parsed.details!.targetUsers = (parsed.details!.targetUsers || '') + ` Goals: ${goals}`
        } else if (line.toLowerCase().startsWith('pain points:')) {
          const painPoints = line.replace(/^[^:]+:/, '').trim()
          parsed.details!.targetUsers = (parsed.details!.targetUsers || '') + ` Pain Points: ${painPoints}`
        }
      }

      // Parse MVP_FEATURES
      if (currentSection === 'mvp_features') {
        if (line.match(/MUST HAVE/i)) {
          currentFeatureType = 'mustHave'
        } else if (line.match(/SHOULD HAVE/i)) {
          currentFeatureType = 'shouldHave'
        } else if (line.match(/COULD HAVE/i)) {
          currentFeatureType = 'couldHave'
        } else if (currentFeatureType && line.length > 0) {
          const feature = line.replace(/^[-*]\s*/, '').trim()
          if (feature && parsed.details!.features[currentFeatureType as keyof typeof parsed.details.features]) {
            parsed.details!.features[currentFeatureType as keyof typeof parsed.details.features].push(feature)
          }
        }
      }

      // Parse TECHNICAL_OVERVIEW
      if (currentSection === 'technical_overview') {
        if (line.includes('**Frontend**:')) {
          parsed.details!.technical.frontend = line.split(':')[1]?.trim() || ''
        }
        if (line.includes('**Backend**:')) {
          parsed.details!.technical.backend = line.split(':')[1]?.trim() || ''
        }
        if (line.includes('**Architecture**:')) {
          parsed.details!.technical.architecture = line.split(':')[1]?.trim() || ''
        }
      }

      // Parse BUSINESS_MODEL
      if (currentSection === 'business_model') {
        if (line.includes('**Monetization**:') || line.startsWith('**Monetization**:')) {
          const monetization = line.split(':')[1]?.trim().replace(/\*/g, '')
          const monetizationMap: { [key: string]: string } = {
            'free': 'Free',
            'freemium': 'Freemium',
            'paid': 'Paid',
            'subscription': 'Subscription',
            'ads': 'Ads',
            'advertising': 'Ads'
          }
          parsed.monetization = monetizationMap[monetization.toLowerCase()] || 'Free'
        }
        if (line.includes('**Market Size**:') || line.startsWith('**Market Size**:')) {
          // This would go into business details in a full implementation
        }
      }

      // Parse DEVELOPMENT_PLAN
      if (currentSection === 'development_plan') {
        if (line.includes('**Current Blockers**:') || line.startsWith('**Current Blockers**:')) {
          // This would go into planning details in a full implementation
        }
        if (line.includes('**Next Actions**:') || line.startsWith('**Next Actions**:')) {
          // This would go into planning details in a full implementation
        }
      }

      // Parse COST_BREAKDOWN
      if (currentSection === 'cost_breakdown') {
        if (line.includes('**Total Estimated Cost**:') || line.startsWith('**Total Estimated Cost**:')) {
          const costString = line.split(':')[1]?.trim().replace(/[$,]/g, '')
          parsed.estimatedCost = parseFloat(costString) || 0
        }
      }
    }

    // Fallback description: try to grab first paragraph after QUICK_SUMMARY or after name
    if (!parsed.description) {
      const headerRegex = /^(##\s+|[📱🎯🚀📋👥🔧🛠️✅⚠️🔍📅💰🎨])/;
      let start = -1
      for (let i = 0; i < lines.length; i++) {
        const t = lines[i].trim()
        if (t.toLowerCase().includes('quick_summary')) { start = i + 1; break }
      }
      if (start === -1) {
        // start after the name line
        start = 1
      }
      let desc = ''
      for (let i = start; i < lines.length; i++) {
        const t = lines[i]
        if (headerRegex.test(t)) break
        if (t.trim().length === 0) {
          if (desc.length > 0) break
          continue
        }
        desc += (desc ? ' ' : '') + t.trim()
      }
      parsed.description = desc || parsed.description
    }

    // Validate required fields
    console.log('Final parsed data:', {
      name: parsed.name,
      description: parsed.description,
      technology: parsed.technology,
      status: parsed.status,
      monetization: parsed.monetization,
      estimatedCost: parsed.estimatedCost
    })
    
    if (!parsed.name || !parsed.description) {
      console.log('Validation failed - missing name or description')
      return null
    }

    // Set defaults for missing fields
    return {
      name: parsed.name,
      description: parsed.description,
      status: parsed.status || 'Planning',
      technology: parsed.technology || [],
      estimatedTimeline: parsed.estimatedTimeline || '12 weeks',
      teamSize: parsed.teamSize || 1,
      complexity: parsed.complexity || 'Medium',
      monetization: parsed.monetization || 'Free',
      estimatedCost: parsed.estimatedCost || 0,
      currentBlockers: parsed.currentBlockers || [],
      nextMilestones: parsed.nextMilestones || [],
      marketValidation: parsed.marketValidation || '',
      competitorAnalysis: parsed.competitorAnalysis || '',
      launchStrategy: parsed.launchStrategy || '',
      details: {
        problemStatement: parsed.details!.problemStatement || 'Problem statement not provided',
        targetUsers: parsed.details!.targetUsers || 'Target users not specified',
        features: {
          mustHave: parsed.details!.features.mustHave || ['Core functionality'],
          shouldHave: parsed.details!.features.shouldHave || [],
          couldHave: parsed.details!.features.couldHave || []
        },
        technical: {
          frontend: parsed.details!.technical.frontend || 'To be determined',
          backend: parsed.details!.technical.backend || 'To be determined',
          architecture: parsed.details!.technical.architecture || 'To be determined'
        }
      }
    }
  } catch (error) {
    console.error('Template parsing error:', error)
    return null
  }
}

export function validateProject(project: ParsedProject): string[] {
  const errors: string[] = []
  
  if (!project.name?.trim()) {
    errors.push("Project name is required")
  }
  
  if (!project.description?.trim()) {
    errors.push("Description is required")
  }
  
  if (!project.technology?.length) {
    errors.push("At least one technology is required")
  }
  
  if (project.name && project.name.length < 3) {
    errors.push("Project name must be at least 3 characters")
  }
  
  if (project.description && project.description.length < 10) {
    errors.push("Description must be at least 10 characters")
  }
  
  if (project.teamSize && project.teamSize < 1) {
    errors.push("Team size must be at least 1")
  }
  
  return errors
}

export function generateProjectId(name: string): string {
  return name.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}