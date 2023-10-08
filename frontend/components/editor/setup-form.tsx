"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  FormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES } from "../../constant";

import { Label } from "../ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "../ui/select";

export default function SetupForm() {
  const FormSchema = z.object({
    name: z.string().min(1, { message: "This field has to be filled." }),
    description: z.string().min(1, { message: "This field has to be filled." }),
    brandLogo: z
      .any()
      .refine((files) => files?.length == 1, "Image is required.")
      .refine(
        (files) => files?.[0]?.size <= MAX_FILE_SIZE,
        `Max file size is 5MB.`
      )
      .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        ".jpg, .jpeg, .png and .webp files are accepted."
      ),
    validationType: z
      .string()
      .min(1, { message: "This field has to be filled." }),
    chain: z.string().min(1, { message: "This field has to be filled." }),
    programAddress: z
      .string()
      .min(1, { message: "This field has to be filled." }),
    amount: z.number().min(1, { message: "This field has to be filled." }),
    walletAddresses: z.string(),
    theme: z.string(),
  });
  type ValidationSchema = z.infer<typeof FormSchema>;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  return (
    <div className="w-[770px] bg-card border-border border p-4 font-sans rounded-md ring ring-transparent focus-within:ring-btn-primary duration-300 ease-in-out ">
      <h1 className="text-xl text-txt font-medium">Setup form</h1>
      <div className="flex flex-col mt-6">
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Input form title"
                      {...field}
                      {...form.register("name")}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Input form description"
                      {...field}
                      {...form.register("description")}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="brandLogo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand logo</FormLabel>
                  <FormControl>
                    <div className="pt-1.5">
                      <Label
                        className="bg-transparent text-txt-secondary border rounded-md hover:text-txt hover:bg-btn-secondary cursor-pointer px-4 py-2"
                        htmlFor="picture"
                      >
                        Upload logo
                      </Label>
                      <Input
                        id="picture"
                        type="file"
                        className="hidden"
                        {...form.register("brandLogo")}
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Theme</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        className={`w-8 h-8 bg-background border ${
                          form.watch("theme") === "dark" &&
                          form.watch("theme") != null
                            ? "border-btn-primary"
                            : "border-transparent hover:border-btn-primary"
                        } hover:bg-background `}
                        onClick={() => form.setValue("theme", "dark")}
                      ></Button>
                      <Button
                        type="button"
                        className={`w-8 h-8 bg-foreground border ${
                          form.watch("theme") === "ligth" &&
                          form.watch("theme") != null
                            ? "border-btn-primary"
                            : "border-transparent hover:border-btn-primary"
                        } hover:bg-foreground`}
                        onClick={() => form.setValue("theme", "ligth")}
                      ></Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="validationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Validation</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      {...form.register("validationType")}
                    >
                      <SelectTrigger className="w-1/2">
                        <SelectValue placeholder="Select validation type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Validation types</SelectLabel>
                          <SelectItem value="token">Token gating</SelectItem>
                          <SelectItem value="nft">NFT Gating</SelectItem>
                          <SelectItem value="wallet">
                            Wallet address whitelisting
                          </SelectItem>
                          <SelectItem value="public">Public</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.watch("validationType") == "token" ||
            form.watch("validationType") == "nft" ? (
              <div className="w-full flex gap-2.5">
                <FormField
                  control={form.control}
                  name="chain"
                  render={({ field }) => (
                    <FormItem
                      className={`${
                        form.watch("chain") == "solana" ? "w-full" : "w-1/2"
                      }`}
                    >
                      <FormLabel>Chain</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          {...form.register("chain")}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select chain" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Chains</SelectLabel>
                              <SelectItem value="solana">Solana</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {form.watch("chain") == "solana" ? (
                  <FormField
                    control={form.control}
                    name="programAddress"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Program address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Input program address"
                            {...field}
                            {...form.register("programAddress")}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : null}
              </div>
            ) : null}
            {form.watch("validationType") != null &&
            form.watch("validationType") != "public" ? (
              form.watch("validationType") != "wallet" ? (
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Input amount"
                          {...field}
                          {...form.register("amount")}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <FormField
                  control={form.control}
                  name="walletAddresses"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Wallet addresses</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Input wallet addresses"
                          {...field}
                          {...form.register("walletAddresses")}
                        />
                      </FormControl>
                      <FormDescription>
                        {
                          "Input wallet addresses (Solana or EVM) seprated by comma."
                        }
                      </FormDescription>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              )
            ) : null}
          </form>
        </Form>
      </div>
    </div>
  );
}
