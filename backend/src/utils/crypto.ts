import crypto from "crypto";

// Encryption and Decryption functions
export function encrypt(text: string, sharedSecret: Buffer) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", sharedSecret, iv);
  let encryptedMessage = cipher.update(text, "utf-8", "hex");
  encryptedMessage += cipher.final("hex");
  return {
    iv: iv.toString("hex"),
    encryptedData: encryptedMessage,
  };
}

export function decrypt(
  encryptedData: string,
  iv: string,
  sharedSecret: Buffer
) {
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    sharedSecret,
    Buffer.from(iv, "hex")
  );

  let decryptedMessage = decipher.update(encryptedData, "hex", "utf-8");

  decryptedMessage += decipher.final("utf-8");
  return decryptedMessage.toString();
}
