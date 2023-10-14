import { ec } from 'elliptic';
import keccak256 from 'keccak256';
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

export { getSharedKey };
