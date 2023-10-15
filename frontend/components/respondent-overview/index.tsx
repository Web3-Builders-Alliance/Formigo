'use client';

import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback } from '../ui/avatar';
import ChoiceResponseCard from './choice-answer';
import TextResponseCard from './text-answer';
import { useEffect, useState } from 'react';
import { magic } from '@/lib/magic';
import { generateKeyMessage } from '@/lib/generateMessage';
import { decodeUTF8 } from 'tweetnacl-util';
import { getSharedKey } from '@/lib/ec';
import { decrypt } from '@/lib/decrypt';

type Response = {
  formId: string;
  responseId: string;
  respondent: string;
  iv: string;
  anonymous: boolean;
  formCreator: string;
  surveyName: string;
  ecPub: string;
  createdAt: string | Date;
};

type Data = {
  encryptedResponse: string;
  response: Response;
};

type DecryptQuestion = {
  id: number;
  answer: string;
};
type Questions = {
  id: number;
  question: string;
  required: boolean;
  questionType: 'choice' | 'text';
  choices: string[];
};

type Form = {
  name: string;
  description: string;
  validation: string;
  theme: string;
  walletAddress: [];
  programAddress: string;
  amount: string;
  questions: Questions[];
};

export default function RespondentOverview({
  data,
  form,
}: {
  data: Data;
  form: Form;
}) {
  const [decryptedResponse, setDecryptedResponse] = useState<DecryptQuestion[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function decryptResponse() {
      setIsLoading(true);
      let usingMagic = await magic.user.isLoggedIn();
      if (usingMagic) {
        let user = await magic.user.getInfo();
        const keyMessage = generateKeyMessage(user.publicAddress);

        let signature = await magic.solana.signMessage(decodeUTF8(keyMessage));
        let { hashedSharedKey } = await getSharedKey(
          signature,
          data.response.ecPub
        );

        let decryptedData = decrypt(
          data.encryptedResponse,
          data.response.iv,
          hashedSharedKey
        );
        setIsLoading(false);
        setDecryptedResponse(JSON.parse(decryptedData));
      }
    }
    decryptResponse();
  }, []);
  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);

  return (
    <div className='flex flex-col gap-6 font-sans'>
      <h1 className='text-lg font-semibold text-txt-secondary'>Respondent</h1>
      <div className='flex gap-4'>
        <Avatar className='h-14 w-14'>
          <AvatarFallback className='text-xl'>
            {data.response.anonymous
              ? 'A'
              : data.response.respondent.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className='mb-4 flex flex-col'>
          <h1 className='text-xl font-semibold'>
            {data.response.anonymous
              ? 'Anonymous'
              : `${data.response.respondent.slice(
                  0,
                  5
                )}...${data.response.respondent.slice(
                  data.response.respondent.length - 4,
                  data.response.respondent.length
                )}`}
          </h1>
          <p className='text-txt-secondary'>
            Completed the <b className='text-txt'>{data.response.surveyName}</b>{' '}
            {formatDistanceToNow(new Date(data.response.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
      {form.questions.map((item: any, index: number) => {
        if (item.questionType == 'text') {
          return (
            <TextResponseCard
              question={item.question}
              key={index}
              loading={isLoading}
              answer={decryptedResponse[index]?.answer}
            />
          );
        } else if (item.questionType === 'choice') {
          return (
            <ChoiceResponseCard
              key={index}
              question={item.question}
              loading={isLoading}
              answer={decryptedResponse[index]?.answer}
            />
          );
        }
      })}
    </div>
  );
}
