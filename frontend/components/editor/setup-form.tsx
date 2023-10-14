'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import {
  FormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '../ui/select';
import { IoCheckmarkCircle } from 'react-icons/io5';
import useFormStore from '@/stores/useFormStore';
import { useToast } from '../ui/use-toast';
import { PublicKey } from '@solana/web3.js';

export default function SetupForm() {
  const { toast } = useToast();
  const setFormOverview = useFormStore((state) => state.setFormOverview);
  const formOverview = useFormStore((state) => state.formOverview);
  const FormSchema = z.object({
    name: z.string().min(1, { message: 'This field has to be filled.' }),
    description: z.string().min(1, { message: 'This field has to be filled.' }),
    validationType: z
      .string()
      .min(1, { message: 'This field has to be filled.' }),
    chain: z.string().min(1, { message: 'This field has to be filled.' }),
    programAddress: z
      .string()
      .min(1, { message: 'This field has to be filled.' }),
    amount: z.string().min(1, { message: 'This field has to be filled.' }),
    walletAddresses: z.array(z.string()).nonempty(),
    theme: z.string(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      validationType: '',
      chain: '',
      programAddress: '',
      amount: '',
      theme: 'black',
      description: '',
      walletAddresses: [],
    },
  });
  async function logOverview() {
    let data = form.getValues();

    if (
      !data.name ||
      !data.description ||
      !data.validationType ||
      !data.theme ||
      data.validationType === 'nft' ||
      data.validationType === 'token'
        ? data.programAddress
          ? false
          : true
        : false ||
          data.validationType === 'nft' ||
          data.validationType === 'token'
        ? data.amount
          ? false
          : true
        : false
    ) {
      const missingFields = [];
      if (!data.name) missingFields.push('title');
      if (!data.description) missingFields.push('description');
      if (!data.theme) missingFields.push('theme');
      if (!data.validationType) missingFields.push('validation');
      if (data.validationType === 'nft' || data.validationType === 'token') {
        if (!data.programAddress) {
          missingFields.push('program address');
        }
        if (!data.amount) {
          missingFields.push('amount');
        }
      }

      let message = `${missingFields.join(', ')} field${
        missingFields.length > 1 ? 's' : ''
      } ${missingFields.length > 1 ? ' are' : ' is'} required`;

      toast({
        title: 'Fields that are mandatory must be filled in.',
        description: message,
        variant: 'destructive',
      });
    } else if (
      data.validationType === 'nft' ||
      data.validationType === 'token'
    ) {
      let valid;
      try {
        valid = PublicKey.isOnCurve(data.programAddress);
      } catch (error) {
        valid = false;
      }
      if (!valid) {
        toast({
          title: 'Program address not valid.',
          description: 'Provide a valid program address',
          variant: 'destructive',
        });
      } else {
        setFormOverview(
          data.name,
          data.description,
          data.validationType,
          data.theme,
          data.walletAddresses,
          data.programAddress,
          data.amount
        );
      }
    } else {
      setFormOverview(
        data.name,
        data.description,
        data.validationType,
        data.theme,
        data.walletAddresses,
        data.programAddress,
        data.amount
      );
    }
  }

  return (
    <div
      className={`w-[770px] rounded-md border border-border bg-card p-4 font-sans ring ring-transparent duration-300 ease-in-out focus-within:ring-btn-primary`}
    >
      <h1 className='text-xl font-medium text-txt'>Form configuration</h1>

      <div className='mt-6 flex flex-col'>
        <Form {...form}>
          <form className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Input form title'
                      {...field}
                      {...form.register('name', { required: true })}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Input form description'
                      {...field}
                      {...form.register('description', { required: true })}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='theme'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Theme</FormLabel>
                  <FormControl>
                    <div className='flex items-center gap-2'>
                      <Button
                        type='button'
                        className={`h-8 w-8 border bg-background ${
                          form.watch('theme') === 'dark' &&
                          form.watch('theme') != null
                            ? 'border-btn-primary'
                            : 'border-transparent hover:border-btn-primary'
                        } hover:bg-background `}
                        onClick={() => form.setValue('theme', 'dark')}
                      ></Button>
                      <Button
                        type='button'
                        className={`h-8 w-8 border bg-foreground ${
                          form.watch('theme') === 'ligth' &&
                          form.watch('theme') != null
                            ? 'border-btn-primary'
                            : 'border-transparent hover:border-btn-primary'
                        } hover:bg-foreground`}
                        onClick={() => form.setValue('theme', 'ligth')}
                      ></Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='validationType'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Validation</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      {...form.register('validationType')}
                    >
                      <SelectTrigger className='w-1/2'>
                        <SelectValue placeholder='Select validation type' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Validation types</SelectLabel>
                          {/* <SelectItem value='token'>Token gating</SelectItem>
                          <SelectItem value='nft'>NFT Gating</SelectItem> */}
                          {/* <SelectItem value='wallet'>
                            Wallet address whitelisting
                          </SelectItem> */}
                          <SelectItem value='public'>Public or Anonymous</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.watch('validationType') == 'token' ||
            form.watch('validationType') == 'nft' ? (
              <div className='flex w-full gap-2.5'>
                <FormField
                  control={form.control}
                  name='chain'
                  render={({ field }) => (
                    <FormItem
                      className={`${
                        form.watch('chain') == 'solana' ? 'w-full' : 'w-1/2'
                      }`}
                    >
                      <FormLabel>Chain</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          {...form.register('chain')}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder='Select chain' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Chains</SelectLabel>
                              <SelectItem value='solana'>Solana</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {form.watch('chain') == 'solana' ? (
                  <FormField
                    control={form.control}
                    name='programAddress'
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormLabel>Program address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Input program address'
                            {...field}
                            {...form.register('programAddress', {
                              required: true,
                            })}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : null}
              </div>
            ) : null}
            {form.watch('validationType') != '' &&
            form.watch('validationType') != 'public' ? (
              form.watch('validationType') != 'wallet' ? (
                <FormField
                  control={form.control}
                  name='amount'
                  render={({ field }) => (
                    <FormItem className='w-1/2'>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input
                          pattern='[0-9]'
                          type='number'
                          placeholder='Input amount'
                          {...form.register('amount', { required: true })}
                          onChange={(e) => {
                            const re = /^[0-9\b]+$/;
                            if (re.test(e.target.value)) {
                              field.onChange(e.target.value);
                            }
                          }}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <FormField
                  control={form.control}
                  name='walletAddresses'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Wallet addresses</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Input wallet addresses'
                          {...field}
                          {...form.register('walletAddresses')}
                        />
                      </FormControl>
                      <FormDescription>
                        {
                          'Input wallet addresses (Solana or EVM) seprated by comma.'
                        }
                      </FormDescription>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              )
            ) : null}
          </form>
          {formOverview ? (
            <></>
          ) : (
            <div className='mt-6 flex'>
              <Button onClick={logOverview} type='submit'>
                Save configuration
              </Button>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
}
