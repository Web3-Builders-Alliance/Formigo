use std::collections::BTreeMap;

use crate::errors::*;
use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, TokenAccount};

use crate::state::{Form, Metadata, SPLWhitelist, TakerForm, User, Whitelist};
use crate::util::verify_proof;

#[derive(Accounts)]
pub struct CreateTakerForm<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(mut)]
    pub taker: Signer<'info>,
    #[account(
        mut,
        seeds = [b"form", form.author.key().as_ref(), form.seed.to_le_bytes().as_ref()],
        bump=form.bump,
    )]
    pub form: Box<Account<'info, Form>>,
    #[account(
        init,
        payer = authority,
        space = 8 + Metadata::INIT_SPACE,
        seeds = [b"metadata", taker.key().as_ref(), form.seed.to_le_bytes().as_ref()],
        bump,
    )]
    pub metadata: Box<Account<'info, Metadata>>,
    #[account(
        init,
        payer = authority,
        space = 8 + TakerForm::INIT_SPACE,
        seeds = [b"taker_form", taker.key().as_ref(), form.seed.to_le_bytes().as_ref()],
        bump
    )]
    pub taker_form: Box<Account<'info, TakerForm>>,
    #[account(
        mut,
        seeds = [b"survey_user", taker.key().as_ref()],
        bump=survey_user.bump
    )]
    pub survey_user: Box<Account<'info, User>>,
    #[account(
        mut,
        seeds = [b"whitelist", form.author.key().as_ref(), form.seed.to_le_bytes().as_ref()],
        bump=whitelist.bump,
    )]
    pub whitelist: Option<Account<'info, Whitelist>>,
    #[account(
        mut,
        seeds = [b"spl_whitelist", form.author.key().as_ref(), form.seed.to_le_bytes().as_ref()],
        bump=spl_whitelist.bump,
        )]
    pub spl_whitelist: Option<Account<'info, SPLWhitelist>>,
    pub mint: Option<Account<'info, Mint>>,
    #[account(
        mut,
        associated_token::mint=mint,
        associated_token::authority=taker,
        )]
    pub taker_ata: Option<Account<'info, TokenAccount>>,
    pub system_program: Program<'info, System>,
}

impl<'info> CreateTakerForm<'info> {
    pub fn create_taker_form(
        &mut self,
        bumps: &BTreeMap<String, u8>,
        data: Vec<u8>,
        nonce: Vec<u8>,
        proof: Option<Vec<[u8; 32]>>,
    ) -> Result<()> {
        let form = &self.form;
        let whitelist = form.whitelist;
        let spl_whitelist = form.spl_whitelist;
        // Check if form have a whitelist config
        match (whitelist, proof, spl_whitelist) {
            (Some(w), Some(proof_hash), None) => match &self.whitelist {
                Some(list_addr) => {
                    let node = anchor_lang::solana_program::keccak::hash(self.taker.key().as_ref());
                    // Check if provided whitelist account is same on the form
                    require_keys_eq!(w, list_addr.key(), ContractError::InvalidWhitelistAccount);
                    // Verify the provided proof to continue
                    require!(
                        verify_proof(proof_hash, list_addr.root, node.0),
                        ContractError::InvalidProof
                    );
                }
                None => (),
            },
            (Some(_), None, None) => {
                msg!("Provide Whitelist account")
            }
            (None, None, Some(spl)) => match (&self.spl_whitelist, &self.taker_ata) {
                (Some(col), Some(ata)) => {
                    // Check if provided spl whitelist account is same on the form
                    require_keys_eq!(spl, col.key(), ContractError::InvalidWhitelistAccount);
                    // Check if taker have the required spl
                    require!(ata.amount >= col.spl_amt_req, ContractError::SPLAccountNotPass);
                }
                (None, Some(_)) => {
                    msg!("Provide SPL White list account")
                }
                (Some(_), None) => {
                    msg!("Provide SPL Taker ATA account")
                }

                (_, _) => (),
            },
            (_, _, _) => (),
        }
        // Saving taker form
        let taker_form = &mut self.taker_form;
        taker_form.authority = self.authority.key();
        taker_form.form = self.form.key();
        taker_form.nonce = nonce;
        taker_form.bump = *bumps.get("taker_form").unwrap();

        //Saving encrypted data to taker form metadata account
        let metadata = &mut self.metadata;
        metadata.authority = self.authority.key();
        metadata.data = data;
        metadata.bump = *bumps.get("metadata").unwrap();

        Ok(())
    }
}
