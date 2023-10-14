import nacl from "tweetnacl";
import bs58 from "bs58";
import { decodeUTF8 } from "tweetnacl-util";
const { base58_to_binary } = require("base58-js");
export function verifySig(
  message: any,
  walletAddress: string,
  signature: any,
  wallet: "magic" | "adapter"
) {
  let verified;

  if (wallet === "magic") {
    const signatureArray: any = Object.values(signature);
    const buffer = Buffer.from(signatureArray);
    verified = nacl.sign.detached.verify(
      decodeUTF8(message),
      buffer,
      base58_to_binary(walletAddress)
    );
  } else {
    verified = nacl.sign.detached.verify(
      decodeUTF8(message),
      Buffer.from(signature),
      base58_to_binary(walletAddress)
    );
  }

  if (verified) {
    return true;
  } else {
    return false;
  }
}
