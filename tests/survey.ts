import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Survey, IDL } from "../target/types/survey";
import { Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import { BN } from "bn.js";
import crypto from "crypto";
import { ec, BNInput } from "elliptic";
import { hash } from "blake3";
import { before } from "mocha";
import nacl from "tweetnacl";
import { decodeUTF8 } from "tweetnacl-util";

describe("survey", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const programId = new PublicKey(
    "3n4xNzLs29Sn7xTj4q79a3k52KWJFrewecFgG3JAvYip"
  );

  const program = new anchor.Program<Survey>(
    IDL,
    programId,
    anchor.getProvider()
  );
    // Keypairs
  const authority = new Keypair();
  const author = new Keypair();
  const taker = new Keypair();


  // PDA for author form
  const authorForm = PublicKey.findProgramAddressSync(
    [
      Buffer.from("form"),
      author.publicKey.toBytes(),
      new BN(1).toArrayLike(Buffer, "le", 8),
    ],
    program.programId
  )[0];
  // PDA for taker form
  const takerForm = PublicKey.findProgramAddressSync(
    [
      Buffer.from("taker_form"),
      taker.publicKey.toBytes(),
      new BN(1).toArrayLike(Buffer, "le", 8),
    ],
    program.programId
  )[0];
    // PDA for author form metadata 
  const authorFormMetadata = PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      author.publicKey.toBytes(),
      new BN(1).toArrayLike(Buffer, "le", 8),
    ],
    program.programId
  )[0];
  // PDA for taker form metadata 
  const takerFormMetadata = PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      taker.publicKey.toBytes(),
      new BN(1).toArrayLike(Buffer, "le", 8),
    ],
    program.programId
  )[0];
