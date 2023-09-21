use anchor_lang::prelude::*;
mod context;
mod errors;
mod state;
mod util;

use context::*;


declare_id!("3n4xNzLs29Sn7xTj4q79a3k52KWJFrewecFgG3JAvYip");

#[program]
pub mod survey {
    use super::*;

    pub fn create_user(ctx: Context<CreateUser>, pubkey: Vec<u8>, nonce: Vec<u8>) -> Result<()> {
        ctx.accounts.create_user(&ctx.bumps, pubkey, nonce)
    }

    pub fn create_form(
        ctx: Context<CreateForm>,
        seed: u64,
        expired_at: i64,
        data: Vec<u8>,
        root: Option<[u8; 32]>,
        spl_amt_req: Option<u64>,
    ) -> Result<()> {
        ctx.accounts
            .create_form(&ctx.bumps, seed, expired_at, data, root, spl_amt_req)
    }
    pub fn create_taker_form(
        ctx: Context<CreateTakerForm>,
        data: Vec<u8>,
        nonce: Vec<u8>,
        proof: Option<Vec<[u8; 32]>>,
    ) -> Result<()> {
        ctx.accounts
            .create_taker_form(&ctx.bumps, data, nonce, proof)
    }
}
