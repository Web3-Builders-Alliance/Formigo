use anchor_lang::prelude::*;
use std::mem::size_of;

#[account]
pub struct Form {
    pub form: Pubkey,
    pub author: Pubkey,
    pub metadata: Pubkey,
    pub authority: Pubkey,
    pub whitelist: Option<Pubkey>,
    pub spl_whitelist: Option<Pubkey>,
    pub survey_user: Pubkey,
    pub seed: u64,
    pub expired_at: i64,
    pub created_at: i64,
    pub updated_at: i64,
    pub bump: u8
}

impl Form {
    pub const LEN: usize = 8 + size_of::<Form>();
}
