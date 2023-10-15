import NotFoundComp from '@/components/not-found';
import PreviewForm from '@/components/preview-form';
import { decodeBase64 } from 'tweetnacl-util';

export default async function FormPreview({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  let data = searchParams.data;

  if (!data) return <NotFoundComp />;
  try {
    let bytes = decodeBase64(data);
    let decodedData = new TextDecoder().decode(bytes);
    let jsonData = JSON.parse(decodedData);
    return <PreviewForm data={jsonData} />;
  } catch (error) {
    return <NotFoundComp />;
  }
}
