'use client'

import { useState } from 'react'

export function ScrapingControl() {
  const [isLoading, setIsLoading] = useState(false)

  const handleScrape = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/admin/scrape', { method: 'POST' })
      if (!response.ok) {
        throw new Error('Failed to start scraping')
      }
    } catch (error) {
      console.error('Error starting scrape:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Job Scraping Control
        </h3>
        <div className="mt-4">
          <button
            onClick={handleScrape}
            disabled={isLoading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? 'Scraping...' : 'Start Scraping'}
          </button>
        </div>
      </div>
    </div>
  )
}
