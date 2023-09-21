use anchor_lang::prelude::*;
use std::mem::size_of;

#[account]
#[derive(InitSpace)]
pub struct TakerForm {
    pub taker_form: Pubkey,
    pub form: Pubkey,
    pub metadata: Pubkey,
    pub bump: u8,
    #[max_len(33)]
    pub nonce: Vec<u8>,
    pub authority: Pubkey,
    pub created_at: i64,
    pub updated_at: i64,
}

impl TakerForm {
    pub const LEN: usize = 8 + size_of::<TakerForm>();
}
