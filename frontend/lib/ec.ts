import { Keypair } from '@solana/web3.js';
import { ec } from 'elliptic';
import keccak256 from 'keccak256';
import { generateKeyMessage } from './generateMessage';
import nacl from 'tweetnacl';
import { decodeUTF8 } from 'tweetnacl-util';
const alg = new ec('curve25519');

const getSharedKey = async (
  signature: Uint8Array | Buffer,
  receiverPub: string
) => {
  // Generate user ec keypair
  const entropyHex = Buffer.from(signature).toString('hex');
  const entropyBuffer = Buffer.from(entropyHex, 'hex');
  const kHashed = keccak256(entropyBuffer);
  const keyPair = alg.keyFromPrivate(kHashed);
  let keypairPub = keyPair.getPublic();
  let ec_pub = keypairPub.encode('hex', false);

  // Generate receiver ec pubkey
  const reciever = alg.keyFromPublic(receiverPub.toString(), 'hex');

  // Generate shared key

  const sharedKey = keyPair.derive(reciever.getPublic());
  const hashedSharedKey = keccak256(sharedKey.toString());

  return { hashedSharedKey, ec_pub };
};

const getAnonSharedKey = async (receiverPub: string) => {
  // Generate new keyapir

  const anonKeyPair = new Keypair();
  let anonSolanaAddress = anonKeyPair.publicKey.toBase58();
  const keyMessage = generateKeyMessage(anonSolanaAddress);
  const messageBytes = decodeUTF8(keyMessage);

  const signature = nacl.sign.detached(messageBytes, anonKeyPair.secretKey);
  // Generate user ec keypair
  const entropyHex = Buffer.from(signature).toString('hex');
  const entropyBuffer = Buffer.from(entropyHex, 'hex');
  const kHashed = keccak256(entropyBuffer);
  const keyPair = alg.keyFromPrivate(kHashed);
  let keypairPub = keyPair.getPublic();
  let ec_pub = keypairPub.encode('hex', false);

  // Generate receiver ec pubkey
  const reciever = alg.keyFromPublic(receiverPub.toString(), 'hex');

  // Generate shared key

  const sharedKey = keyPair.derive(reciever.getPublic());
  const hashedSharedKey = keccak256(sharedKey.toString());

  return { hashedSharedKey, ec_pub,anonSolanaAddress };
};

export { getSharedKey, getAnonSharedKey };
