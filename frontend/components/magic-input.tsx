'use client';

import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import * as web3 from '@solana/web3.js';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from './ui/form';
import { Input } from './ui/input';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useRouter } from 'next/navigation';
import { magic } from '@/lib/magic';
import useMagicStore from '@/stores/useMagicStore';
import axios from 'axios';
import { decodeUTF8 } from 'tweetnacl-util';
import { ReactEventHandler, useState } from 'react';
import { ReloadIcon } from '@radix-ui/react-icons';
import useUserStore from '@/stores/useUserStore';
import { signIn } from 'next-auth/react';
import { generateKeyMessage } from '@/lib/generateMessage';

export default function MagicInput() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const setUser = useMagicStore((state) => state.setUser);
  const setLoginUser = useUserStore((state) => state.login);
  const setWallet = useMagicStore((state) => state.setWallet);
  const FormSchema = z.object({
    email: z
      .string()
      .email('This is not a valid email.')
      .min(1, { message: 'This field has to be filled.' }),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const login = async () => {
    try {
      setLoading(true);
      await magic.auth.loginWithEmailOTP(form.getValues());
      const usermagic = await magic.user.getInfo();

      const walletAdd = new web3.PublicKey(usermagic.publicAddress as string);
      const message = generateKeyMessage(usermagic.publicAddress);
      const encodedMsg = decodeUTF8(message);
      const signature = await magic.solana.signMessage(encodedMsg);

      setUser(usermagic);
      setWallet(walletAdd);

      let signInData = await signIn('credentials', {
        walletAddress: usermagic.publicAddress,
        signature,
        message,
        wallet: 'magic',
        redirect: false,
      });
      if (signInData?.ok) {
        router.push('/dashboard');
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(login)}>
        <FormField
          control={form.control}
          defaultValue=''
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Input your email' {...field} />
              </FormControl>
              <FormDescription>
                {'We’ll email you a magic code for a password-free experience.'}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {loading ? (
          <Button disabled className='mt-6 flex w-full'>
            <ReloadIcon className='spin mr-2 h-4 w-4' />
            Please wait
          </Button>
        ) : (
          <Button className='mt-6 w-full' type='submit'>
            Continue with email
          </Button>
        )}
      </form>
    </Form>
  );
}
