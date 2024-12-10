import { verify } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function authenticateUser(token: string) {
  try {
    const decoded = verify(token, process.env.JWT_SECRET!);
    const userId = typeof decoded === 'string' ? decoded : decoded.sub;
    
    return await prisma.user.findUnique({
      where: { id: userId as string },
    });
  } catch (error) {
    return null;
  }
}