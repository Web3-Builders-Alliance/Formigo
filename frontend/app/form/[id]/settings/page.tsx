import SettingTab from '@/components/settings';
import getFormById from '@/hooks/getFormById';

type Data = {
  form: {
    formId: string;
    creator: string;
    name: string;
    status: string;
  };
};

export default async function FormSetting({
  params,
}: {
  params: { id: string };
}) {
  const data: Data = await getFormById(params.id);

  return (
    <>
      <SettingTab data={data.form} />
    </>
  );
}
