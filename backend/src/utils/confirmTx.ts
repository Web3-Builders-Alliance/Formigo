import { Connection } from "@solana/web3.js";

export const confirmTx = async (connection: Connection, signature: string) => {
  const latestBlockHash = await connection.getLatestBlockhash();
  await connection.confirmTransaction(
    {
      signature,
      ...latestBlockHash,
    },
    "confirmed"
  );

  return signature;
};
