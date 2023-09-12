use anchor_lang::__private::CLOSED_ACCOUNT_DISCRIMINATOR;
use anchor_lang::prelude::*;
use std::io::{Cursor, Write};
use std::ops::DerefMut;
use crate::state::Form;

#[derive(Accounts)]
pub struct CloseForm<'info> {
    #[account(mut)]
    pub author: Signer<'info>,
    #[account(
        mut,
        close = author,
        has_one= author,
        seeds = [b"form", author.key().as_ref(), form.seed.to_le_bytes().as_ref()],
        bump = form.form_bump,
    )]
    pub form: Account<'info, Form>,
    pub system_program: Program<'info, System>,
}

impl<'info> CloseForm<'info> {
    pub fn close_form(&mut self) -> Result<()> {
        let dest_starting_lamports = self.author.lamports();
        let account = self.form.to_account_info();
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
