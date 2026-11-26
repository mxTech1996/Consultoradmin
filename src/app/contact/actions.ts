"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

export async function submitContactForm(
  values: z.infer<typeof contactSchema>,
) {
  try {
    const parsedValues = contactSchema.parse(values);

    // In a real deployment this would forward to a CRM or notification
    // service alongside the real Consultoradmin inbox
    // (admversalles@emailsecure.lat).
    console.log("Consultoradmin contact form submitted:", parsedValues);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return { success: true, message: "Form submitted successfully." };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    if (error instanceof z.ZodError) {
      return { success: false, message: "Invalid form data." };
    }
    return {
      success: false,
      message: "An unexpected error occurred.",
    };
  }
}
