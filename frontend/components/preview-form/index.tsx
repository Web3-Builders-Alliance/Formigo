'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import {
  IoArrowForward,
  IoArrowBack,
  IoEye,
  IoCheckmarkCircle,
} from 'react-icons/io5';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { useToast } from '../ui/use-toast';

type Question = {
  id: number;
  question: string;
  required: boolean;
  questionType: string;
  choices: string[];
};
type PreviewData = {
  name: string;
  description: string;
  validation: string;
  theme: string;
  walletAddress: [];
  programAddress: string;
  amount: string;
  questions: Question[];
};

interface AnswerItem {
  answer: string | null;
  id: number;
}
export default function PreviewForm({ data }: { data: PreviewData }) {
  const { toast } = useToast();

  const [questionStep, setQuestionStep] = useState<number>(0);
  const initialState =
    data.questions.length != 0
      ? [{ id: data.questions[questionStep].id, answer: null }]
      : [];

  const [answers, setAnswers] = useState<AnswerItem[]>(initialState);
  const [done, setDone] = useState(false);

  const updateAnswerById = (id: number, updatedData: Partial<AnswerItem>) => {
    const updatedArray = answers.map((item) => {
      if (item.id === id) {
        return { ...item, ...updatedData };
      }
      return item;
    });
    setAnswers(updatedArray);
  };

  function logAnswer() {
    setDone(true);
  }

  function requiredFieldToast() {
    toast({
      title: 'This field is required.',
      description: 'Provide a information in the field to continue.',
      variant: 'destructive',
    });
  }

  return (
    <>
      <nav
        className={`flex h-[70px] w-full items-center justify-center ${
          data?.theme == 'dark'
            ? ' border-b bg-card'
            : 'border-b border-[#EAEBF0] bg-white'
        }`}
      >
        <IoEye
          className={`mr-2 h-5 w-5 ${
            data?.theme == 'dark' ? '' : 'fill-gray-900'
          }`}
        />
        <p
          className={`font-sans text-lg font-medium ${
            data?.theme == 'dark' ? '' : 'text-black'
          }`}
        >
          Preview
        </p>
      </nav>
      <main
        className={`flex h-screen w-full items-center justify-center font-sans ${
          data?.theme == 'dark' ? '' : 'bg-[#FAFBFC]'
        } overflow-y-hidden`}
      >
        <aside
          className={`flex h-screen w-[620px] flex-col justify-between ${
            data?.theme == 'dark'
              ? 'border-r border-border bg-card'
              : 'border-r border-[#EAEBF0] bg-white'
          }  pt-48`}
        >
          <div className='mt-16 flex flex-col gap-2 px-6'>
            <h1
              className={`text-3xl font-semibold  ${
                data?.theme == 'dark' ? '' : 'text-gray-800'
              }`}
            >
              {data?.name}
            </h1>
            <p className='text-base text-txt-secondary'>{data?.description}</p>
          </div>
        </aside>
        {!done ? (
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
                    className={`flex w-fit cursor-pointer items-center hover:underline ${
                      data?.theme == 'dark' ? '' : 'text-gray-900'
                    }`}
                    onClick={() => setQuestionStep(questionStep - 1)}
                  >
                    <IoArrowBack
                      className={`mr-2 ${
                        data?.theme == 'dark' ? '' : 'fill-gray-900'
                      }`}
                    />{' '}
                    Back
                  </div>
                ) : null}
                <div className='flex flex-col gap-4'>
                  <Label
                    className={`text-2xl ${
                      data?.theme == 'dark' ? '' : 'text-gray-900'
                    }`}
                  >
                    {data.questions[questionStep]?.question}
                  </Label>

                  {data.questions[questionStep]?.questionType === 'text' ? (
                    <>
                      <Input
                        onChange={(e) => {
                          console.log(e.target.value);

                          updateAnswerById(data.questions[questionStep].id, {
                            answer: e.target.value,
                          });
                        }}
                        className={`${
                          data?.theme == 'dark'
                            ? ''
                            : 'border border-[#EAEBF0] bg-[#FAFBFC] text-black'
                        }`}
                      />
                      {data.questions[questionStep].required === true ||
                      data.questions[questionStep].required === true ? (
                        <p className='text-sm text-green-500'>
                          This field is required
                        </p>
                      ) : null}
                    </>
                  ) : (
                    <>
                      <RadioGroup
                        className='text-green'
                        onValueChange={(e) => {
                          updateAnswerById(data.questions[questionStep].id, {
                            answer: e,
                          });
                        }}
                      >
                        {data.questions[questionStep]?.choices.length != 0 ? (
                          data.questions[questionStep]?.choices.map(
                            (choice: string, index: number) => (
                              <div className='flex items-center space-x-2'>
                                <RadioGroupItem
                                  className='bg-green'
                                  value={choice}
                                  id={`r${index}`}
                                />
                                <Label
                                  className={`${
                                    data?.theme == 'dark' ? '' : 'text-black'
                                  }`}
                                  htmlFor={`r${index}`}
                                >
                                  {choice}
                                </Label>
                              </div>
                            )
                          )
                        ) : (
                          <></>
                        )}
                      </RadioGroup>
                      {data.questions[questionStep]?.required ? (
                        <p className='text-sm text-green-500'>
                          This field is required
                        </p>
                      ) : null}
                    </>
                  )}
                  <div className='mt-6 flex justify-between'>
                    <p className='text-base text-txt-secondary'>{`Question ${
                      questionStep + 1
                    } / ${data.questions.length}`}</p>
                    <div>
                      <Button
                        variant={`${
                          data?.theme == 'dark' ? 'outline' : 'outline-primary'
                        }`}
                        onClick={
                          questionStep + 1 === data.questions.length
                            ? data.questions[questionStep].required
                              ? answers[data.questions[questionStep].id]
                                  .answer != null
                                ? logAnswer
                                : requiredFieldToast
                              : logAnswer
                            : () => {
                                if (data.questions[questionStep].required) {
                                  if (answers[questionStep].answer != null) {
                                    setQuestionStep(questionStep + 1);
                                    if (
                                      answers.some(
                                        (obj) => obj.id != questionStep + 1
                                      )
                                    ) {
                                      setAnswers((prev) => [
                                        ...prev,
                                        {
                                          id: data.questions[questionStep + 1]
                                            .id,
                                          answer: null,
                                        },
                                      ]);
                                    }
                                  } else {
                                    requiredFieldToast();
                                  }
                                } else {
                                  setQuestionStep(questionStep + 1);
                                  if (
                                    answers.some(
                                      (obj) => obj.id != questionStep + 1
                                    )
                                  ) {
                                    setAnswers((prev) => [
                                      ...prev,
                                      {
                                        id: data.questions[questionStep + 1].id,
                                        answer: null,
                                      },
                                    ]);
                                  }
                                }
                              }
                        }
                      >
                        {questionStep + 1 === data.questions.length ? (
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
        ) : (
          <AnimatePresence mode='wait'>
            <motion.div
              key={questionStep + 2}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='flex w-full flex-col items-center gap-4 pb-48'
            >
              <IoCheckmarkCircle className='h-14 w-14 fill-blue-500' />
              <Label
                className={`text-2xl font-medium ${
                  data?.theme == 'dark' ? '' : 'text-gray-900'
                }`}
              >
                Form complete!
              </Label>
              <p className='font-sans text-base font-medium text-txt-secondary'>
                Thank you for taking part of {data?.name} survey
              </p>
              <p className='font-sans text-base font-medium text-txt-secondary'>
                You may now close this page
              </p>
            </motion.div>{' '}
          </AnimatePresence>
        )}
      </main>
    </>
  );
}
