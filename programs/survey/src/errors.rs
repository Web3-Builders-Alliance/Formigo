use anchor_lang::error_code;

#[error_code]
pub enum ContractError {
    #[msg("Survey is already expired!")]
    SurveyAlreadyExpired,
}
