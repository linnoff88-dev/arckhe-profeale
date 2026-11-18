# TODO - Implementacao MVP Profe Ale

## Como usar este arquivo

- Marque `[x]` quando a tarefa estiver concluida.
- Atualize `Data` e `Observacoes` ao fechar cada item.
- Revise este arquivo no inicio e no fim de cada dia.

## Status Geral

- Projeto: `MVP Profe Ale (Git + Vercel + Supabase)`
- Ultima atualizacao: `2026-03-01`
- Fase atual: `Fase 1/Fase 2 - Auth e Jornada inicial`

## Metas de validacao do MVP

- [ ] Ativacao >= 70% (primeira aula em ate 48h)
- [ ] Retencao >= 60% por modulo
- [ ] Nota media dos pais >= 8/10

## Fase 0 - Setup Tecnico

- [ ] Criar repositorio no GitHub
  - Data:
  - Observacoes:
- [x] Inicializar app Next.js
  - Data: 2026-03-01
  - Observacoes: App criado em `platform/` para evitar restricao de nome com letras maiusculas.
- [ ] Conectar projeto na Vercel
  - Data:
  - Observacoes:
- [ ] Criar projeto no Supabase
  - Data:
  - Observacoes:
- [ ] Configurar variaveis de ambiente (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`)
  - Data: 2026-03-01
  - Observacoes: Arquivo `platform/.env.example` criado; falta preencher valores reais.
- [ ] Validar deploy automatico com push na `main`
  - Data:
  - Observacoes:

## Fase 1 - Dados e Autenticacao

- [x] Criar migrations SQL das tabelas iniciais
  - Data: 2026-03-01
  - Observacoes: Criada migration em `platform/supabase/migrations/0001_init_mvp.sql`.
- [x] Ativar RLS em todas as tabelas
  - Data: 2026-03-01
  - Observacoes: Politicas e `enable row level security` definidos na migration; falta aplicar no projeto Supabase.
- [x] Implementar Auth (email/senha)
  - Data: 2026-03-01
  - Observacoes: Tela de login/cadastro criada em `platform/src/app/login/page.tsx` com Supabase Auth.
- [ ] Criar perfis de acesso (`parent`, `student`, `admin`)
  - Data:
  - Observacoes:
- [ ] Testar politicas RLS com usuarios reais de teste
  - Data:
  - Observacoes:

## Fase 2 - Jornada do Aluno

- [x] Criar landing page com proposta de valor
  - Data: 2026-03-01
  - Observacoes: Implementada em `platform/src/app/page.tsx`.
- [x] Implementar area do aluno (trilha de aulas)
  - Data: 2026-03-01
  - Observacoes: Implementada em `platform/src/app/trilha/page.tsx` com protecao por sessao.
- [ ] Implementar pagina de aula (`video + frase-chave + desafio`)
  - Data:
  - Observacoes:
- [ ] Implementar botao `Missao concluida`
  - Data:
  - Observacoes:
- [ ] Salvar progresso por aula no Supabase
  - Data:
  - Observacoes:
- [ ] Exibir progresso por modulo
  - Data:
  - Observacoes:

## Fase 3 - Relatorio para Pais

- [ ] Criar tela de relatorio por modulo
  - Data:
  - Observacoes:
- [ ] Exibir frases dominadas e vocabulario aprendido
  - Data:
  - Observacoes:
- [ ] Exibir proximo objetivo de aprendizagem
  - Data:
  - Observacoes:
- [ ] Implementar exportacao simples (copiar texto)
  - Data:
  - Observacoes:

## Fase 4 - Metricas e Painel

- [ ] Registrar evento de conclusao da primeira aula
  - Data:
  - Observacoes:
- [ ] Calcular ativacao e retencao em painel admin
  - Data:
  - Observacoes:
- [ ] Coletar nota dos pais (1 a 10) por modulo
  - Data:
  - Observacoes:
- [ ] Publicar painel minimo de KPIs
  - Data:
  - Observacoes:

## Fase 5 - Piloto (20 a 50 alunos)

- [ ] Selecionar turma piloto
  - Data:
  - Observacoes:
- [ ] Rodar piloto por 2 a 4 semanas
  - Data:
  - Observacoes:
- [ ] Coletar feedback semanal dos pais
  - Data:
  - Observacoes:
- [ ] Registrar depoimentos com autorizacao
  - Data:
  - Observacoes:
- [ ] Consolidar resultados e decidir iteracoes
  - Data:
  - Observacoes:

## Backlog Priorizado

- [ ] Estruturar primeiros 2 modulos do curso piloto
- [ ] Definir rubrica de avaliacao de frases por semana
- [ ] Padronizar template visual das aulas
- [ ] Criar rotina de backup e seguranca

## Registro Rapido de Bloqueios

- `Data`:
- `Bloqueio`:
- `Impacto`:
- `Acao para destravar`:

## Decisoes Tomadas

- `2026-03-01`: Stack de validacao definida: `Next.js + Vercel + Supabase`.
- `2026-03-01`: MVP focado em execucao rapida e metricas, sem gamificacao avancada no inicio.
- `2026-03-01`: Estrutura de app escolhida em subpasta `platform/` dentro do repositorio principal.
