"use client";

import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from "./ui/form";
import { Input } from "./ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function MagicInput() {
  const FormSchema = z.object({
    email: z
      .string()
      .email("This is not a valid email.")
      .min(1, { message: "This field has to be filled." }),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Input your email" {...field} />
              </FormControl>
              <FormDescription>
                {"We’ll email you a magic link for a password-free experience."}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full mt-6" type="submit">Continue with email</Button>
      </form>
    </Form>
  );
}
