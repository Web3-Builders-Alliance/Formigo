use anchor_lang::prelude::*;
use crate::state::{form::*, respondent_form::*};
use anchor_lang::__private::CLOSED_ACCOUNT_DISCRIMINATOR;
use std::io::{Cursor, Write};
use std::ops::DerefMut;

#[derive(Accounts)]
pub struct CloseRespondForm<'info> {
    /// CHECK: checking form owner
    pub author: UncheckedAccount<'info>,
    #[account(mut)]
    pub respondent: Signer<'info>,
    #[account(
        has_one = author,
        seeds= [b"form", author.key().as_ref(), form.seed.to_le_bytes().as_ref()],
        bump=form.form_bump,
    )]
    pub form: Account<'info, Form>,
    #[account(
        mut,
        close=respondent,
        seeds= [b"respondent_form", respondent.key().as_ref()],
        bump=respondent_form.respondent_bump
        
    )]
    pub respondent_form: Account<'info, RespondedForm>,

    pub system_program: Program<'info, System>,
}

impl<'info> CloseRespondForm<'info> {
    pub fn close_respond_form(&mut self) -> Result<()> {
        let dest_starting_lamports = self.respondent.lamports();
        let account = self.respondent_form.to_account_info();
        **self.author.lamports.borrow_mut() = dest_starting_lamports
            .checked_add(account.lamports())
            .unwrap();
        **account.lamports.borrow_mut() = 0;

        let mut data = account.try_borrow_mut_data()?;
        for byte in data.deref_mut().iter_mut(){
            *byte = 0;
        }

        let dst: &mut [u8] = &mut data;
        let mut cursor = Cursor::new(dst);
        cursor.write_all(&CLOSED_ACCOUNT_DISCRIMINATOR).unwrap();

        Ok(())
    }
}
