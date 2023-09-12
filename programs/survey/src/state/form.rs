use crate::constant::*;
use anchor_lang::prelude::*;

#[account]
pub struct Form {
    pub author: Pubkey,
    pub form: Pubkey,
    pub form_bump: u8,
    pub survey_cid: String,
    pub is_public: bool,
    pub seed: u64,
    pub expired_at: i64,
    pub created_at: i64,
    pub updated_at: i64,
}

impl Form {
    pub const LEN: usize =
        8 + (PUBKEY_L * 2) + U8_L + (TIMESTAMP_L * 3) + (STRING_L + MAX_CID_L) + U64_L + BOOL_L;
}


