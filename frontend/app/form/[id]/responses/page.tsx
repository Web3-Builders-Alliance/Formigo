import FormResponseTab from '@/components/responses';
import getFormResponsesById from '@/hooks/getFormResponsesById';
import useFormAnon from '@/hooks/useFormAnon';
import { notFound } from 'next/navigation';

export default async function FormResponse({
  params,
}: {
  params: { id: string };
}) {
  const data = await useFormAnon(params.id);

  if (!data || data.hasOwnProperty('response')) notFound();
  const responses = await getFormResponsesById(params.id);


  return (
    <>
      <FormResponseTab responses={responses} />
    </>
  );
}
