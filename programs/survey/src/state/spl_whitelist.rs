use anchor_lang::prelude::*;
use std::mem::size_of;

#[account]
pub struct SPLWhitelist {
    pub authority: Pubkey,
    pub spl: Pubkey,
    pub bump: u8,
    pub spl_amt_req: u64
}


impl SPLWhitelist {
    pub const  LEN: usize = 8 + size_of::<SPLWhitelist> ();
}