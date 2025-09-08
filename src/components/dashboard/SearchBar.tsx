'use client'

import { Search, Filter, SortAsc } from 'lucide-react'
import { useProjects } from '@/contexts/ProjectContext'
import { useState } from 'react'

export function SearchBar() {
  const { filters, setFilters } = useProjects()
  const [showFilters, setShowFilters] = useState(false)

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'Planning', label: 'Planning' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Review', label: 'Review' },
    { value: 'Completed', label: 'Completed' },
    { value: 'On Hold', label: 'On Hold' }
  ]

  const sortOptions = [
    { value: 'lastUpdated', label: 'Last Updated' },
    { value: 'name', label: 'Name' },
    { value: 'progress', label: 'Progress' },
    { value: 'estimatedCompletion', label: 'Completion Date' }
  ]

  return (
    <div className="space-y-4">
      {/* Search and Filter Row */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search projects..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-void-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-jewel-500 focus:border-transparent"
          />
        </div>

        {/* Filter Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-void-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-void-700 transition-colors"
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </button>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="bg-white dark:bg-void-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-void-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-jewel-500 focus:border-transparent"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Technology Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Technology
              </label>
              <input
                type="text"
                placeholder="e.g., React, Flutter"
                value={filters.technology}
                onChange={(e) => setFilters({ ...filters, technology: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-void-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-jewel-500 focus:border-transparent"
              />
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Sort By
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-void-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-jewel-500 focus:border-transparent"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Order
              </label>
              <div className="flex">
                <button
                  onClick={() => setFilters({ ...filters, sortOrder: 'desc' })}
                  className={`flex-1 px-3 py-2 text-sm border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-md ${
                    filters.sortOrder === 'desc'
                      ? 'bg-jewel-600 text-white'
                      : 'bg-white dark:bg-void-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-void-700'
                  }`}
                >
                  Desc
                </button>
                <button
                  onClick={() => setFilters({ ...filters, sortOrder: 'asc' })}
                  className={`flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-r-md ${
                    filters.sortOrder === 'asc'
                      ? 'bg-jewel-600 text-white'
                      : 'bg-white dark:bg-void-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-void-700'
                  }`}
                >
                  Asc
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
