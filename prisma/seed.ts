import * as argon from 'argon2';
import { PrismaClient } from '@prisma/client';

export async function createCustomer() {
  return {
    firstName: "Boris",
    lastName: "Alibeja",
    username: "borissalibeja@gmail.com",
    password: await argon.hash('boriss'),
    contactInfo: "berat",
    role: "ADMIN",

  }
  
}

async function main() { 
  const prisma = new PrismaClient();

  const customerData = await createCustomer();
  await prisma.user.create({
    data: { 
      firstName: customerData.firstName,
      lastName: customerData.lastName,
      username: customerData.username,
      password: customerData.password,
      contactInfo: customerData.contactInfo,
      role: customerData.role
    }
    
      
    
  })
}

main()