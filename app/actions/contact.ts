"use server";

export type ContactState = {
  ok?: boolean;
  error?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "message", string>>;
};

function isValidEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const intent = String(formData.get("intent") ?? "project");

  const fieldErrors: ContactState["fieldErrors"] = {};
  if (!name) fieldErrors.name = "Please enter your name.";
  if (!email) fieldErrors.email = "Please enter a valid email.";
  else if (!isValidEmail(email)) fieldErrors.email = "Invalid email format.";
  if (!message) fieldErrors.message = "Tell me a bit about your project.";
  if (Object.keys(fieldErrors).length) {
    return { ok: false, fieldErrors };
  }

  const honeypot = String(formData.get("company") ?? "");
  if (honeypot) {
    return { ok: true };
  }

  const payload = {
    name,
    email,
    message,
    intent: intent === "hire" ? "hire" : "project",
    at: new Date().toISOString(),
  };

  console.info("[contact]", payload);

  return { ok: true };
}
