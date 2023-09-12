use anchor_lang::prelude::*;
mod constant;
mod context;
mod state;
mod errors;
use context::*;
declare_id!("okJipcQU6DvgZQyUUwRLoP9ChpxajxpyAkPQ7SUqbqi");

#[program]
pub mod onchain_form {
    use super::*;

    pub fn create_form(
        ctx: Context<CreateForm>,
        seed: u64,
        survey_cid: String,
        expired_at: i64,
        is_public: bool,
    ) -> Result<()> {
        ctx.accounts
            .create_form(seed, &ctx.bumps, survey_cid, expired_at, is_public)
    }

    pub fn update_form(
        ctx: Context<UpdateForm>,
        new_survey_cid: String,
        new_expired_at: i64,
        new_is_public: bool,
    ) -> Result<()> {
        ctx.accounts
            .update_form(new_survey_cid, new_expired_at, new_is_public)
    }

    pub fn close_form(ctx: Context<CloseForm>) -> Result<()> {
        ctx.accounts.close_form()
    }

    pub fn respond_to_form(ctx: Context<RespondToForm>, response_cid: String) -> Result<()> {
        ctx.accounts.respond_to_form(&ctx.bumps, response_cid)
    }

    pub fn update_respond_form(
        ctx: Context<UpdateRespondForm>,
        response_cid: String,
    ) -> Result<()> {
        ctx.accounts.update_respond_form(response_cid)
    }

    pub fn close_respond_form(ctx: Context<CloseRespondForm>) -> Result<()> {
        ctx.accounts.close_respond_form()
    }
}
