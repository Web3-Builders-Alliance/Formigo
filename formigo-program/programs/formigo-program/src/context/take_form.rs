use crate::events::*;
use crate::state::*;
use anchor_lang::{prelude::Pubkey, prelude::*, solana_program::pubkey};

#[derive(Accounts)]
pub struct TakeForm<'info> {
    #[account(mut,address=pubkey!("E2HTjRWHYtSQsJy1Yh3q6J3cc2iD1aQvwBoPhbYRThjd"))]
    pub payer: Signer<'info>,
    #[account(
        mut,
        seeds = [b"admin"],
        bump=admin.bump,
        )]
    pub admin: Account<'info, Admin>,

    pub system_program: Program<'info, System>,
}

impl<'info> TakeForm<'info> {
    pub fn take_form(
        &mut self,
        form_id: Vec<u8>,
        response_id: Vec<u8>,
        data: Vec<u8>,
        iv: Vec<u8>,
        ec_pubkey: Vec<u8>,
        respondent: Pubkey,
        part: u64,
        total_parts: u64,
    ) -> Result<()> {
        let admin = &self.admin;
        if admin.authority == *self.payer.key {
            emit!(TakeFormEvent {
                data,
                response_id,
                ec_pubkey,
                respondent,
                form_id,
                part,
                total_parts,
                iv
            });
        }

        Ok(())
    }
}
