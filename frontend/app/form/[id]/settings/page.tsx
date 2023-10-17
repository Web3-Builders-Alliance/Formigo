import SettingTab from '@/components/settings';
import getFormById from '@/hooks/getFormById';
import { notFound } from 'next/navigation';

type Data = {
  form: {
    formId: string;
    creator: string;
    name: string;
    status: string;
  };
  txIds: []
};

export default async function FormSetting({
  params,
}: {
  params: { id: string };
}) {
  const data: Data = await getFormById(params.id);
  if (!data || data.hasOwnProperty('response')) notFound();
  return (
    <>
      <SettingTab data={data.form} txIds={data.txIds} />
    </>
  );
}
