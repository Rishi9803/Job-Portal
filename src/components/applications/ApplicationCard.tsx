'use client'

import { JobApplication, Job } from '@prisma/client'
import { format } from 'date-fns'
import { useState } from 'react'

interface ApplicationCardProps {
  application: JobApplication & {
    job: Job
  }
  onUpdate: () => void
}

export function ApplicationCard({ application, onUpdate }: ApplicationCardProps) {
  const [isWithdrawing, setIsWithdrawing] = useState(false)

  const handleWithdraw = async () => {
    if (!confirm('Are you sure you want to withdraw this application?')) return

    setIsWithdrawing(true)
    try {
      const response = await fetch(`/api/applications/${application.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        onUpdate()
      }
    } catch (error) {
      console.error('Error withdrawing application:', error)
    } finally {
      setIsWithdrawing(false)
    }
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            {application.job.title}
          </h3>
          <p className="text-sm text-gray-500">
            Applied on {format(new Date(application.createdAt), 'MMM d, yyyy')}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          application.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
          application.status === 'ACCEPTED' ? 'bg-green-100 text-green-800' :
          'bg-red-100 text-red-800'
        }`}>
          {application.status}
        </span>
      </div>

      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-900">Cover Letter</h4>
        <p className="mt-1 text-sm text-gray-600">
          {application.coverLetter || 'No cover letter provided'}
        </p>
      </div>

      {application.status === 'PENDING' && (
        <div className="mt-6">
          <button
            onClick={handleWithdraw}
            disabled={isWithdrawing}
            className="text-sm text-red-600 hover:text-red-700 disabled:opacity-50"
          >
            {isWithdrawing ? 'Withdrawing...' : 'Withdraw Application'}
          </button>
        </div>
      )}
    </div>
  )
} 