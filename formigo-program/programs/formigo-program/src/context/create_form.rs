use crate::events::*;
use anchor_lang::{prelude::Pubkey, prelude::*};

use crate::state::*;

#[derive(Accounts)]
pub struct CreateForm<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    #[account(
        mut,
        seeds = [b"admin"],
        bump=admin.bump,
        )]
    pub admin: Account<'info, Admin>,

    pub system_program: Program<'info, System>,
}

impl<'info> CreateForm<'info> {
    pub fn create_form(
        &mut self,
        form_id: Vec<u8>,
        data: Vec<u8>,
        iv: Vec<u8>,
        ec_pubkey: Vec<u8>,
        creator: Pubkey,
        part: u64,
        total_parts: u64,
    ) -> Result<()> {
        let admin = &self.admin;

        if admin.authority == *self.payer.key {
            emit!(CreateFormEvent {
                data,
                ec_pubkey,
                creator,
                form_id,
                part,
                total_parts,
                iv
            });
        }

        Ok(())
    }
}
