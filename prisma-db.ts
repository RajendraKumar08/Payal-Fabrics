import { PrismaClient, Role } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
  adapter,
});

// const seedProducts = async () => {
//   const count = await prisma.user.count();
//   if (count === 0) {
//     await prisma.user.createMany({
//       data: [
//         { name: "user1", kindeId: "user1", email: "user1@gmail.com", profileImage: "", role: "USER", createdAt: new Date(), updatedAt: new Date() },
//         { name: "user2", kindeId: "user2", email: "user2@gmail.com", profileImage: "", role: "USER", createdAt: new Date(), updatedAt: new Date() },
//         { name: "user3", kindeId: "user3", email: "user3@gmail.com", profileImage: "", role: "USER", createdAt: new Date(), updatedAt: new Date() },
//       ],
//     });
//   }
// };

// // Run seed if needed
// seedProducts();

// export async function getProducts() {
//   return prisma.user.findMany();
// }

// export async function getProduct(id: number) {
//   return prisma.user.findUnique({
//     where: { id }
//   })
// }

// export async function createProduct(name: string, kindeId: string, email: string, profileImage: string, role: Role, createdAt: Date, updatedAt: Date) {
//   return prisma.user.create({
//     data: {
//       name,
//       email,
//       kindeId,
//       profileImage,
//       role,
//       createdAt,
//       updatedAt
//     }
//   })
// }

// export async function updateProduct(id: number, name: string, email: string) {
//   return prisma.user.update({
//     where: { id },
//     data: {
//       name,
//       email
//     }
//   })
// }

// export async function deleteProduct(id: number) {
//   return prisma.user.delete({
//     where: { id }
//   })
// }

