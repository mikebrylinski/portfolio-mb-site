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
        className="rounded-xl border border-white/15 bg-white/[0.04] p-8 text-center"
        role="status"
      >
        <p className="text-lg font-medium text-white">
          Thanks — your message is on its way.
        </p>
        <p className="mt-2 text-sm text-[#A1A1A1]">
          I&apos;ll get back to you shortly.
        </p>
      </div>
    );
  }

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
        <input type="hidden" name="intent" value="project" />
      ) : (
        <div>
          <label htmlFor="intent" className="mb-2 block text-sm font-medium text-white">
            I&apos;m interested in
          </label>
          <select
            id="intent"
            name="intent"
            className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 text-white focus:border-white/35 focus:outline-none focus:ring-2 focus:ring-[#39ff88]/30"
            defaultValue="project"
          >
            <option value="project">Starting a project</option>
            <option value="hire">Hiring / hourly engagement</option>
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
          className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 text-white placeholder:text-white/40 focus:border-white/35 focus:outline-none focus:ring-2 focus:ring-[#39ff88]/30"
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
          className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 text-white placeholder:text-white/40 focus:border-white/35 focus:outline-none focus:ring-2 focus:ring-[#39ff88]/30"
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
          className="w-full resize-y rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 text-white placeholder:text-white/40 focus:border-white/35 focus:outline-none focus:ring-2 focus:ring-[#39ff88]/30"
          placeholder="What are you building? Timeline, stack, goals…"
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
        className="min-h-[48px] w-full rounded-full bg-[#39ff88] px-6 py-3 text-base font-semibold text-[#050505] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
