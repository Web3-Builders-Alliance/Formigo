import NotFoundComp from '@/components/not-found';
import PublishedForm from '@/components/published-form';
import getEc from '@/hooks/getEc';
import useFormAnon from '@/hooks/useFormAnon';
import { log } from 'console';
import { notFound } from 'next/navigation';

export default async function SurveyRespondentPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await useFormAnon(params.id);

  if (data.hasOwnProperty('response') && data?.response?.status == 404) return <NotFoundComp />;

  if (data.form.status === 'disable') return <NotFoundComp />;

  const ecPub = await getEc(data.form.creator);
  let parsedJson = JSON.parse(data.decryptedData);
  let formData = parsedJson;

  return <PublishedForm formData={formData} ecPub={ecPub} formId={params.id} />; 
}
