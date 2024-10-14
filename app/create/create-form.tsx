"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import createAction from "./create-action";
import { createType } from "./create-type";

export default function CreateForm() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const form = useForm({
    resolver: zodResolver(createType),
    defaultValues: {
      choice1: "",
      choice2: "",
    }
  })

  const onSubmit = async (values: z.infer<typeof createType>) => {
    setError(null)
    const res = await createAction(values)
    if (res && res.error) {
      setError(res.error)
    }

    if (res && res.success) {
      setSuccess(res.success)

      setTimeout(() => {
        setSuccess(null)
      }, 5000)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-2">
        <FormField
          control={form.control}
          name="choice1"
          render={({ field }) =>
            <FormItem>
              <FormLabel>Choix 1</FormLabel>
              <FormControl>
                <Input placeholder={"Mourir noyé"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          } />
        <FormField
          control={form.control}
          name="choice2"
          render={({ field }) =>
            <FormItem>
              <FormLabel>Choix 2</FormLabel>
              <FormControl>
                <Input placeholder={"Mourir brûlé"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          } />
        {error && <p className="text-destructive">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}
        <Button className="flex items-center gap-2 w-full" disabled={form.formState.isSubmitting || Boolean(success)} >Mettre en ligne</Button>
      </form>
    </Form>
  )
}