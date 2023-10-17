'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import {
  IoArrowForward,
  IoArrowBack,
  IoEye,
  IoCheckmarkCircle,
} from 'react-icons/io5';

import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import useFormStore from '@/stores/useFormStore';
import { useStore } from '@/hooks/useStore';
import { useToast } from '../ui/use-toast';
import { getAnonSharedKey } from '@/lib/ec';
import { encrypt } from '@/lib/encrypt';
import axios from 'axios';
import { ReloadIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

interface AnswerItem {
  answer: string | null;
  id: number;
}
type Questions = {
  id: number;
  question: string;
  required: boolean;
  questionType: 'choice' | 'text';
  choices: string[];
};

type FormData = {
  name: string;
  description: string;
  validation: string;
  theme: string;
  walletAddress: [];
  programAddress: string;
  amount: string;
  questions: Questions[];
};
export default function PublishedForm({
  formData,
  ecPub,
  formId,
}: {
  formData: FormData;
  ecPub: { ec: string };
  formId: string;
}) {
  const { toast } = useToast();
  const [wallet, setWallet] = useState(null);
  const [txid, setTxid] = useState(null);

  const [questionStep, setQuestionStep] = useState<number>(0);
  const [answers, setAnswers] = useState<AnswerItem[]>([
    { id: formData.questions[questionStep].id, answer: null },
  ]);
  const [done, setDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updateAnswerById = (id: number, updatedData: Partial<AnswerItem>) => {
    const updatedArray = answers.map((item) => {
      if (item.id === id) {
        return { ...item, ...updatedData };
      }
      return item;
    });
    setAnswers(updatedArray);
  };

  async function logAnswer() {
    setIsLoading(true);
    const sanitizedData = answers.filter((item, index, array) => {
      // Find the first occurrence of the current item's id in the array
      const firstIndex = array.findIndex((element) => element.id === item.id);

      // Keep the current item if it's the first occurrence of that id
      return index === firstIndex;
    });
    const { hashedSharedKey, ec_pub, anonSolanaAddress } =
      await getAnonSharedKey(ecPub.ec);

    const encryptedData = encrypt(
      JSON.stringify(sanitizedData),
      hashedSharedKey
    );

    axios
      .post(
        '/api/responses',
        {
          encryptedResponse: encryptedData.encryptedData,
          iv: encryptedData.iv,
          ecPubkey: ec_pub,
          anonymous: formData.validation === 'public' ? true : false,
          respondent:
            formData.validation === 'public' ? anonSolanaAddress : wallet,
          formId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((data) => {
        setTxid(data.data.data.responseTxids[0]);
        setDone(true);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        toast({
          title: 'Response Upload Failed',
          description:
            "We're sorry, but there was an issue with uploading your response to the ledger. Please try again or contact support for assistance.",
          variant: 'destructive',
        });
      });
  }

  function requiredFieldToast() {
    toast({
      title: 'This field is required.',
      description: 'Provide a information in the field to continue.',
      variant: 'destructive',
    });
  }

  return (
    <main
      className={`flex h-screen w-full items-center justify-center font-sans ${
        formData?.theme == 'dark' ? '' : 'bg-[#FAFBFC]'
      } overflow-y-hidden`}
    >
      <aside
        className={`flex h-screen w-[620px] flex-col justify-between ${
          formData?.theme == 'dark'
            ? 'border-r border-border bg-card'
            : 'border-r border-[#EAEBF0] bg-white'
        }  pt-48`}
      >
        <div className='mt-16 flex flex-col gap-2 px-6'>
          <h1
            className={`text-3xl font-semibold  ${
              formData?.theme == 'dark' ? '' : 'text-gray-800'
            }`}
          >
            {formData?.name}
          </h1>
          <p className='text-base text-txt-secondary'>
            {formData?.description}
          </p>
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
                    formData?.theme == 'dark' ? '' : 'text-gray-900'
                  }`}
                  onClick={() => setQuestionStep(questionStep - 1)}
                >
                  <IoArrowBack
                    className={`mr-2 ${
                      formData?.theme == 'dark' ? '' : 'fill-gray-900'
                    }`}
                  />{' '}
                  Back
                </div>
              ) : null}
              <div className='flex flex-col gap-4'>
                <Label
                  className={`text-2xl ${
                    formData?.theme == 'dark' ? '' : 'text-gray-900'
                  }`}
                >
                  {formData.questions[questionStep]?.question}
                </Label>

                {formData.questions[questionStep]?.questionType === 'text' ? (
                  <>
                    <Input
                      onChange={(e) => {
                        updateAnswerById(formData.questions[questionStep].id, {
                          answer: e.target.value,
                        });
                      }}
                      className={`${
                        formData?.theme == 'dark'
                          ? ''
                          : 'border border-[#EAEBF0] bg-[#FAFBFC] text-black'
                      }`}
                    />
                    {formData.questions[questionStep].required === true ||
                    formData.questions[questionStep].required === true ? (
                      <p className='text-sm text-green-500'>
                        This field is required
                      </p>
                    ) : null}
                  </>
                ) : (
                  <>
                    <RadioGroup
                      key={questionStep}
                      className='text-green'
                      onValueChange={(e) => {
                        updateAnswerById(formData.questions[questionStep].id, {
                          answer: e,
                        });
                      }}
                    >
                      {formData.questions[questionStep]?.choices &&
                      formData.questions[questionStep]?.choices.length != 0 ? (
                        formData.questions[questionStep].choices.map(
                          (choice: string, index: number) => (
                            <div className='flex items-center space-x-2'>
                              <RadioGroupItem
                                key={`r${index}`}
                                className='bg-green'
                                value={choice}
                                id={`r${index}`}
                              />
                              <Label
                                className={`${
                                  formData?.theme == 'dark' ? '' : 'text-black'
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
                    {formData.questions[questionStep]?.required ? (
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
                    {isLoading ? (
                      <Button
                        disabled
                        variant={`${
                          formData?.theme == 'dark'
                            ? 'outline'
                            : 'outline-primary'
                        }`}
                      >
                        <ReloadIcon className='spin mr-2 h-4 w-4' />
                        Please wait
                      </Button>
                    ) : (
                      <Button
                        variant={`${
                          formData?.theme == 'dark' ? 'outline' : 'default'
                        }`}
                        onClick={
                          questionStep + 1 === formData.questions.length
                            ? formData.questions[questionStep].required
                              ? answers[formData.questions[questionStep].id]
                                  .answer != null
                                ? logAnswer
                                : requiredFieldToast
                              : logAnswer
                            : () => {
                                if (formData.questions[questionStep].required) {
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
                                          id: formData.questions[
                                            questionStep + 1
                                          ].id,
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
                                        id: formData.questions[questionStep + 1]
                                          .id,
                                        answer: null,
                                      },
                                    ]);
                                  }
                                }
                              }
                        }
                      >
                        {questionStep + 1 === formData.questions.length ? (
                          'Submit'
                        ) : (
                          <IoArrowForward />
                        )}
                      </Button>
                    )}
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
                formData?.theme == 'dark' ? '' : 'text-gray-900'
              }`}
            >
              Form complete!
            </Label>
            <p className='font-sans text-base font-medium text-txt-secondary'>
              Thank you for taking part of {formData?.name}.
            </p>
            <p className='font-sans text-base font-medium text-txt-secondary'>
              {'You can check your response transaction'}{' '}
              <Link
              target='_blank'
               className='text-blue-600 underline'
                href={`https://explorer.solana.com/tx/${txid}?cluster=${process.env.NEXT_PUBLIC_EXPLORER_CLUSTER}`}
              >
                here
              </Link>
            </p>
            <p className='font-sans text-base font-medium text-txt-secondary'>
              You may now close this page
            </p>
          </motion.div>{' '}
        </AnimatePresence>
      )}
    </main>
  );
}
