'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { Project, ProjectFilters } from '@/types/Project'
import { sampleProjects } from '@/data/sampleData'

interface ProjectContextType {
  projects: Project[]
  filters: ProjectFilters
  setFilters: (filters: ProjectFilters) => void
  addProject: (project: Omit<Project, 'id'>) => void
  updateProject: (id: string, updates: Partial<Project>) => void
  deleteProject: (id: string) => void
  filteredProjects: Project[]
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([])
  const [filters, setFiltersState] = useState<ProjectFilters>({
    search: '',
    status: '',
    technology: '',
    sortBy: 'lastUpdated',
    sortOrder: 'desc'
  })

  // Load projects from localStorage on mount
  useEffect(() => {
    const savedProjects = localStorage.getItem('aces-apps-projects')
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects))
    } else {
      setProjects(sampleProjects)
    }
  }, [])

  // Save projects to localStorage whenever projects change
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem('aces-apps-projects', JSON.stringify(projects))
    }
  }, [projects])

  const setFilters = (newFilters: ProjectFilters) => {
    setFiltersState(newFilters)
  }

  const addProject = (projectData: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString()
    }
    setProjects(prev => [newProject, ...prev])
  }

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === id ? { ...project, ...updates } : project
      )
    )
  }

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id))
  }

  const filteredProjects = projects.filter(project => {
    const matchesSearch = !filters.search || 
      project.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      project.description.toLowerCase().includes(filters.search.toLowerCase())
    
    const matchesStatus = !filters.status || project.status === filters.status
    
    const matchesTechnology = !filters.technology || 
      project.technology.some(tech => 
        tech.toLowerCase().includes(filters.technology.toLowerCase())
      )

    return matchesSearch && matchesStatus && matchesTechnology
  }).sort((a, b) => {
    let aValue: any, bValue: any
    
    switch (filters.sortBy) {
      case 'name':
        aValue = a.name.toLowerCase()
        bValue = b.name.toLowerCase()
        break
      case 'progress':
        aValue = a.progress
        bValue = b.progress
        break
      case 'lastUpdated':
        aValue = new Date(a.lastUpdated).getTime()
        bValue = new Date(b.lastUpdated).getTime()
        break
      case 'estimatedCompletion':
        aValue = new Date(a.estimatedCompletion).getTime()
        bValue = new Date(b.estimatedCompletion).getTime()
        break
      default:
        return 0
    }

    if (filters.sortOrder === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })

  return (
    <ProjectContext.Provider value={{
      projects,
      filters,
      setFilters,
      addProject,
      updateProject,
      deleteProject,
      filteredProjects
    }}>
      {children}
    </ProjectContext.Provider>
  )
}

export function useProjects() {
  const context = useContext(ProjectContext)
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider')
  }
  return context
}
