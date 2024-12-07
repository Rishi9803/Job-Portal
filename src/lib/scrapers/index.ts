import axios from 'axios'
import { prisma } from '../prisma'
import { JobType } from '@prisma/client'

interface ScrapedJob {
  title: string
  company: string
  location: string
  description: string
  salary?: string
  type: JobType
  url: string
}

interface LinkedInResponse {
  data: {
    elements: Array<{
      title: string;
      companyName: string;
      location: string;
      description: string;
      employmentType: string;
      url: string;
    }>;
  }
}

interface IndeedResponse {
  results: Array<{
    jobtitle: string;
    company: string;
    formattedLocation: string;
    snippet: string;
    url: string;
  }>;
}

export async function scrapeLinkedInJobs() {
  try {
    const response = await axios.get<LinkedInResponse>(`https://api.linkedin.com/v2/jobs`, {
      headers: {
        'Authorization': `Bearer ${process.env.LINKEDIN_API_KEY}`
      }
    })

    const jobs: ScrapedJob[] = response.data.elements.map((job) => ({
      title: job.title,
      company: job.companyName,
      location: job.location,
      description: job.description,
      type: mapJobType(job.employmentType),
      url: job.url
    }))

    await saveScrapedJobs(jobs)
  } catch (error) {
    console.error('LinkedIn scraping error:', error)
  }
}

export async function scrapeIndeedJobs() {
  try {
    const response = await axios.get<IndeedResponse>(`https://api.indeed.com/ads/apisearch`, {
      params: {
        publisher: process.env.INDEED_API_KEY,
        format: 'json',
        v: '2'
      }
    })

    const jobs: ScrapedJob[] = response.data.results.map((job: any) => ({
      title: job.jobtitle,
      company: job.company,
      location: job.formattedLocation,
      description: job.snippet,
      type: JobType.FULL_TIME,
      url: job.url
    }))

    await saveScrapedJobs(jobs)
  } catch (error) {
    console.error('Indeed scraping error:', error)
  }
}

async function saveScrapedJobs(jobs: ScrapedJob[]) {
  for (const job of jobs) {
    await prisma.job.create({
      data: {
        title: job.title,
        description: job.description,
        type: job.type,
        location: job.location,
        employerId: "system",
        requirements: [],
      },
    })
  }
}

function mapJobType(type: string): JobType {
  switch (type.toUpperCase()) {
    case 'FULL_TIME':
      return JobType.FULL_TIME
    case 'PART_TIME':
      return JobType.PART_TIME
    case 'CONTRACT':
      return JobType.CONTRACT
    case 'INTERNSHIP':
      return JobType.INTERNSHIP
    default:
      return JobType.FULL_TIME
  }
} 