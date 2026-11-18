import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getSupabaseEnv } from "@/lib/supabase/env";

async function logout() {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export default async function TrilhaPage() {
  const { configured } = getSupabaseEnv();

  if (!configured) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-6 py-12">
        <section className="w-full rounded-2xl bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">Area do Aluno</p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900">Integracao pendente</h1>
          <p className="mt-3 text-sm text-slate-600">
            Esta area depende do Supabase. Configure `NEXT_PUBLIC_SUPABASE_URL` e
            `NEXT_PUBLIC_SUPABASE_ANON_KEY` para liberar login e trilha.
          </p>
        </section>
      </main>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 px-6 py-12">
      <header className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">Area do Aluno</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Trilha de Espanhol - MVP</h1>
        <p className="mt-2 text-slate-600">Conta ativa: {user.email}</p>
      </header>

      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Modulo 1 - Saludos</h2>
        <ul className="mt-4 space-y-3 text-sm text-slate-700">
          <li className="rounded-xl border border-slate-200 p-4">
            Aula 1: Hola, buenos dias e presentacao pessoal
          </li>
          <li className="rounded-xl border border-slate-200 p-4">Aula 2: Como perguntar e responder a expressao como estas?</li>
          <li className="rounded-xl border border-slate-200 p-4">Aula 3: Mini desafio com frases completas</li>
        </ul>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Relatorio para Pais (placeholder)</h2>
        <p className="mt-2 text-sm text-slate-600">
          Nesta fase, o MVP exibira frases dominadas, vocabulario e proximo objetivo.
        </p>
      </section>

      <form action={logout}>
        <button
          type="submit"
          className="inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Sair
        </button>
      </form>
    </main>
  );
}
