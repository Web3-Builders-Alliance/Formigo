import Footer from '@/components/footer';
import Navback from '@/components/nav-back';
import NotFoundComp from '@/components/not-found';
import RespondentOverview from '@/components/respondent-overview';
import getResponseChunks from '@/hooks/getResponseChunks';
import useFormAnon from '@/hooks/useFormAnon';

export default async function UserResponses({
  params,
}: {
  params: { id: string };
}) {
  const data = await getResponseChunks(params.id);
  if (data.hasOwnProperty('status') && data?.status != 200)
    return <NotFoundComp />;

  const form = await useFormAnon(data.response.formId);
  let parsedForm = JSON.parse(form.decryptedData);

  return (
    <div className='flex min-h-screen flex-col'>
      <Navback />
      <main className='mx-auto flex min-h-screen flex-col px-[135px] py-16 font-sans xl:px-[380px]'>
        <RespondentOverview data={data} form={parsedForm} />
      </main>

      <Footer />
    </div>
  );
}