// User pda for author
  const authorUserPDA = PublicKey.findProgramAddressSync(
    [Buffer.from("survey_user"), author.publicKey.toBytes()],
    program.programId
  )[0];
  // User pda for taker
  const takerUserPDA = PublicKey.findProgramAddressSync(
    [Buffer.from("survey_user"), taker.publicKey.toBytes()],
    program.programId
  )[0];

  // JSON to encrypt and sample form JSON
  const data = [
    {
      item: "test1",
    },
    {
      item: "test2",
    },
    {
      item: "test3",
    },
    {
      item: "test4",
    },
    {
      item: "test5",
    },
  ];
  // Buffer of data
  const bufferData = Buffer.from(JSON.stringify(data));
  // Nonce for other layer security seed collison
  let n = "231ehwdq";
  // Nonce buffer
  const nonce = Buffer.from("231ehwdq");
  // Algoritm to use to gnerate ecdh
  const alg = new ec("curve25519");
  // Sample signed message with nonce
  const message = `The quick brown fox jumps over the lazy dog ${n}`;

  // Airdrop solana first to keyapirs
  before(async () => {
    await anchor
      .getProvider()
      .connection.requestAirdrop(
        authority.publicKey,
        10000 * anchor.web3.LAMPORTS_PER_SOL
      )
      .then(confirmTx);
    await anchor
      .getProvider()
      .connection.requestAirdrop(
        taker.publicKey,
        10000 * anchor.web3.LAMPORTS_PER_SOL
      )
      .then(confirmTx);

    await anchor
      .getProvider()
      .connection.requestAirdrop(
        author.publicKey,
        10000 * anchor.web3.LAMPORTS_PER_SOL
      )
      .then(confirmTx);
  });

  it("Create user account for author!", async () => {
    // Add your test here.
    // Signing a message
    const messageBytes = decodeUTF8(message);
    const signature = nacl.sign.detached(messageBytes, author.secretKey);

    const entropyHex = Buffer.from(signature).toString("hex");
    const entropyBuffer = Buffer.from(entropyHex, "hex");
    // Hash to blake3
    const z = hash(entropyBuffer);
    // Generate keypair using hashed signature as private key
    let key1 = alg.keyFromPrivate(z);
    // Get the generated public key
    let key1_pub = key1.getPublic();
     // Serialize the pubkey to create author account
    let v = key1_pub.encode("hex", false);
    let bufferHex = Buffer.from(v.toString());

    // Creating user (one time)
    await program.methods
      .createUser(bufferHex, nonce)
      .accounts({
        authority: authority.publicKey,
        user: author.publicKey,
        surveyUser: authorUserPDA,
        systemProgram: SystemProgram.programId,
      })
      .signers([authority, author])
      .rpc()
      .then(confirmTx);
  });

  it("Create form!", async () => {
    // Add your test here.
    // Creating form
    const tx = await program.methods
      .createForm(new BN(1), new BN(1697511708), bufferData, null, null)
      .accounts({
        authority: authority.publicKey,
        surveyUser: authorUserPDA,
        author: author.publicKey,
        form: authorForm,
        metadata: authorFormMetadata,
        whitelist: null,
        splWhitelist: null,
        tokenProgram: null,
        associatedTokenProgram: null,
        mint: null,

        systemProgram: SystemProgram.programId,
      })
      .signers([authority, author])
      .rpc()
      .then(confirmTx);
  });

  it("Create taker form", async () => {
    // Get the form creator ecdh pubkey from author account/program
    let authorData = (
      await program.account.user.fetch(authorUserPDA)
    ).pubKey.toString();
    // Convert the ecdh pubkey get from author account to elliptic pubkey
    let author_pub = alg.keyFromPublic(authorData, "hex");
    // Taker Signed the message
    const messageBytes = decodeUTF8(message);
    const signature = nacl.sign.detached(messageBytes, taker.secretKey);
    // Make the signed message to buffer
    const entropyHex = Buffer.from(signature).toString("hex");
    const entropyBuffer = Buffer.from(entropyHex, "hex");
    // Hash to blake3
    const z = hash(entropyBuffer);
    // Generate keypair using hashed signature as private key
    let key1 = alg.keyFromPrivate(z);
    // Derive a key from author pubkey use for encryption
    let shared1 = key1.derive(author_pub.getPublic());
    // Hash to blake3 and make its as AES key
    const key = hash(Buffer.from(shared1.toString()));
    // Encrypt data using aes encryption
    const encryptedData = encrypt(JSON.stringify(data), key);

    // Serialize the pubkey to create taker account
    let pubKey = key1.getPublic();
    let v = pubKey.encode("hex", false);
    // Create user account (one time)
    await program.methods
      .createUser(Buffer.from(v.toString()), nonce)
      .accounts({
        authority: authority.publicKey,
        user: taker.publicKey,
        surveyUser: takerUserPDA,
        systemProgram: SystemProgram.programId,
      })
      .signers([authority, taker])
      .rpc()
      .then(confirmTx);
    // Create taker form and encrypted data to metadata
    await program.methods
      .createTakerForm(
        Buffer.from(encryptedData.encryptedData),
        Buffer.from(encryptedData.iv),
        null
      )
      .accounts({
        authority: authority.publicKey,
        takerForm: takerForm,
        surveyUser: takerUserPDA,
        taker: taker.publicKey,
        form: authorForm,
        metadata: takerFormMetadata,
        takerAta: null,
        whitelist: null,
        splWhitelist: null,
        systemProgram: SystemProgram.programId,
        mint: null,
      })
      .signers([authority, taker])
      .rpc()
      .then(confirmTx);
  });
  it("Decrypt taker form data", async () => {
    try {
      // Author signing and generating keypair
      const messageBytes = decodeUTF8(message);
      const signature = nacl.sign.detached(messageBytes, author.secretKey);
      const entropyHex = Buffer.from(signature).toString("hex");
      const entropyBuffer = Buffer.from(entropyHex, "hex");
      const z = hash(entropyBuffer);
      let key1 = alg.keyFromPrivate(z);

      // Get the taker form data and metadata
      let takerFormData = await program.account.takerForm.fetch(takerForm);
      let takerData = await program.account.metadata.fetch(takerFormMetadata);
      // Get the taker user account
      let takerPub = await program.account.user.fetch(takerUserPDA);
      let takerKey = alg.keyFromPublic(takerPub.pubKey.toString(), "hex");
      // Derive a key from taker pubkey
      let shared1 = key1.derive(takerKey.getPublic());
      // Hash to blake3 to get the aes key
      const key = hash(Buffer.from(shared1.toString()));
      // Decrypt the data using nonce as iv, and encrypted data
      let decryptData = decrypt(
        takerData.data.toString(),
        takerFormData.nonce.toString(),
        key
      );
      // Parse the decrypted data to JSON format
      console.log(JSON.parse(decryptData));
    } catch (error) {
      console.log(error);
    }
  });
});

// Encryption and Decryption functions
function encrypt(text: string, sharedSecret: Buffer) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", sharedSecret, iv);
  let encryptedMessage = cipher.update(text, "utf-8", "hex");
  encryptedMessage += cipher.final("hex");
  return {
    iv: iv.toString("hex"),
    encryptedData: encryptedMessage,
  };
}

function decrypt(encryptedData: string, iv: string, sharedSecret: Buffer) {
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    sharedSecret,
    Buffer.from(iv, "hex")
  );
  let decryptedMessage = decipher.update(encryptedData, "hex", "utf-8");
  decryptedMessage += decipher.final("utf-8");
  return decryptedMessage.toString();
}

const confirmTx = async (signature: string) => {
  const latestBlockHash = await anchor
    .getProvider()
    .connection.getLatestBlockhash();
  await anchor.getProvider().connection.confirmTransaction(
    {
      signature,
      ...latestBlockHash,
    },
    "confirmed"
  );
  return signature;
};
