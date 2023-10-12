'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { IoArrowForward, IoArrowBack } from 'react-icons/io5';
import { Badge } from '../ui/badge';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

const formData = {
  title: 'Formigo Alpha User feedback',
  brandLogo: '',
  theme: 'black',
  description:
    'Alpha member feedback is valuable for our product development, guiding improvements and aligning with user expectations.',
  validation: {
    type: 'public',
    address: null,
    amount: null,
    chain: null,
  },
  questions: [
    {
      question: 'How are you?',
      required: 'true',
      type: 'text',
      choices: [],
    },
    {
      question:
        'Are you experiencing difficulties or challenges with the product?',
      type: 'choice',
      required: 'true',
      choices: [
        {
          choice: 'Yes',
        },
        {
          choice: 'No',
        },
      ],
    },
    {
      question: 'Are you okay with the product UI/UX?',
      type: 'choice',
      required: 'false',
      choices: [
        {
          choice: 'Yes',
        },
        {
          choice: 'No',
        },
      ],
    },
    {
      question: 'Do you have suggestion about the product?',
      type: 'text',
      required: 'true',
      choices: [],
    },
  ],
};

export default function PublishedForm() {
  const [questionStep, setQuestionStep] = useState<number>(0);

  return (
    <main className='flex h-screen w-full items-center justify-center font-sans'>
      <aside className='flex h-screen w-[620px] border-r border-border bg-card pt-48'>
        <div className='mt-16 flex flex-col gap-2 px-6'>
          <Image
            src='/formigo_logo_white.png'
            alt='formigo logo full'
            width={40}
            height={30}
            className='mb-2'
          />
          <h1 className='text-3xl font-semibold'>{formData.title}</h1>
          <p className='text-base text-txt-secondary'>{formData.description}</p>
        </div>
      </aside>

      <AnimatePresence mode='wait'>
        <motion.div
          key={questionStep}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className='flex w-full items-center justify-center'
        >
          <div className='flex w-1/2 flex-col gap-20'>
            {questionStep > 0 ? (
              <div
                className='flex w-fit cursor-pointer items-center hover:underline'
                onClick={() => setQuestionStep(questionStep - 1)}
              >
                <IoArrowBack className='mr-2' /> Back
              </div>
            ) : null}
            <div className='flex flex-col gap-4'>
              <Label className='text-2xl'>
                {formData.questions[questionStep].question}
              </Label>

              {formData.questions[questionStep].type === 'text' ? (
                <>
                  <Input />
                  {formData.questions[questionStep].required === 'true' ? (
                    <p className='text-sm text-green-500'>
                      This field is required
                    </p>
                  ) : null}
                </>
              ) : (
                <>
                  <RadioGroup>
                    {formData.questions[questionStep].choices.map(
                      (item, index) => (
                        <div className='flex items-center space-x-2'>
                          <RadioGroupItem
                            value={item.choice}
                            id={`r${index}`}
                          />
                          <Label htmlFor={`r${index}`}>{item.choice}</Label>
                        </div>
                      )
                    )}
                  </RadioGroup>
                  {formData.questions[questionStep].required === 'true' ? (
                    <p className='text-sm text-green-500'>
                      This field is required
                    </p>
                  ) : null}
                </>
              )}
              <div className='mt-6 flex justify-between'>
                <p className='text-base text-txt-secondary'>{`Question ${
                  questionStep + 1
                } / ${formData.questions.length}`}</p>
                <div>
                  <Button
                    variant='outline'
                    onClick={
                      questionStep + 1 === formData.questions.length
                        ? () => {}
                        : () => setQuestionStep(questionStep + 1)
                    }
                  >
                    {questionStep + 1 === formData.questions.length ? (
                      'Submit'
                    ) : (
                      <IoArrowForward />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
