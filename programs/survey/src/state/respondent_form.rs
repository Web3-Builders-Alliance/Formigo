use anchor_lang::prelude::*;
use crate::constant::*;

#[account]
pub struct RespondedForm {
    pub author: Pubkey,
    pub respondent: Pubkey,
    pub respondent_bump: u8,
    pub form: Pubkey,
    pub response_cid: String,
    pub seed: u64,
    pub created_at: i64,
    pub updated_at: i64,
}
impl RespondedForm {
    pub const LEN: usize =
        8 + (PUBKEY_L * 3) + U8_L + (TIMESTAMP_L * 2) + (STRING_L + MAX_CID_L) + U64_L;
}
