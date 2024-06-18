//import { PrismaClient } from '@prisma/client/edge'
import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import { withOptimize } from '@prisma/extension-optimize'
import { env } from 'env'

// Learn more about instantiating PrismaClient in Next.js here: https://www.prisma.io/docs/data-platform/accelerate/getting-started
/*
const prismaClientSingleton = () => {
  if (env.NODE_ENV !== 'production') {
    return new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    }).$extends(withOptimize())
  }
  return new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  })
}
*/

const extendedPrisma = () => new PrismaClient().$extends(withOptimize()).$extends(withAccelerate())
type PrismaClientExtended = ReturnType<typeof extendedPrisma>

declare global {
  var prisma: PrismaClientExtended | undefined
}

//const prisma = global.prisma ?? new PrismaClient().$extends(withOptimize()).$extends(withAccelerate())

const prisma = global.prisma ?? new PrismaClient().$extends(withAccelerate())
if (env.NODE_ENV !== 'production') global.prisma = prisma

export default prisma
/*

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  })
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  }).$extends(withOptimize())

export default prisma
*/
