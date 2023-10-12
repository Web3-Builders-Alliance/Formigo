import { Connection } from "@solana/web3.js";

export async function isBlockhashExpired(
  connection: Connection,
  lastValidBlockHeight: number
) {
  let currentBlockHeight = await connection.getBlockHeight("finalized");
  return currentBlockHeight > lastValidBlockHeight - 150;
}
