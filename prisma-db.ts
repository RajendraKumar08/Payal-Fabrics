import { PrismaClient, Role } from "./app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
  adapter,
});

const seedProducts = async () => {
  const count = await prisma.user.count();
  if (count === 0) {
    await prisma.user.createMany({
      data: [
<<<<<<< HEAD
        { name: "user1", email: "user1@gmail.com", kindeId: "", profileImage: "", role: "USER", createdAt: new Date(), updatedAt: new Date() },
        { name: "user2", email: "user2@gmail.com", kindeId: "", profileImage: "", role: "USER", createdAt: new Date(), updatedAt: new Date() },
        { name: "user3", email: "user3@gmail.com", kindeId: "", profileImage: "", role: "USER", createdAt: new Date(), updatedAt: new Date() },
=======
        { name: "user1", kindeId: "user1", email: "user1@gmail.com", profileImage: "", role: "USER", createdAt: new Date(), updatedAt: new Date() },
        { name: "user2", kindeId: "user2", email: "user2@gmail.com", profileImage: "", role: "USER", createdAt: new Date(), updatedAt: new Date() },
        { name: "user3", kindeId: "user3", email: "user3@gmail.com", profileImage: "", role: "USER", createdAt: new Date(), updatedAt: new Date() },
>>>>>>> f5e61d8e652cede7270a916259dd5ed3bba7d773
      ],
    });
  }
};

// Run seed if needed
// seedProducts();

export async function getProducts() {
  return prisma.user.findMany();
}

export async function getProduct(id: number) {
  return prisma.user.findUnique({
    where: { id }
  })
}

export async function createProduct(name: string, kindeId: string ,email: string, profileImage: string, role: Role, createdAt: Date, updatedAt: Date){
  return prisma.user.create({
    data: {
      name,
      email,
<<<<<<< HEAD
      kindeId:"",
      profileImage:"",
      role:"USER",
      createdAt: new Date(),
      updatedAt: new Date()
=======
      kindeId,
      profileImage,
      role,
      createdAt,
      updatedAt
>>>>>>> f5e61d8e652cede7270a916259dd5ed3bba7d773
    }
  })
}

export async function updateProduct(id: number, name: string, email: string) {
  return prisma.user.update({
    where: { id },
    data: {
      name,
      email
    }
  })
}

export async function deleteProduct(id: number) {
  return prisma.user.delete({
    where: { id }
  })
}