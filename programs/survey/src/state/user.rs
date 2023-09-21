use anchor_lang::prelude::*;
use std::mem::size_of;

#[account]
#[derive(InitSpace)]
pub struct User {
    pub authority: Pubkey,
    pub user: Pubkey,
    #[max_len(33)]
    pub pub_key: Vec<u8>,
    #[max_len(50)]
    pub nonce: Vec<u8>,
    pub bump: u8
}


impl User {
    pub const LEN: usize = 8 + size_of::<User> ();
}