import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Create system employer
  await prisma.user.create({
    data: {
      email: 'system@jobportal.com',
      password: 'not-accessible',
      role: 'EMPLOYER',
      firstName: 'System',
      lastName: 'Bot',
      employerProfile: {
        create: {
          companyName: 'Job Portal System',
          description: 'System account for scraped jobs',
        },
      },
    },
  })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect()) 