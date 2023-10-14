use std::collections::BTreeMap;

use anchor_lang::{prelude::Pubkey, prelude::*};
use solana_program::pubkey;

use crate::state::*;

#[derive(Accounts)]
pub struct CreateAdmin<'info> {
    #[account(mut,address=pubkey!("E2HTjRWHYtSQsJy1Yh3q6J3cc2iD1aQvwBoPhbYRThjd"))]
    pub payer: Signer<'info>,
    #[account(
        init,
        payer=payer,
        space = Admin::LEN,
        seeds = [b"admin"],
        bump
        )]
    pub admin: Account<'info, Admin>,

    pub system_program: Program<'info, System>,
}

impl<'info> CreateAdmin<'info> {
    pub fn new_admin(&mut self, bumps: &BTreeMap<String, u8>, new_admin: Pubkey) -> Result<()> {
        let admin = &mut self.admin;
        admin.authority = new_admin;
        admin.bump = *bumps.get("admin").unwrap();
        Ok(())
    }
}
