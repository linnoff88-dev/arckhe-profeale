import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center gap-8 px-6 py-16">
      <div className="rounded-3xl bg-white p-8 shadow-sm sm:p-12">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-amber-600">
          Profe Ale
        </p>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Programa de imersao infantil em espanhol com foco em progresso real.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-slate-600">
          MVP para validar aulas curtas, desafios e relatorio de evolucao para pais.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/login"
            className="rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-700"
          >
            Entrar na plataforma
          </Link>
          <Link
            href="/trilha"
            className="rounded-full border border-amber-200 bg-amber-50 px-6 py-3 text-sm font-semibold text-amber-700 transition hover:bg-amber-100"
          >
            Ver area do aluno
          </Link>
        </div>
      </div>
    </main>
  );
}
