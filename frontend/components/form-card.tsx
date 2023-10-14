'use client';
import { IoEllipsisHorizontal } from 'react-icons/io5';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useRouter } from 'next/navigation';

type Props = {
  name: string;
  formId: string;
  status: 'active' | 'draft' | 'archive';
};

export default function FormCard({ name, status, formId }: Props) {
  const router = useRouter();
  return (
    <div className="'flex h-[135px] w-full flex-col gap-4 rounded-md bg-card px-9 py-6">
      <div className='flex w-full items-center justify-between'>
        <h1 className='font-sans text-xl'>{name}</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button type='button' variant='secondary'>
              <IoEllipsisHorizontal className='h-6 w-6' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56 '>
            <DropdownMenuItem
              className='font-sans text-base'
              onClick={() => router.push(`/form/${formId}`)}
            >
              Overview
            </DropdownMenuItem>
            <DropdownMenuItem
              className='font-sans text-base'
              onClick={() => router.push(`/form/${formId}/responses`)}
            >
              Responses
            </DropdownMenuItem>
            <DropdownMenuItem
              className='font-sans text-base'
              onClick={() => router.push(`/form/${formId}/settings`)}
            >
              Settings
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Badge>Active</Badge>
    </div>
  );
}
