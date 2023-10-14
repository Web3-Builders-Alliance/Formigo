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
import { Button } from '../ui/button';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import useFormStore from '@/stores/useFormStore';
import { IoAddCircle, IoTrash } from 'react-icons/io5';
import { useToast } from '../ui/use-toast';

interface ChoiceItem {
  id: number;
  value: string;
}

export default function Question({ index }: { index: number }) {
  const setFormData = useFormStore((state) => state.setFormData);
  const { toast } = useToast();
  const formData = useFormStore((state) => state.formData);
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
    defaultValues: {
      question: '',
      questionType: '',
      choices: [],
      required: 'true',
    },
  });
  const [choices, setChoices] = useState<ChoiceItem[]>([
    { id: 1, value: '' },
    { id: 2, value: '' },
  ]);

  const recordQuestion = async () => {
    let data = form.getValues();
    if (
      data.question == '' ||
      data.questionType == '' ||
      data.required == '' ||
      (data.questionType === 'choice' && !choices)
    ) {
      const missingFields = [];
      if (data.question == '') missingFields.push('Question');
      if (data.questionType == '') missingFields.push('Question type');
      if (data.required == '') missingFields.push('Required');
      if (data.questionType === 'choice' && !choices)
        missingFields.push('choices');

      let message = `${missingFields.join(', ')} field${
        missingFields.length > 1 ? 's' : ''
      } ${missingFields.length > 1 ? ' are' : ' is'} required`;

      toast({
        title: 'Fields that are mandatory must be filled in.',
        description: message,
        variant: 'destructive',
      });
    } else {
      setFormData(index, {
        id: index,
        question: data.question,
        required: data.required
          ? data.required === 'true'
            ? true
            : false
          : false,
        questionType: data.questionType,
        choices:
          data.questionType === 'choice'
            ? choices.map((item) => item.value)
            : '',
      });
    }
  };

  const updateChoicesById = (id: number, updatedData: Partial<ChoiceItem>) => {
    if (formFound.length == 0) {
      const updatedArray = choices.map((item) => {
        if (item.id === id) {
          return { ...item, ...updatedData };
        }
        return item;
      });
      setChoices(updatedArray);
    }
  };

  const addChoice = () => {
    if (formFound.length == 0) {
      setChoices((prev) => [...prev, { id: prev.length + 1, value: '' }]);
    }
  };

  const removeChoiceById = (id: number) => {
    if (formFound.length == 0) {
      const updatedArray = choices.filter((item) => item.id !== id);
      setChoices(updatedArray);
    }
  };

  let formFound = formData.filter((item) => item.id === index);

  return (
    <div className='w-[770px] rounded-md border border-border bg-card p-4 font-sans ring ring-transparent duration-300 ease-in-out focus-within:ring-btn-primary '>
      <div
        className={`${
          formFound.length != 0 ? 'py-4' : 'mb-6'
        } flex items-center gap-2`}
      >
        <div className='flex h-[34px] w-[36px] items-center justify-center rounded-full bg-btn-primary font-sans text-sm font-semibold'>
          {index + 1}
        </div>

        <p className='w-full overflow-hidden text-ellipsis font-sans text-xl font-medium text-txt'>
          {formFound.length != 0
            ? formFound[0].question
            : form.watch('question')}
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
                    {...form.register('questionType', { required: true })}
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

          {form.watch('questionType') != '' ? (
            <>
              <FormField
                control={form.control}
                name='question'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Input question'
                        {...field}
                        {...form.register('question', { required: true })}
                      />
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
                        {...field}
                        className='flex items-center space-x-2'
                      >
                        <RadioGroupItem value={'true'} id='r1' />
                        <Label htmlFor='r1'>Yes</Label>
                        <RadioGroupItem value={'false'} id='r2' />
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
                      {choices.map((item) => {
                        return (
                          <div
                            className={`flex w-full items-center gap-4`}
                            key={item.id}
                          >
                            <Input
                              value={item.value}
                              onChange={(e) => {
                                updateChoicesById(item.id, {
                                  value: e.target.value,
                                });
                              }}
                              placeholder='Input choice'
                              className='w-1/2'
                            />
                            {item.id != 1 && formFound.length == 0 ? (
                              <div
                                className='cursor-pointer'
                                onClick={() => removeChoiceById(item.id)}
                              >
                                <IoTrash className='h-7 w-7 fill-destructive' />
                              </div>
                            ) : (
                              <></>
                            )}
                            {formFound.length != 0 ? (
                              <></>
                            ) : (
                              <div
                                className='cursor-pointer'
                                onClick={addChoice}
                              >
                                <IoAddCircle className='h-7 w-7 fill-btn-primary' />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}
          {formFound.length != 0 ? (
            <></>
          ) : (
            <Button onClick={recordQuestion} type='button'>
              Save question
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}
