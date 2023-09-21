use anchor_lang::prelude::*;
use borsh::{BorshDeserialize, BorshSerialize};
use serde_json::Value;
use std::mem::size_of;

#[derive(PartialEq, Debug, Clone, BorshDeserialize, BorshSerialize)]
pub enum SerializationStatusOption {
    UNVERIFIED,
    VERIFIED,
    FAILED,
}
/// Verfies that the data conforms to the json
pub fn verify(data: &[u8]) -> SerializationStatusOption {
    if data.is_empty() {
        return SerializationStatusOption::UNVERIFIED;
    }
    match serde_json::from_slice::<Value>(&data) {
        Ok(_) => SerializationStatusOption::VERIFIED,  
        Err(_) => SerializationStatusOption::FAILED,
    }
}

#[account]
#[derive(InitSpace)]
pub struct Metadata {
    pub metadata: Pubkey,
    pub authority: Pubkey,
    #[max_len(1000)]
    pub data: Vec<u8>,
    pub bump: u8,
}

impl Metadata {
    pub const LEN: usize = 8 + size_of::<Metadata>();
}
