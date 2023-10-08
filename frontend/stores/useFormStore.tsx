import { create } from "zustand";

type Question = {
  question: string;
  type: "text" | "choice";
  choices?: string[];
};

type FormState = {
  formData: Question[];
  setFormData: (index: number, data: any) => void;
};

const useFormStore = create<FormState>()((set) => ({
  formData: [],
  setFormData: (index, data) =>
    set((state) => {
      const newFormData: Question[] = [...state.formData];
      newFormData[index] = data;
      return { formData: newFormData };
    }),
}));

export default useFormStore;
