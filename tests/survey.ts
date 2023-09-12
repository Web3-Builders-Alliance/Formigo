import * as anchor from "@coral-xyz/anchor";
import { IDL, OnchainForm } from "../target/types/onchain_form";
import { Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import { BN } from "bn.js";

describe("onchain-form", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const programId = new PublicKey(
    "okJipcQU6DvgZQyUUwRLoP9ChpxajxpyAkPQ7SUqbqi"
  );

  const program = new anchor.Program<OnchainForm>(
    IDL,
    programId,
    anchor.getProvider()
  );
  const author = new Keypair();
  const respondent = new Keypair();

  const authorForm = PublicKey.findProgramAddressSync(
    [
      Buffer.from("form"),
      author.publicKey.toBytes(),
      new BN(1).toArrayLike(Buffer, "le", 8),
    ],
    program.programId
  )[0];

  const respondentForm = PublicKey.findProgramAddressSync(
    [Buffer.from("respondent_form"), respondent.publicKey.toBytes()],
    program.programId
  )[0];

  it("Airdrop", async () => {
    await anchor
      .getProvider()
      .connection.requestAirdrop(
        author.publicKey,
        10000 * anchor.web3.LAMPORTS_PER_SOL
      )
      .then(confirmTx);

    await anchor
      .getProvider()
      .connection.requestAirdrop(
        respondent.publicKey,
        10000 * anchor.web3.LAMPORTS_PER_SOL
      )
      .then(confirmTx);
  });

  it("Create Survey form", async () => {
    await program.methods
      .createForm(new BN(1), "dsadsadsa", new BN(1697126518), true)
      .accounts({
        author: author.publicKey,
        form: authorForm,
        systemProgram: SystemProgram.programId,
      })
      .signers([author])
      .rpc()
      .then(confirmTx);
  });

  it("Respond Survey form", async () => {
    await program.methods
      .respondToForm("fdfdfdsds")
      .accounts({
        author: author.publicKey,
        form: authorForm,
        respondent: respondent.publicKey,
        respondentForm,
        systemProgram: SystemProgram.programId,
      })
      .signers([respondent])
      .rpc()
      .then(confirmTx);
    const respondent_pda = PublicKey.findProgramAddressSync(
      [Buffer.from("respondent_form"), respondent.publicKey.toBytes()],
      program.programId
    )[0];

    let data = await program.account.respondedForm.fetch(respondent_pda);
    console.log(data.responseCid);
  });
  it("Update the Respond on the Survey form", async () => {
    let acc = await program.methods
      .updateRespondForm("123")
      .accounts({
        author: author.publicKey,
        form: authorForm,
        respondent: respondent.publicKey,
        respondentForm,
        systemProgram: SystemProgram.programId,
      })
      .signers([respondent])
      .rpc()
      .then(confirmTx);

    const respondent_pda = PublicKey.findProgramAddressSync(
      [Buffer.from("respondent_form"), respondent.publicKey.toBytes()],
      program.programId
    )[0];

    let data = await program.account.respondedForm.fetch(respondent_pda);
    console.log(data.responseCid);
  });
});

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
