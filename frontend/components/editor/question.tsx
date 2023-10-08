"use client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "../ui/select";

import {
  FormField,
  FormItem,
  Form,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Choices from "./choices";
import { Button } from "../ui/button";

export default function Question({ index }: { index: number }) {
  const FormSchema = z.object({
    question: z.string().min(1, { message: "This field has to be filled." }),
    questionType: z
      .string()
      .min(1, { message: "This field has to be filled." }),
    choices: z.array(z.string()).nonempty(),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const [choiceComponents, setChoiceComponents] = useState<React.ReactNode[]>(
    []
  );

  const addChoice = () => {
    setChoiceComponents((prevComponents) => [
      ...prevComponents,
      <Choices
        key={prevComponents.length}
        index={prevComponents.length}
        removeChoice={removeChoice}
      />,
    ]);
  };

  // Function to remove a choice component by index
  const removeChoice = (indexToRemove: number) => {
    setChoiceComponents((prevComponents) =>
      prevComponents.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div className="w-[770px] bg-card border-border border p-4 font-sans rounded-md ring ring-transparent focus-within:ring-btn-primary duration-300 ease-in-out ">
      <div className="flex gap-2 items-center mb-6">
        <div className="flex justify-center items-center h-[34px] w-[36px] text-sm rounded-full bg-btn-primary font-sans font-semibold">
          {index}
        </div>

        <p className="w-full text-xl font-medium font-sans text-txt overflow-hidden text-ellipsis">
          {form.watch("question")}
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-4">
          <FormField
            control={form.control}
            name="questionType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question type</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    {...form.register("questionType")}
                  >
                    <SelectTrigger className="w-1/2">
                      <SelectValue placeholder="Select question type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Question types</SelectLabel>
                        <SelectItem value="choice">Multiple choice</SelectItem>
                        <SelectItem value="text">Text answer</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch("questionType") != null ? (
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Input placeholder="Input question" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}

          {form.watch("questionType") === "choice" ? (
            <FormField
              control={form.control}
              name="choices"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Choices</FormLabel>
                  <FormControl>
                    <>
                      <div
                        className={`flex flex-col w-1/3 gap-2 ${
                          choiceComponents.length == 0 ? "" : "pb-2"
                        }`}
                      >
                        {choiceComponents}
                      </div>
                      <Button
                        type="button"
                        className="text-sm"
                        onClick={addChoice}
                      >
                        Add choice
                      </Button>
                    </>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}
        </form>
      </Form>
    </div>
  );
}
