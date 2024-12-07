import { User, Job, JobApplication, EmployerProfile, SeekerProfile } from '@prisma/client'

export type { User, Job, JobApplication, EmployerProfile, SeekerProfile }

export interface JobWithEmployer extends Job {
  employer: EmployerProfile
}

export interface ApplicationWithJob extends JobApplication {
  job: Job
  seeker: SeekerProfile
} 