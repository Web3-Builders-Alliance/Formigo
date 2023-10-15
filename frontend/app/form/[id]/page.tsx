import NotFoundComp from '@/components/not-found';
import FormOverviewTab from '@/components/questions';
import useFormAnon from '@/hooks/useFormAnon';

type Questions = {
  question: string;
  required: boolean;
  questionType: 'choice' | 'text';
  choices: string[] | '';
};

export default async function FormSummary({
  params,
}: {
  params: { id: string };
}) {
  const data = await useFormAnon(params.id);

  let parsedJson = JSON.parse(data.decryptedData);
  let questions: Questions[] = parsedJson.questions;

  return (
    <>
      <FormOverviewTab data={questions} />
    </>
  );
}
