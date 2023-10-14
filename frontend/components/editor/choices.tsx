'use client';
import { useState } from 'react';
import { Input } from '../ui/input';
import { IoTrash, IoAddCircle } from 'react-icons/io5';

interface ChoiceItem {
  id: number;
  value: string;
}

export default function Choices({
  removeChoice,
  index,
  addChoice,
  choices,
  setChoice,
}: {
  index: number;
  removeChoice: (index: number) => void;
  addChoice: () => void;
  choices: ChoiceItem[];
  setChoice: (id: number, updatedData: Partial<ChoiceItem>) => void;
}) {
  const choice = choices.find((item) => item.id === index);
  console.log(index);
  

  const [newValue, setNewValue] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedValue = e.target.value;
    setNewValue(updatedValue);
    if (choice) {
      setChoice(index, { value: updatedValue });
    }
  };
  return (
    <div className={`flex w-full items-center gap-4`}>
      <Input
        onChange={handleInputChange}
        value={newValue}
        placeholder='Input choice'
        className='w-9/12'
      />
      {index != 0 ? (
        <div onClick={() => removeChoice(index)} className='cursor-pointer'>
          <IoTrash className='h-7 w-7 fill-destructive' />
        </div>
      ) : (
        <></>
      )}

      <div onClick={addChoice} className='cursor-pointer'>
        <IoAddCircle className='h-7 w-7 fill-btn-primary' />
      </div>
    </div>
  );
}
