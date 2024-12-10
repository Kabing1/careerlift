import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { z } from 'zod';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().optional(),
  role: z.enum(['USER', 'ADMIN']).default('USER'),
});

export type User = z.infer<typeof userSchema>;

export async function generateToken(user: User): Promise<string> {
  const token = await new SignJWT({ sub: user.id, email: user.email, role: user.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);

  return token;
}

export async function verifyToken(token: string) {
  try {
    const verified = await jwtVerify(token, secret);
    return verified.payload;
  } catch {
    return null;
  }
}

export async function getSession() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) return null;

  const payload = await verifyToken(token);
  return payload;
}

export async function getCurrentUser() {
  const session = await getSession();
  
  if (!session?.sub) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.sub }
  });

  return user;
}