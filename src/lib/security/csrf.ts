// Generate and validate CSRF tokens
const CSRF_SECRET = import.meta.env.VITE_CSRF_SECRET || 'default-csrf-secret';

export function generateCSRFToken(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2);
  return `${timestamp}.${random}`;
}

export function validateCSRFToken(token: string): boolean {
  if (!token) return false;

  const [timestamp] = token.split('.');
  const tokenAge = Date.now() - parseInt(timestamp, 36);
  
  // Token expires after 4 hours
  return tokenAge < 4 * 60 * 60 * 1000;
}