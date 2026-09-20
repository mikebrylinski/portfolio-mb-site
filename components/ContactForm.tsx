"use client";

import { useActionState, useEffect, useRef } from "react";
import {
  submitContact,
  type ContactState,
} from "@/app/actions/contact";

const initial: ContactState = {};

export type ContactFormProps = {
  /** Tighter layout for in-page sections (e.g. homepage) — default intent project, no focus steal */
  variant?: "default" | "compact";
};

export function ContactForm({ variant = "default" }: ContactFormProps) {
  const compact = variant === "compact";
  const [state, formAction, isPending] = useActionState(
    submitContact,
    initial,
  );
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!compact) {
      firstRef.current?.focus();
    }
  }, [compact]);

  if (state.ok) {
    return (
      <div
        className="border border-[#3B8CFF]/30 bg-[#06101c]/70 p-8 text-center"
        role="status"
      >
        <p className="text-lg font-medium text-white">
          Thanks — your message is on its way.
        </p>
        <p className="mt-2 text-sm text-white/55">
          I&apos;ll get back to you shortly.
        </p>
      </div>
    );
  }

  const fieldClass =
    "w-full border border-[#3B8CFF]/25 bg-[#06101c]/70 px-4 py-3 text-white placeholder:text-white/40 focus:border-[#3B8CFF]/55 focus:outline-none focus:ring-2 focus:ring-[#3B8CFF]/25";

  return (
    <form
      action={formAction}
      className={compact ? "space-y-4 text-left" : "space-y-6 text-left"}
      noValidate
    >
      <div className="hidden" aria-hidden>
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      {compact ? (
        <input type="hidden" name="intent" value="fulltime" />
      ) : (
        <div>
          <label htmlFor="intent" className="mb-2 block text-sm font-medium text-white">
            I&apos;m interested in
          </label>
          <select
            id="intent"
            name="intent"
            className={fieldClass}
            defaultValue="fulltime"
          >
            <option value="fulltime">Full-time opportunity</option>
            <option value="freelance">Freelance / consulting</option>
          </select>
        </div>
      )}

      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-white">
          Name
        </label>
        <input
          ref={firstRef}
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-invalid={!!state.fieldErrors?.name}
          aria-describedby={state.fieldErrors?.name ? "name-error" : undefined}
          className={fieldClass}
          placeholder="Your name"
        />
        {state.fieldErrors?.name && (
          <p id="name-error" className="mt-1 text-sm text-red-400" role="alert">
            {state.fieldErrors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-white">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={!!state.fieldErrors?.email}
          aria-describedby={state.fieldErrors?.email ? "email-error" : undefined}
          className={fieldClass}
          placeholder="you@company.com"
        />
        {state.fieldErrors?.email && (
          <p id="email-error" className="mt-1 text-sm text-red-400" role="alert">
            {state.fieldErrors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-white">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={compact ? 4 : 6}
          required
          aria-invalid={!!state.fieldErrors?.message}
          aria-describedby={
            state.fieldErrors?.message ? "message-error" : undefined
          }
          className={`resize-y ${fieldClass}`}
          placeholder="Role, team, stack, timeline…"
        />
        {state.fieldErrors?.message && (
          <p id="message-error" className="mt-1 text-sm text-red-400" role="alert">
            {state.fieldErrors.message}
          </p>
        )}
      </div>

      {state.error && (
        <p className="text-sm text-red-400" role="alert">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-md border border-[#3B8CFF] bg-[#3B8CFF]/10 px-7 py-3 text-sm font-medium text-white transition-[background-color,opacity] hover:bg-[#3B8CFF]/20 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Sending…" : "Send message"}
        {!isPending ? (
          <span aria-hidden className="text-[#3B8CFF]">
            →
          </span>
        ) : null}
      </button>
    </form>
  );
}
