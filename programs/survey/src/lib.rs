use anchor_lang::prelude::*;

declare_id!("sMafYZrzDNACfmwEDyzgCv7Bq1NKWy8CkkgNjKXRD3f");

#[program]
pub mod survey {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
