import { ec } from "elliptic";
import keccak256 from "keccak256";
import { WALLET } from "./secrets";
import { Keypair } from "@solana/web3.js";
import { decodeUTF8 } from "tweetnacl-util";
import nacl from "tweetnacl";
const alg = new ec("curve25519");

const serverKeyPair = Keypair.fromSecretKey(new Uint8Array(WALLET));

const getSharedKey = async (
  signature: Uint8Array | Buffer,
  receiverPub: string
) => {
  // Generate user ec keypair
  const entropyHex = Buffer.from(signature).toString("hex");
  const entropyBuffer = Buffer.from(entropyHex, "hex");
  const kHashed = keccak256(entropyBuffer);
  const keyPair = alg.keyFromPrivate(kHashed);
  let keypairPub = keyPair.getPublic();
  let ec_pub = keypairPub.encode("hex", false);

  // Generate receiver ec pubkey
  const reciever = alg.keyFromPublic(receiverPub.toString(), "hex");

  // Generate shared key

  const sharedKey = keyPair.derive(reciever.getPublic());
  const hashedSharedKey = keccak256(sharedKey.toString());
  

  return { hashedSharedKey, ec_pub };
};

const serverSignature = async () => {
  let message =
    "formigo.xyz wants you to sign in with your Solana account: E2HTjRWHYtSQsJy1Yh3q6J3cc2iD1aQvwBoPhbYRThjd using magic. This message generate a signature for encryption and decryption purposes. Do not share to others your signature";

  const messageBytes = decodeUTF8(message);

  const signature = nacl.sign.detached(messageBytes, serverKeyPair.secretKey);
  return signature;
};

export { getSharedKey, serverSignature };
