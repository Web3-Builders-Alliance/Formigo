use crate::errors::*;
use crate::state::{form::*, respondent_form::*};
use anchor_lang::prelude::*;
use std::collections::BTreeMap;

#[derive(Accounts)]
pub struct RespondToForm<'info> {
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
        init,
        payer=respondent,
        space = RespondedForm::LEN,
        seeds= [b"respondent_form", respondent.key().as_ref()],
        bump
    )]
    pub respondent_form: Account<'info, RespondedForm>,
    pub system_program: Program<'info, System>,
}

impl<'info> RespondToForm<'info> {
    pub fn respond_to_form(
        &mut self,
        bumps: &BTreeMap<String, u8>,
        response_cid: String,
    ) -> Result<()> {
        let clock: Clock = Clock::get().unwrap();
        require!(
            self.form.expired_at > clock.unix_timestamp,
            ContractError::SurveyAlreadyExpired
        );

        let responded_form = &mut self.respondent_form;
        responded_form.author = self.author.key();
        responded_form.respondent = self.respondent.key();
        responded_form.form = self.form.key();
        responded_form.response_cid = response_cid;
        responded_form.seed = self.form.seed;
        responded_form.respondent_bump = *bumps.get("respondent_form").unwrap();

        responded_form.created_at = clock.unix_timestamp;
        responded_form.updated_at = clock.unix_timestamp;

        Ok(())
    }
}
