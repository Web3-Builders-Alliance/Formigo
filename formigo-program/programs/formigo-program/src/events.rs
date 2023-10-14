use anchor_lang::prelude::*;

#[event]
pub struct CreateFormEvent {
    pub form_id: Vec<u8>,
    pub data: Vec<u8>,
    pub iv: Vec<u8>,
    pub creator: Pubkey,
    pub part: u64,
    pub total_parts: u64,
    pub ec_pubkey: Vec<u8>
    
}

#[event]
pub struct TakeFormEvent {
    pub form_id: Vec<u8>,
    pub response_id: Vec<u8>,
    pub data: Vec<u8>,
    pub iv: Vec<u8>,
    pub ec_pubkey: Vec<u8>,
    pub respondent: Pubkey,
    pub part: u64,
    pub total_parts: u64
    
}
