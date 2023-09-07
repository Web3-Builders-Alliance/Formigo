use anchor_lang::prelude::*;
use anchor_spl::token_interface::TokenInterface;

declare_id!("sMafYZrzDNACfmwEDyzgCv7Bq1NKWy8CkkgNjKXRD3f");

#[program]
pub mod survey {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

// TODO: For text fields of survey we can use noop.
// https://github.com/solana-labs/solana-program-library/tree/master/account-compression/programs/noop

#[derive(Accounts)]
pub struct Initialize {}

#[derive(Accounts)]
pub struct NewSurvey<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    //user ata
    pub vault: InterfaceAccount<'info, TokenAccount>,

    pub token_program: Interface<'info, TokenInterface>,
}

//when a user fills out a survey
//encrypt to survey creators key
//store on noop. that way survey data is still private for each user
