import crypto from 'crypto';

export function encrypt(text: string, sharedSecret: Buffer) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', sharedSecret, iv);
  let encryptedMessage = cipher.update(text, 'utf-8', 'hex');
  encryptedMessage += cipher.final('hex');
  return {
    iv: iv.toString('hex'),
    encryptedData: encryptedMessage,
  };
}
