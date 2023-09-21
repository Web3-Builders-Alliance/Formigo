use std::collections::BTreeMap;

use anchor_lang::prelude::*;

use crate::state::User;

#[derive(Accounts)]
pub struct CreateUser<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    pub user: Signer<'info>,
    #[account(
        init,
        payer = authority,
        space = 8 + User::INIT_SPACE,
        seeds = [b"survey_user", user.key().as_ref()],
        bump,
    )]
    pub survey_user: Account<'info, User>,
    pub system_program: Program<'info, System>,
}

impl<'info> CreateUser<'info> {
    pub fn create_user(
        &mut self,
        bumps: &BTreeMap<String, u8>,
        pubkey: Vec<u8>,
        nonce: Vec<u8>,
    ) -> Result<()> {
        // Save user account
        let user = &mut self.survey_user;
        user.authority = self.authority.key();
        user.nonce = nonce;
        user.pub_key = pubkey;
        user.bump = *bumps.get("survey_user").unwrap();

        Ok(())
    }
}
