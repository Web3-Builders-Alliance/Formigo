export function generateLogInMessage(wallet: string | ""): string {
  const message =
    `formigo.xyz wants you to sign in with your Solana account:\n` +
    `${wallet}\n` +
    `Click Sign or Approve only means you have proved this wallet is owned by you.\n` +
    `URI: https://formigo.xyz\n` +
    `Version: 1\n` +
    `Issued At: ${new Date()}`;

  return message;
}

export function generateKeyMessage(wallet: string | null): string {
  const message = `formigo.xyz wants you to sign in with your Solana account: ${wallet} using magic. This message generate a signature for encryption and decryption purposes.Do not share to others your signature`;

  return message;
}
