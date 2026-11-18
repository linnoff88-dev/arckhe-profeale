"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { getSupabaseEnv } from "@/lib/supabase/env";

type Mode = "login" | "signup";

export default function LoginPage() {
  const { configured } = getSupabaseEnv();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!configured) {
      setMessage("Auth indisponivel: configure as variaveis do Supabase na Vercel.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const supabase = createClient();
      const authAction =
        mode === "login"
          ? supabase.auth.signInWithPassword({ email, password })
          : supabase.auth.signUp({ email, password });

      const { error } = await authAction;

      if (error) {
        setMessage(error.message);
        return;
      }

      if (mode === "signup") {
        setMessage("Conta criada. Se necessario, confirme o email e faca login.");
        setMode("login");
        return;
      }

      router.push("/trilha");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-6 py-16">
      <div className="w-full rounded-2xl bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">Profe Ale</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">
          {mode === "login" ? "Entrar" : "Criar conta"}
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Ambiente MVP para validar a jornada da plataforma.
        </p>
        {!configured ? (
          <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
            Supabase nao configurado. A tela principal funciona normalmente, mas login depende das variaveis de ambiente.
          </p>
        ) : null}

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="password">
              Senha
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-amber-400"
            />
          </div>

          {message ? <p className="text-sm text-slate-600">{message}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-700 disabled:opacity-60"
          >
            {loading ? "Processando..." : mode === "login" ? "Entrar" : "Criar conta"}
          </button>
        </form>

        <div className="mt-5 text-sm text-slate-600">
          {mode === "login" ? "Nao tem conta?" : "Ja possui conta?"}{" "}
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="font-semibold text-amber-700 underline decoration-amber-300 underline-offset-4"
          >
            {mode === "login" ? "Criar agora" : "Entrar"}
          </button>
        </div>

        <Link href="/" className="mt-5 inline-block text-sm font-medium text-slate-500 hover:text-slate-700">
          Voltar para inicio
        </Link>
      </div>
    </main>
  );
}
