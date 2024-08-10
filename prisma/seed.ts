import * as argon from 'argon2';
import { PrismaClient } from '@prisma/client';
import { Role } from '../src/auth/enums/roles';

export async function createCustomer() {
  return {
    firstName: 'Boris',
    lastName: 'Alibeja',
    username: 'borissalibeja@gmail.com',
    password: await argon.hash('boriss'),
    contactInfo: 'berat',
    role: Role.CUSTOMER,
  };
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
      role: customerData.role,
    },
  });
}

main();
