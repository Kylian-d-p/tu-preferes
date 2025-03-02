"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Link2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import createAction from "./create-action";
import { createType } from "./create-type";

export default function CreateForm() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [createdChoice, setCreatedChoice] = useState<{ id: string, choice1: string, choice2: string } | null>(null)
  const [createdOpen, setCreatedOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [locationOrigin, setLocationOrigin] = useState<string>("")

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
      form.reset()

      setTimeout(() => {
        setSuccess(null)
      }, 5000)
    }

    if (res && res.createdChoice) {
      setCreatedChoice(res.createdChoice)
      setCreatedOpen(true)
    }
  }

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
  }, [copied]);

  useEffect(() => {
    setLocationOrigin(document ? document.location.origin : "")
  }, [])

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
          <div className="flex flex-col gap-2">
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
          </div>
          <Button className="flex items-center gap-2 w-full" disabled={form.formState.isSubmitting || Boolean(success)} >Mettre en ligne</Button>
        </form>
      </Form>
      <Dialog open={createdOpen} onOpenChange={setCreatedOpen}>
        <DialogContent>
          <DialogHeader className="flex flex-col gap-2">
            <DialogTitle>Le dilemme a été mis en ligne avec succès !</DialogTitle>
            <DialogDescription>Partagez le lien suivant pour que vos amis puissent voter</DialogDescription>
          </DialogHeader>
          <div className="flex justify-center gap-2">
            <p>{createdChoice?.choice1} <span className="text-xs font-bold">VS</span> {createdChoice?.choice2}</p>
          </div>
          <Button variant={"secondary"} className="w-full border border-background flex items-center gap-2" onClick={() => {
            setCopied(true);
            navigator.clipboard.writeText(`${locationOrigin}/?id=${createdChoice?.id}`);
          }}>
            {copied ? <Check /> : <Link2 />} Partager
          </Button>
          <DialogFooter>
            <DialogClose>Fermer</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}