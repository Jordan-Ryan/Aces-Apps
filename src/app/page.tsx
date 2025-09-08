'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/layout/Header'
import { ProjectGrid } from '@/components/dashboard/ProjectGrid'
import { SearchBar } from '@/components/dashboard/SearchBar'
import { AddProjectButton } from '@/components/dashboard/AddProjectButton'
import { AddProjectModal } from '@/components/project/AddProjectModal'
import { eventBus } from '@/utils/eventBus'

export default function Home() {
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false)

  useEffect(() => {
    const off = eventBus.on('open:add-project', () => setIsAddProjectModalOpen(true))
    return () => { off() }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-void-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Project Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and track your app development projects
          </p>
        </div>
        
        <div className="mb-6">
          <SearchBar />
        </div>
        
        <ProjectGrid />
        <AddProjectButton />
        <AddProjectModal 
          isOpen={isAddProjectModalOpen}
          onClose={() => setIsAddProjectModalOpen(false)}
        />
      </main>
    </div>
  )
}
