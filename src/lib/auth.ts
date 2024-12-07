import { compare, hash } from 'bcryptjs'
import { sign, verify } from 'jsonwebtoken'
import { prisma } from './prisma'

export async function hashPassword(password: string) {
  return hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return compare(password, hashedPassword)
}

export function generateToken(userId: string) {
  return sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '7d' })
}

export async function verifyToken(token: string) {
  try {
    const decoded = verify(token, process.env.JWT_SECRET!) as { userId: string }
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } })
    return user
  } catch {
    return null
  }
} 