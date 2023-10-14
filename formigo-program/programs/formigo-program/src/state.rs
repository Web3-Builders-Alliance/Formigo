
use anchor_lang::prelude::*;

#[account]
pub struct Admin {
    pub authority: Pubkey,
    pub bump: u8,
}

impl Admin {
    pub const LEN: usize = 8 + 32 + 1;
}
