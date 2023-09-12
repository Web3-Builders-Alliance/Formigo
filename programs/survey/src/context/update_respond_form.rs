use anchor_lang::prelude::*;
use crate::state::{form::*, respondent_form::*};

#[derive(Accounts)]
pub struct UpdateRespondForm<'info> {
    /// CHECK: checking form owner
    pub author: UncheckedAccount<'info>,
    #[account(mut)]
    pub respondent: Signer<'info>,
    #[account(
        has_one = author,
        seeds= [b"form", author.key().as_ref(), form.seed.to_le_bytes().as_ref()],
        bump=form.form_bump,
    )]
    pub form: Account<'info, Form>,
    #[account(
        mut,
        has_one=respondent,
        seeds= [b"respondent_form", respondent.key().as_ref()],
        bump=respondent_form.respondent_bump
    )]
    pub respondent_form: Account<'info, RespondedForm>,

    pub system_program: Program<'info, System>,
}

impl<'info> UpdateRespondForm<'info> {
    pub fn update_respond_form(&mut self, response_cid: String) -> Result<()> {
        let responded_form = &mut self.respondent_form;
        responded_form.response_cid = response_cid;
        let clock: Clock = Clock::get().unwrap();
        responded_form.updated_at = clock.unix_timestamp;

        Ok(())
    }
}
