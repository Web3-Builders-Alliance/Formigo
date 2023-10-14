import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Question = {
  question: string;
  type: 'text' | 'choice';
  choices?: string[];
  required: boolean;
  id: number;
};

type Overview = {
  name: string | null;
  description: string | null;
  validation: string | null;
  theme: string | 'dark' | 'white';
  walletAddress: string[] | null;
  programAddress: string | null;
  amount: number | string | null;
};

type FormState = {
  formData: Question[] | any[];
  formOverview: Overview | null;
  setFormData: (index: number, data: any) => void;
  setFormOverview: (
    name: string | null,
    description: string | null,
    validation: string | null,
    theme: string | 'dark' | 'white',
    walletAddress: string[] | null,
    programAddress: string | null,
    amount: number | string | null
  ) => void;
  clearFormStore: () => void;
};

const initialState = {
  formData: [],
  formOverview: null,
};

const useFormStore = create<FormState>()(
  persist(
    (set) => ({
      ...initialState,
      clearFormStore: () => set(initialState),
      setFormOverview: (
        name: string | null,
        description: string | null,
        validation: string | null,
        theme: string | 'dark' | 'white',
        walletAddress: string[] | null,
        programAddress: string | null,
        amount: number | string | null
      ) =>
        set((state) => ({
          formOverview: {
            name,
            description,
            validation,
            theme,
            walletAddress,
            programAddress,
            amount,
          },
        })),
      setFormData: (index, data) =>
        set((state) => {
          const newFormData: any = [...state.formData];
          newFormData[index] = data;
          return { formData: newFormData };
        }),
    }),
    {
      name: 'formpreview',
      getStorage: () => localStorage,
    }
  )
);
export default useFormStore;
