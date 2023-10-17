'use client';
import { Button } from './ui/button';
import { IoChevronBack } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import useFormStore from '@/stores/useFormStore';
import Link from 'next/link';
import { magic } from '@/lib/magic';
import { generateKeyMessage } from '@/lib/generateMessage';
import { decodeUTF8, encodeBase64 } from 'tweetnacl-util';
import { getSharedKey } from '@/lib/ec';
import { encrypt } from '@/lib/encrypt';
import axios from 'axios';
import { useToast } from './ui/use-toast';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import usePublishingStore from '@/stores/usePublishingStore';

export default function NavEditor() {
  const formData = useFormStore((state) => state.formData);
  const formOverview = useFormStore((state) => state.formOverview);
  const clearFormState = useFormStore((state) => state.clearFormStore);
  const isLoading = usePublishingStore((state) => state.isLoading);
  const setLoading = usePublishingStore((state) => state.setLoading);
  const router = useRouter();
  const { toast } = useToast();
  let data = { ...formOverview, questions: formData };
  let encodedData = encodeBase64(Buffer.from(JSON.stringify(data)));

  async function publishForm() {
    setLoading(true);
    let data = { ...formOverview, questions: formData };
    let usingMagic = await magic.user.isLoggedIn();
    if (usingMagic) {
      let user = await magic.user.getInfo();
      const keyMessage = generateKeyMessage(user.publicAddress);

      let signature = await magic.solana.signMessage(decodeUTF8(keyMessage));
      let { hashedSharedKey, ec_pub } = await getSharedKey(
        signature,
        process.env.NEXT_PUBLIC_EC_ADMIN_PUB as string
      );

      let encrytedData = encrypt(JSON.stringify(data), hashedSharedKey);

      axios
        .post(
          '/api/forms',
          {
            encryptedForm: encrytedData.encryptedData,
            iv: encrytedData.iv,
            ecPubkey: ec_pub,
            formName: formOverview?.name,
          },
          { headers: { 'Content-Type': 'application/json' } }
        )
        .then((data) => {
          localStorage.removeItem('formpreview');
          clearFormState();
          setLoading(false);

          toast({
            title: 'Form Uploaded Successfully',
            description:
              'Your form has been successfully created and uploaded to the ledger!',
          });

          router.push(`/form/${data.data.data.form.formId}`);
        })
        .catch(() => {
          setLoading(false);
          toast({
            title: 'Form Upload Failed',
            description:
              "We're sorry, but there was an issue with uploading your form to the ledger. Please try again or contact support for assistance.",
            variant: 'destructive',
          });
        });
    }
  }

  return (
    <nav className='sticky top-0 flex h-[70px] w-full items-center justify-between border border-b-border bg-card px-[135px] py-3.5 xl:px-[240px]'>
      <Button variant='ghost' onClick={() => router.back()}>
        <IoChevronBack className='mr-2.5 h-5 w-5' /> Return to previous page
      </Button>
      <div className='flex gap-2.5'>
        {formData.length != 0 && formOverview ? (
          <>
            <Link href={`/preview?data=${encodedData}`} target='_blank'>
              <Button variant='outline'>Preview</Button>
            </Link>
            {isLoading ? (
              <Button disabled>
                <ReloadIcon className='spin mr-2 h-4 w-4' />
                Publishing...
              </Button>
            ) : (
              <Button onClick={publishForm}>Publish</Button>
            )}
          </>
        ) : (
          <>
            <Button disabled={true} variant='outline'>
              Preview
            </Button>
            <Button disabled={true}>Publish</Button>
          </>
        )}
      </div>
    </nav>
  );
}
