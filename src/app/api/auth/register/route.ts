import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, firstName, lastName, role } = body

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role,
      },
    })

    // Create profile based on role
    if (role === 'EMPLOYER') {
      await prisma.employerProfile.create({
        data: {
          userId: user.id,
          companyName: '', // Will be updated later
        },
      })
    } else if (role === 'SEEKER') {
      await prisma.seekerProfile.create({
        data: {
          userId: user.id,
          skills: [],
        },
      })
    }

    return NextResponse.json({ message: 'User created successfully' })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 