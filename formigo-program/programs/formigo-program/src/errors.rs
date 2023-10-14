use anchor_lang::error_code;

#[error_code]
pub enum ContractError {
    #[msg("Invalid bump")]
    InvalidBump,
    #[msg("Not admin")]
    NotAdmin,
}
