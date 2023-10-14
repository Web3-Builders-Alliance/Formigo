import { Button } from './ui/button';
import { Label } from './ui/label';
import { IoCopyOutline } from 'react-icons/io5';

export default function SettingTab() {
  return (
    <div className='mt-12 flex w-[770px] flex-col gap-6'>
      <div className='w flex flex-col rounded-md border border-border bg-card font-sans '>
        <div className='flex w-full flex-col gap-2 p-5'>
          <Label>Share link</Label>
          <div className='flex items-center justify-between rounded-md border  border-border bg-btn-secondary px-4 py-3 text-sm'>
            <p>https://formigo.xyz/form/1234-5678-9abc</p>
            <div className='cursor-pointer'>
              <IoCopyOutline className='h-5 w-5' />
            </div>
          </div>
        </div>
        <div className='flex w-full flex-col gap-4 p-5'>
          <Label>Danger</Label>
          <div>
            <Button variant='destructive' className='text-sm font-medium'>
              Disable form
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
