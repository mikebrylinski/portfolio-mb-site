import { Suspense } from "react";
import LoginForm from "./LoginForm";

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto flex min-h-screen max-w-md items-center px-6">
          <p className="font-mono text-sm text-[#9cb6d4]">Loading…</p>
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
