import dotenv from "dotenv";
dotenv.config();

const FORMIGO_PROGRAM = process.env["FORMIGO_PROGRAM"];

if (!FORMIGO_PROGRAM) {
  console.log(
    "No formigo program address. Set FORMIGO_PROGRAM environment variable."
  );
  process.exit(1);
}

const RPC = process.env["RPC"];

if (!RPC) {
  console.log("No RPC to interact with. Set RPC environment variable.");
  process.exit(1);
}

const MONGODB_URI = process.env["MONGODB_URI"];

if (!MONGODB_URI) {
  console.log(
    "No mongo connection string. Set MONGODB_URI environment variable."
  );
  process.exit(1);
}

const JWT_SECRET = process.env["JWT_SECRET"];

if (!JWT_SECRET) {
  console.log("No JWT secret string. Set JWT_SECRET environment variable.");
  process.exit(1);
}

const PORT = process.env["PORT"];

if (!PORT) {
  console.log("No PORT");
  process.exit(1);
}

const ADMIN_WALLET_PK = process.env["ADMIN_WALLET_PK"];

if (!ADMIN_WALLET_PK) {
  console.log(
    "No admin wallet for transaction. Set ADMIN_WALLET_PK environment variable."
  );
  process.exit(1);
}
const walletUnset = ADMIN_WALLET_PK.split(" ");

const ALLOWED_DOMAIN = process.env["ALLOWED_DOMAIN"];

if (!ALLOWED_DOMAIN) {
  console.log(
    "No domain string for cors. Set ALLOWED_DOMAIN environment variable."
  );
  process.exit(1);
}

const WALLET = walletUnset.map(Number);

const MAGIC_SECRET = process.env["AUTH_MAGIC_KEY"];
if (!MAGIC_SECRET) {
  console.log(
    "No auth magic key for decryption. Set AUTH_MAGIC_KEY environment variable."
  );
  process.exit(1);
}

export {
  WALLET,
  RPC,
  PORT,
  JWT_SECRET,
  MONGODB_URI,
  FORMIGO_PROGRAM,
  ALLOWED_DOMAIN,
  MAGIC_SECRET,
};
