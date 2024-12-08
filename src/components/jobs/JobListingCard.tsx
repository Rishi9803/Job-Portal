'use client'

import { Job } from '@prisma/client'

interface JobListingCardProps {
  job: Job
  onUpdate: () => void
}

export function JobListingCard({ job, onUpdate }: JobListingCardProps) {
  const handleToggleActive = async () => {
    try {
      const response = await fetch(`/api/jobs/${job.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !job.isActive }),
      })

      if (response.ok) {
        onUpdate()
      }
    } catch (error) {
      console.error('Error updating job:', error)
    }
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
          <p className="mt-1 text-sm text-gray-500">{job.location}</p>
        </div>
        <button
          onClick={handleToggleActive}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            job.isActive
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {job.isActive ? 'Active' : 'Inactive'}
        </button>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-600">{job.description}</p>
      </div>

      <div className="mt-4">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {job.type}
        </span>
        {job.salary && (
          <span className="ml-2 text-sm text-gray-500">
            ${job.salary.toLocaleString()} / year
          </span>
        )}
      </div>
    </div>
  )
} 