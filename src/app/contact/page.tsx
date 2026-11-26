"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Mail, MapPin, Phone, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { submitContactForm } from "./actions";
import { dataSite } from "@/lib/data";
import { useLanguage } from "@/lib/language";

export default function ContactPage() {
  const { toast } = useToast();
  const { t } = useLanguage();

  const formSchema = z.object({
    name: z.string().min(2, { message: t("formNameError") }),
    email: z.string().email({ message: t("formEmailError") }),
    message: z.string().min(10, { message: t("formMessageError") }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await submitContactForm(values);

    if (result.success) {
      toast({
        title: t("toastSuccessTitle"),
        description: t("toastSuccessDescription"),
      });
      form.reset();
    } else {
      toast({
        variant: "destructive",
        title: t("toastErrorTitle"),
        description: result.message || t("toastErrorDescription"),
      });
    }
  }

  const contactInfo = [
    {
      icon: Phone,
      label: t("phoneLabel"),
      value: `+52 ${dataSite.telephone}`,
      href: `tel:+52${dataSite.telephone}`,
    },
    {
      icon: Mail,
      label: t("emailLabel"),
      value: dataSite.email,
      href: `mailto:${dataSite.email}`,
    },
    {
      icon: MapPin,
      label: t("addressLabel"),
      value: dataSite.address,
    },
  ];

  return (
    <div className="w-full bg-background py-20 md:py-28">
      <div className="container [padding-inline:1rem] md:[padding-inline:1.5rem]">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[0.9fr_minmax(0,1.1fr)] lg:items-start">
          <div>
            <span className="inline-flex items-center border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-[0.18em] text-accent">
              {dataSite.name} / {t("navContact")}
            </span>
            <h1 className="mt-4 font-display text-4xl tracking-tight text-foreground sm:text-5xl">
              {t("contactPageHeading")}
            </h1>
            <p className="mt-4 max-w-md text-lg text-muted-foreground">
              {t("contactPageSubheading")}
            </p>

            <div className="mt-10 space-y-5">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center bg-primary text-primary-foreground">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                      {item.label}
                    </h3>
                    <p className="mt-1 text-foreground">
                      {item.href ? (
                        <a
                          href={item.href}
                          className="transition-colors hover:text-accent"
                        >
                          {item.value}
                        </a>
                      ) : (
                        item.value
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-border bg-card p-8 sm:p-10">
            <h2 className="font-display text-2xl tracking-tight text-foreground">
              {t("contactSendHeading")}
            </h2>
            <div className="mt-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("formName")}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t("formNamePlaceholder")}
                              className="rounded-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("formEmail")}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t("formEmailPlaceholder")}
                              type="email"
                              className="rounded-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("formMessage")}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t("formMessagePlaceholder")}
                            className="min-h-[150px] rounded-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    size="lg"
                    className="group w-full rounded-none"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        {t("formSubmit")}
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
