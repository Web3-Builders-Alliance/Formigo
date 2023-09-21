use anchor_lang::prelude::*;
use std::mem::size_of;

#[account]
pub struct Whitelist {
    pub authority: Pubkey,
    pub whitelist: Pubkey,
    pub root: [u8; 32],
    pub bump: u8
}


impl Whitelist {
    pub const  LEN: usize = 8 + size_of::<Whitelist> ();
}