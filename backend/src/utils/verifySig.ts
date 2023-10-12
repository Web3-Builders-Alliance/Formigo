import nacl from "tweetnacl";
import bs58 from "bs58";

export function verifySig(
  message: string,
  walletAddress: string,
  signature: string
) {
  const verified = nacl.sign.detached.verify(
    new TextEncoder().encode(message),
    bs58.decode(signature),
    bs58.decode(walletAddress)
  );
  if (verified) {
    return true;
  } else {
    return false;
  }
}
