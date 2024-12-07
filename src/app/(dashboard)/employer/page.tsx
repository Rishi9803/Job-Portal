'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { JobPostForm } from '@/components/jobs/JobPostForm'
import { JobListingCard } from '@/components/jobs/JobListingCard'
import { Job } from '@prisma/client'

export default function EmployerDashboard() {
  const { user } = useAuth()
  const [jobs, setJobs] = useState<Job[]>([])
  const [isPostingJob, setIsPostingJob] = useState(false)

  useEffect(() => {
    fetchEmployerJobs()
  }, [])

  const fetchEmployerJobs = async () => {
    try {
      const response = await fetch('/api/employer/jobs')
      if (response.ok) {
        const data = await response.json()
        setJobs(data)
      }
    } catch (error) {
      console.error('Error fetching jobs:', error)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Employer Dashboard</h1>
        <button
          onClick={() => setIsPostingJob(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Post New Job
        </button>
      </div>

      {isPostingJob && (
        <JobPostForm
          onClose={() => setIsPostingJob(false)}
          onSuccess={() => {
            setIsPostingJob(false)
            fetchEmployerJobs()
          }}
        />
      )}

      <div className="mt-8 space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Your Job Listings</h2>
        {jobs.map((job) => (
          <JobListingCard
            key={job.id}
            job={job}
            onUpdate={fetchEmployerJobs}
          />
        ))}
      </div>
    </div>
  )
} 