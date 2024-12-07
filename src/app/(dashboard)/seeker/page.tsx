'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { JobApplication, Job } from '@prisma/client'
import { ApplicationCard } from '@/components/applications/ApplicationCard'

export default function SeekerDashboard() {
  const { user } = useAuth()
  const [applications, setApplications] = useState<(JobApplication & { job: Job })[]>([])

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/seeker/applications')
      if (response.ok) {
        const data = await response.json()
        // Include job data in the response
        const applicationsWithJobs = await Promise.all(
          data.map(async (application: JobApplication) => {
            const jobResponse = await fetch(`/api/jobs/${application.jobId}`)
            const job = await jobResponse.json()
            return { ...application, job }
          })
        )
        setApplications(applicationsWithJobs)
      }
    } catch (error) {
      console.error('Error fetching applications:', error)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Applications</h1>
      
      <div className="space-y-6">
        {applications.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
            onUpdate={fetchApplications}
          />
        ))}
        
        {applications.length === 0 && (
          <p className="text-gray-500 text-center py-8">
            You haven't applied to any jobs yet.
          </p>
        )}
      </div>
    </div>
  )
} 