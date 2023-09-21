use crate::{
    errors::ContractError,
    state::{form::*, metadata::*, whitelist::*, SPLWhitelist, User},
};
use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{Mint, Token},
};
use std::collections::BTreeMap;

#[derive(Accounts)]
#[instruction(seed: u64)]
pub struct CreateForm<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(mut)]
    pub author: Signer<'info>,
    #[account(
        init,
        payer = authority,
        space = Form::LEN,
        seeds = [b"form", author.key().as_ref(), seed.to_le_bytes().as_ref()],
        bump,
    )]
    pub form: Box<Account<'info, Form>>,
    #[account(
        init,
        payer = authority,
        space = 8 + Metadata::INIT_SPACE,
        seeds = [b"metadata", author.key().as_ref(), seed.to_le_bytes().as_ref()],
        bump,
    )]
    pub metadata: Box<Account<'info, Metadata>>,
    #[account(
        init,
        payer = authority,
        space = Whitelist::LEN,
        seeds = [b"whitelist", author.key().as_ref(), seed.to_le_bytes().as_ref()],
        bump,
    )]
    pub whitelist: Option<Account<'info, Whitelist>>,

    pub mint: Option<Account<'info, Mint>>,
    #[account(
        init,
        payer = authority,
        space = SPLWhitelist::LEN,
        seeds = [b"spl_whitelist", author.key().as_ref(), seed.to_le_bytes().as_ref()],
        bump,
        )]
    pub spl_whitelist: Option<Account<'info, SPLWhitelist>>,
    #[account(
        mut,
        seeds = [b"survey_user", author.key().as_ref()],
        bump=survey_user.bump
    )]
    pub survey_user: Box<Account<'info, User>>,
    pub token_program: Option<Program<'info, Token>>,
    pub associated_token_program: Option<Program<'info, AssociatedToken>>,
    pub system_program: Program<'info, System>,
}

impl<'info> CreateForm<'info> {
    pub fn create_form(
        &mut self,
        bumps: &BTreeMap<String, u8>,
        seed: u64,
        expired_at: i64,
        data: Vec<u8>,
        root: Option<[u8; 32]>,
        spl_amt_req: Option<u64>,
    ) -> Result<()> {
        // Check if provided data is JSON format
        let status = verify(&data);
        require!(
            status == SerializationStatusOption::VERIFIED,
            ContractError::DataNotJSON
        );
        let clock: Clock = Clock::get().unwrap();
        // Saving form
        let form = &mut self.form;
        form.authority = self.authority.key();
        form.author = self.author.key();
        form.seed = seed;
        form.expired_at = expired_at;
        form.created_at = clock.unix_timestamp;
        form.updated_at = clock.unix_timestamp;
        form.bump = *bumps.get("form").unwrap();
        form.survey_user = self.survey_user.key();

        // Check if user provided a whitelist config
        match (
            &mut self.whitelist,
            root,
            &mut self.spl_whitelist,
            &mut self.mint,
            &self.token_program,
            &self.associated_token_program,
        ) {
            (Some(whitelist_account), Some(root_hash), None, None, None, None) => {
                let whitelist = whitelist_account;
                whitelist.authority = self.authority.key();
                whitelist.bump = *bumps.get("whitelist").unwrap();
                whitelist.root = root_hash;
            }
            (None, None, Some(spl_w), Some(spl), Some(_), Some(_)) => {
                spl_w.authority = self.authority.key();
                spl_w.bump = *bumps.get("spl_whitelist").unwrap();
                spl_w.spl = spl.key();
                match spl_amt_req {
                    Some(amt) => {
                        spl_w.spl_amt_req = amt;
                    }
                    None => {
                        spl_w.spl_amt_req = 1;
                    }
                }
            }
            (_, _, _, _, _, _) => (),
        }
        // Save the form data to metadata account
        let metadata = &mut self.metadata;
        metadata.authority = self.authority.key();
        metadata.data = data;
        metadata.bump = *bumps.get("metadata").unwrap();

        Ok(())
    }
}
