use anchor_lang::error_code;

#[error_code]
pub enum ContractError {
    #[msg("Survey is already expired!")]
    SurveyAlreadyExpired,
    #[msg("Provided data not JSON")]
    DataNotJSON,
    #[msg("Invalid bump")]
    InvalidBump,
    #[msg("Root hash must be provided")]
    RootHashMustBeProvided,
    #[msg("Invalid Merkle proof.")]
    InvalidProof,
    #[msg("Invalid whitelist account.")]
    InvalidWhitelistAccount,
    #[msg("Invalid SPL whitelist account.")]
    InvalidSPLWhitelistAccount,
    #[msg("SPL account holds not pass the requirement")]
    SPLAccountNotPass,
}
