import { JobSearch } from '@/components/jobs/JobSearch'
import { FeaturedJobs } from '@/components/jobs/FeaturedJobs'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Find Your Dream Job
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Search thousands of jobs from top companies and get hired today.
          </p>
        </div>
        
        <div className="mt-10">
          <JobSearch />
        </div>
        
        <div className="mt-16">
          <FeaturedJobs />
        </div>
      </div>
    </main>
  )
} 