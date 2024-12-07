'use client'

import { useEffect, useState } from 'react'
import { BriefcaseIcon, BuildingOfficeIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'

interface Job {
  id: string
  title: string
  company: string
  location: string
  salary: string
  type: string
}

export function FeaturedJobs() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Fetch featured jobs from API
    const fetchJobs = async () => {
      try {
        // Temporary mock data
        const mockJobs = [
          {
            id: '1',
            title: 'Senior Software Engineer',
            company: 'Tech Corp',
            location: 'San Francisco, CA',
            salary: '$120k - $180k',
            type: 'Full-time'
          },
          {
            id: '2',
            title: 'Product Manager',
            company: 'Innovation Inc',
            location: 'New York, NY',
            salary: '$100k - $150k',
            type: 'Full-time'
          }
        ]
        setJobs(mockJobs)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching jobs:', error)
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Featured Jobs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
            
            <div className="mt-2 space-y-2">
              <div className="flex items-center text-gray-600">
                <BuildingOfficeIcon className="h-5 w-5 mr-2" />
                {job.company}
              </div>
              
              <div className="flex items-center text-gray-600">
                <CurrencyDollarIcon className="h-5 w-5 mr-2" />
                {job.salary}
              </div>
              
              <div className="flex items-center text-gray-600">
                <BriefcaseIcon className="h-5 w-5 mr-2" />
                {job.type}
              </div>
            </div>
            
            <button
              className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  )
} 