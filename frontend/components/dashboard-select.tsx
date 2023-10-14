'use client';

import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useDashboardDateStore from '@/stores/useDashboardDateStore';

export default function DashboardSelect() {
  const setDate = useDashboardDateStore((state) => state.setDate);
  const selectedDate = useDashboardDateStore((state) => state.date);
  const FormSchema = z.object({
    date: z.string().min(1, { message: 'This field has to be filled.' }),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { date: selectedDate },
  });

  setDate(form.watch('date'));
  return (
    <Form {...form}>
      <form className='space-y-4'>
        <FormField
          control={form.control}
          name='date'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  {...form.register('date')}
                >
                  <SelectTrigger className='bg-card'>
                    <SelectValue />
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value='30d'>Last 30 days</SelectItem>
                        <SelectItem value='14d'>Last 14 days</SelectItem>
                        <SelectItem value='7d'>Last 7 days</SelectItem>
                        <SelectItem value='24h'>Last 24 hours</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </SelectTrigger>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
