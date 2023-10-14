use anchor_lang::prelude::*;
mod context;
mod errors;
mod events;
mod state;

use context::*;
declare_id!("EbrRxe4fwd3qoSxEa677TdRTaBV613XHv8RN7EHJnSxE");

#[program]
pub mod formigo_program {
    use super::*;
    pub fn create_admin(ctx: Context<CreateAdmin>, new_admin: Pubkey) -> Result<()> {
        ctx.accounts.new_admin(&ctx.bumps, new_admin)?;
        Ok(())
    }
    pub fn create_form(
        ctx: Context<CreateForm>,
        form_id: Vec<u8>,
        data: Vec<u8>,
        iv: Vec<u8>,
        ec_pubkey: Vec<u8>,
        creator: Pubkey,
        part: u64,
        total_parts: u64,
    ) -> Result<()> {
        ctx.accounts
            .create_form(form_id, data, iv, ec_pubkey, creator, part, total_parts)?;
        Ok(())
    }
    pub fn take_form(
        ctx: Context<TakeForm>,
        form_id: Vec<u8>,
        response_id: Vec<u8>,
        data: Vec<u8>,
        iv: Vec<u8>,
        ec_pubkey: Vec<u8>,
        respondent: Pubkey,
        part: u64,
        total_parts: u64,
    ) -> Result<()> {
        ctx.accounts.take_form(
            form_id,
            response_id,
            data,
            iv,
            ec_pubkey,
            respondent,
            part,
            total_parts,
        )?;

        Ok(())
    }
}
