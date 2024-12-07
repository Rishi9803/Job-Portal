import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  try {
    // Create admin user
    const hashedPassword = await hash('admin123', 12)
    const admin = await prisma.user.create({
      data: {
        email: 'admin@jobportal.com',
        password: hashedPassword,
        role: 'ADMIN',
        firstName: 'Admin',
        lastName: 'User',
      },
    })
    console.log('Admin user created:', admin)

    // Create test employer
    const employer = await prisma.user.create({
      data: {
        email: 'employer@test.com',
        password: await hash('test123', 12),
        role: 'EMPLOYER',
        firstName: 'Test',
        lastName: 'Employer',
        employerProfile: {
          create: {
            companyName: 'Test Company',
            website: 'https://testcompany.com',
            description: 'A test company',
          },
        },
      },
    })
    console.log('Test employer created:', employer)

    // Create test job seeker
    const seeker = await prisma.user.create({
      data: {
        email: 'seeker@test.com',
        password: await hash('test123', 12),
        role: 'SEEKER',
        firstName: 'Test',
        lastName: 'Seeker',
        seekerProfile: {
          create: {
            title: 'Software Developer',
            skills: ['JavaScript', 'React', 'Node.js'],
          },
        },
      },
    })
    console.log('Test seeker created:', seeker)

  } catch (error) {
    console.error('Error creating users:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 