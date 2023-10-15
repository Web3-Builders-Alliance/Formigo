import FormResponseTab from "@/components/responses";
import getResponses from "@/hooks/getResponses";

export default async function FormResponse() {
  const responses = await getResponses()
  
  
  return (
    <>
      <FormResponseTab responses={responses} />
    </>
  );
}
