import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'EMPLOYER') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { title, description, type, location, salary, requirements } = body

    const job = await prisma.job.create({
      data: {
        title,
        description,
        type,
        location,
        salary,
        requirements,
        employerId: session.user.employerProfile.id,
        isActive: true,
      },
    })

    return NextResponse.json(job)
  } catch (error) {
    console.error('Error creating job:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query')
    const location = searchParams.get('location')

    const jobs = await prisma.job.findMany({
      where: {
        AND: [
          query ? {
            OR: [
              { title: { contains: query, mode: 'insensitive' } },
              { description: { contains: query, mode: 'insensitive' } },
            ],
          } : {},
          location ? { location: { contains: location, mode: 'insensitive' } } : {},
          { isActive: true },
        ],
      },
      include: {
        employer: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(jobs)
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 