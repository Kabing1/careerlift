import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.ENCRYPTION_KEY || 'default-key';

export function encrypt(data: any): string {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
}

export function decrypt(encryptedData: string): any {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

export function hashPassword(password: string): string {
  return CryptoJS.SHA256(password).toString();
}

export function comparePasswords(password: string, hashedPassword: string): boolean {
  return CryptoJS.SHA256(password).toString() === hashedPassword;
}