use anchor_lang::prelude::*;
use crate::state::form::*;

#[derive(Accounts)]
#[instruction(seed: u64)]
pub struct UpdateForm<'info> {
    #[account(mut)]
    pub author: Signer<'info>,
    #[account(
        mut,
        has_one=author,
        seeds = [b"form", author.key().as_ref(), form.seed.to_le_bytes().as_ref()],
        bump=form.form_bump,
    )]
    pub form: Account<'info, Form>,
    pub system_program: Program<'info, System>,
}

impl<'info> UpdateForm<'info> {
    pub fn update_form(
        &mut self,
        new_survey_cid: String,
        new_expired_at: i64,
        new_is_public: bool,
    ) -> Result<()> {
        let form = &mut self.form;
        form.survey_cid = new_survey_cid;
        form.expired_at = new_expired_at;
        form.is_public = new_is_public;

        let clock: Clock = Clock::get().unwrap();

        form.updated_at = clock.unix_timestamp;

        Ok(())
    }
}
