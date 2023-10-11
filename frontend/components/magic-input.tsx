'use client';

import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
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
import { Magic } from 'magic-sdk';
import { SolanaExtension } from '@magic-ext/solana';
import { useRouter } from 'next/navigation';

const rpcUrl = 'https://api.devnet.solana.com';

let apiKey: string;
if (process.env.NEXT_PUBLIC_MAGIC_API_DEVNET) {
  apiKey = process.env.NEXT_PUBLIC_MAGIC_API_DEVNET;
} else {
  throw new Error("Magic api key doesn't exist");
}
const magic = new Magic(apiKey, {
  extensions: {
    solana: new SolanaExtension({
      rpcUrl,
    }),
  },
});

export default function MagicInput() {
  const router = useRouter();
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
    await magic.auth.loginWithEmailOTP(form.getValues());
    router.push('/dashboard');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(login)}>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Input your email' {...field} />
              </FormControl>
              <FormDescription>
                {'We’ll email you a magic link for a password-free experience.'}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='mt-6 w-full' type='submit'>
          Continue with email
        </Button>
      </form>
    </Form>
  );
}
