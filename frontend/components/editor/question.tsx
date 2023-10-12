'use client';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '../ui/select';

import {
  FormField,
  FormItem,
  Form,
  FormLabel,
  FormControl,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Choices from './choices';
import { Button } from '../ui/button';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';

export default function Question({ index }: { index: number }) {
  const FormSchema = z.object({
    question: z.string().min(1, { message: 'This field has to be filled.' }),
    questionType: z
      .string()
      .min(1, { message: 'This field has to be filled.' }),
    choices: z.array(z.string()).nonempty(),
    required: z.string(),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const [choiceComponents, setChoiceComponents] = useState<React.ReactNode[]>(
    []
  );

  const addChoice = () => {
    setChoiceComponents((prevComponents) => [
      ...prevComponents,
      <Choices
        key={prevComponents.length}
        index={prevComponents.length}
        removeChoice={removeChoice}
      />,
    ]);
  };

  // Function to remove a choice component by index
  const removeChoice = (indexToRemove: number) => {
    setChoiceComponents((prevComponents) =>
      prevComponents.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div className='w-[770px] rounded-md border border-border bg-card p-4 font-sans ring ring-transparent duration-300 ease-in-out focus-within:ring-btn-primary '>
      <div className='mb-6 flex items-center gap-2'>
        <div className='flex h-[34px] w-[36px] items-center justify-center rounded-full bg-btn-primary font-sans text-sm font-semibold'>
          {index}
        </div>

        <p className='w-full overflow-hidden text-ellipsis font-sans text-xl font-medium text-txt'>
          {form.watch('question')}
        </p>
      </div>
      <Form {...form}>
        <form className='space-y-4'>
          <FormField
            control={form.control}
            name='questionType'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question type</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    {...form.register('questionType')}
                  >
                    <SelectTrigger className='w-1/2'>
                      <SelectValue placeholder='Select question type' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Question types</SelectLabel>
                        <SelectItem value='choice'>Multiple choice</SelectItem>
                        <SelectItem value='text'>Text answer</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch('questionType') != null ? (
            <>
              <FormField
                control={form.control}
                name='question'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question</FormLabel>
                    <FormControl>
                      <Input placeholder='Input question' {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='required'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Required</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={"true"}
                        className='flex items-center space-x-2'
                      >
                        <RadioGroupItem value={'true'} id='r1' />
                        <Label htmlFor='r1'>Yes</Label>
                        <RadioGroupItem value={'false'} id='r1' />
                        <Label htmlFor='r2'>No</Label>
                      </RadioGroup>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          ) : null}

          {form.watch('questionType') === 'choice' ? (
            <FormField
              control={form.control}
              name='choices'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Choices</FormLabel>
                  <FormControl>
                    <>
                      <div
                        className={`flex w-1/3 flex-col gap-2 ${
                          choiceComponents.length == 0 ? '' : 'pb-2'
                        }`}
                      >
                        {choiceComponents}
                      </div>
                      <Button
                        type='button'
                        className='text-sm'
                        onClick={addChoice}
                      >
                        Add choice
                      </Button>
                    </>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}
        </form>
      </Form>
    </div>
  );
}
