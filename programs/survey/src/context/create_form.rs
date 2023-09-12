use crate::state::Form;
use anchor_lang::prelude::*;
use std::collections::BTreeMap;

#[derive(Accounts)]
#[instruction(seed: u64)]
pub struct CreateForm<'info> {
    #[account(mut)]
    pub author: Signer<'info>,
    #[account(
        init,
        payer = author,
        space = Form::LEN,
        seeds = [b"form", author.key().as_ref(), seed.to_le_bytes().as_ref()],
        bump,
    )]
    pub form: Account<'info, Form>,
    pub system_program: Program<'info, System>,
}

impl<'info> CreateForm<'info> {
    pub fn create_form(
        &mut self,
        seed: u64,
        bumps: &BTreeMap<String, u8>,
        survey_cid: String,
        expired_at: i64,
        is_public: bool,
    ) -> Result<()> {
        let form = &mut self.form;
        form.seed = seed;
        form.author = self.author.key();
        form.survey_cid = survey_cid;
        form.expired_at = expired_at;
        form.is_public = is_public;
        form.form_bump = *bumps.get("form").unwrap();

        let clock: Clock = Clock::get().unwrap();
        
        form.created_at = clock.unix_timestamp;

        Ok(())
    }
}
