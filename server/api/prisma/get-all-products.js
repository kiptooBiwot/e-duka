import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

// Get all products
export default defineEventHandler(async (event) => {
  let products = await prisma.products.findMany()
  return products
})