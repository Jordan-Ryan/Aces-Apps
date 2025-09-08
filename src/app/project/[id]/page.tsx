'use client'

import { useParams } from 'next/navigation'
import { useProjects } from '@/contexts/ProjectContext'
import { ProjectDetail } from '@/components/project/ProjectDetail'
import { Header } from '@/components/layout/Header'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function ProjectPage() {
  const params = useParams()
  const { projects } = useProjects()
  
  const project = projects.find(p => p.id === params.id)

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-void-900">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Project not found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The project you're looking for doesn't exist or has been removed.
            </p>
            <Link
              href="/"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-jewel-500 text-white rounded-lg hover:bg-jewel-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-void-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-jewel-600 dark:hover:text-jewel-400">
            Dashboard
          </Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white">{project.name}</span>
        </nav>

        <ProjectDetail project={project} />
      </div>
    </div>
  )
}
