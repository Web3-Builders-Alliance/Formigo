import ChoiceAnswerCard from './choice-answer';
import TextAnswerCard from './text-answer';

type Questions = {
  question: string;
  required: boolean;
  questionType: 'choice' | 'text';
  choices: string[] | '';
};

export default function FormOverviewTab({ data }: { data: Questions[] }) {
  return (
    <div className='mt-12 flex flex-col gap-6'>
      {data.length != 0 ? (
        data.map((item, index) => {
          if (item.questionType == 'text') {
            return (
              <TextAnswerCard
                index={index}
                info={{ question: item.question, type: item.questionType }}
                key={index}
              />
            );
          } else if (item.questionType === 'choice') {
            return (
              <ChoiceAnswerCard
                index={index}
                key={index}
                info={{
                  question: item.question,
                  type: item.questionType,
                  choices: item.choices,
                }}
              />
            );
          }
        })
      ) : (
        <></>
      )}
    </div>
  );
}
