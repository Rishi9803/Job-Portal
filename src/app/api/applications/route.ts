import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'SEEKER') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { jobId, coverLetter } = body

    // Check if user has already applied
    const existingApplication = await prisma.jobApplication.findFirst({
      where: {
        jobId,
        seekerId: session.user.seekerProfile.id,
      },
    })

    if (existingApplication) {
      return NextResponse.json(
        { error: 'You have already applied for this job' },
        { status: 400 }
      )
    }

    const application = await prisma.jobApplication.create({
      data: {
        jobId,
        seekerId: session.user.seekerProfile.id,
        coverLetter,
        status: 'PENDING',
      },
    })

    return NextResponse.json(application)
  } catch (error) {
    console.error('Error creating application:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 