# Plano de Execucao do MVP - Profe Ale

## Objetivo

Validar o MVP do programa de 8 semanas com uma plataforma simples, medindo:

- Ativacao de alunos
- Engajamento semanal
- Evolucao percebida pelos pais
- Conclusao do programa

Stack definida para validacao rapida:

- Frontend/App: Next.js (App Router)
- Deploy: Vercel
- Dados e Auth: Supabase
- Versionamento: Git + GitHub

## Escopo do MVP (o que entra)

- Landing page simples com proposta clara
- Cadastro/login de pais e alunos
- Area do aluno com trilha de aulas
- Aula com video + frase-chave + desafio + botao "Missao concluida"
- Progresso por modulo
- Relatorio simples para pais (por modulo)

## Fora do escopo inicial (por enquanto)

- Gamificacao avancada
- App mobile nativo
- Integracoes complexas
- Marketplace/parcerias com escolas

## Fase 0 - Setup tecnico (Dia 1)

1. Criar repositorio Git no GitHub
2. Inicializar projeto Next.js
3. Criar projeto no Supabase
4. Conectar repositorio na Vercel
5. Configurar variaveis de ambiente:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (somente server-side)

Checklist de saida:

- Deploy automatico funcionando na Vercel a cada push na branch principal
- Conexao com Supabase validada em ambiente de desenvolvimento e producao

## Fase 1 - Modelo de dados e autenticacao (Dias 2 a 4)

### Tabelas iniciais (Supabase)

- `users` (id, role: parent/student/admin, created_at)
- `students` (id, parent_id, nome, idade, created_at)
- `courses` (id, titulo, descricao, ativo)
- `modules` (id, course_id, ordem, titulo)
- `lessons` (id, module_id, ordem, titulo, video_url, frase_chave, desafio)
- `lesson_progress` (id, student_id, lesson_id, concluida_em)
- `module_reports` (id, student_id, module_id, frases_domina, vocabulario, proximo_objetivo, criado_em)

### Regras de seguranca

- Row Level Security ativado em todas as tabelas
- Pai visualiza apenas dados dos proprios filhos
- Aluno visualiza apenas o proprio progresso
- Apenas admin cria/edita estrutura de curso

Checklist de saida:

- Cadastro/login funcionando
- Sessao persistente
- Politicas RLS testadas

## Fase 2 - Conteudo e jornada de aula (Dias 5 a 9)

1. Criar 1 curso piloto ("Espanhol Basico Infantil")
2. Criar 2 modulos iniciais para teste
3. Cadastrar aulas com template padrao:
   - Video (5 a 8 min)
   - Frase-chave
   - Desafio da aula
   - Botao de conclusao
4. Implementar pagina de progresso do aluno

Checklist de saida:

- Aluno conclui aula e progresso e salvo no banco
- Progresso visivel por modulo

## Fase 3 - Relatorio para pais (Dias 10 a 12)

1. Criar tela de relatorio por modulo:
   - Frases que a crianca ja fala
   - Vocabulario aprendido
   - Proximo objetivo
2. Permitir exportacao simples (texto/copiar) para envio manual no WhatsApp

Checklist de saida:

- Pai consegue ver evolucao objetiva sem depender de planilhas externas

## Fase 4 - Instrumentacao de metricas (Dias 13 a 14)

Definir e registrar KPIs de validacao:

- Ativacao: % alunos que concluem a primeira aula em ate 48h
- Engajamento: media de aulas concluidas por aluno por semana
- Retencao: % que chegam ao fim do modulo
- Resultado: numero de frases completas dominadas por modulo
- Satisfacao dos pais: nota de 1 a 10 ao final do modulo

Checklist de saida:

- Dashboard interno simples (mesmo que em pagina admin)
- Dados suficientes para decisao de iteracao

## Fase 5 - Piloto (Dias 15 a 30)

1. Rodar com 20 a 50 alunos
2. Coletar feedback semanal de pais
3. Ajustar conteudo e UX com base em dados
4. Registrar depoimentos (texto/video) com autorizacao

Metas minimas de sucesso do piloto:

- Ativacao >= 70%
- Retencao no modulo >= 60%
- Nota media dos pais >= 8/10

## Fluxo de trabalho Git e deploy

Branching simples para velocidade:

- `main`: producao (deploy automatico Vercel)
- `dev`: consolidacao antes da producao
- `feat/*`: funcionalidades curtas

Padrao de entrega:

1. Criar branch `feat/nome-curto`
2. Commit pequeno e objetivo
3. Pull Request para `dev`
4. Teste em preview deployment da Vercel
5. Merge `dev` -> `main` para publicar

Padrao de commit recomendado:

- `feat: ...`
- `fix: ...`
- `chore: ...`
- `docs: ...`

## Backlog tecnico imediato

1. Criar projeto Next.js e estrutura base de rotas
2. Configurar cliente Supabase (server e client)
3. Implementar Auth (email/senha)
4. Criar migrations SQL das tabelas do MVP
5. Implementar tela de trilha e tela de aula
6. Implementar conclusao de aula
7. Implementar tela de relatorio dos pais
8. Implementar painel minimo de metricas

## Riscos e mitigacoes

- Risco: foco excessivo em design e pouca validacao.
  Mitigacao: priorizar funcoes de aprendizagem e metricas.
- Risco: regras de acesso mal configuradas.
  Mitigacao: testar RLS com usuarios reais (pai/aluno/admin).
- Risco: baixo engajamento inicial.
  Mitigacao: aulas curtas, CTA claro e relatorio frequente para pais.

## Decisoes que nao devem travar o inicio

- Branding visual perfeito pode esperar.
- Automacao completa de comunicacao com pais pode esperar.
- Gamificacao avancada entra so apos validar retencao basica.

## Proximo passo imediato (hoje)

1. Criar repositorio e projeto Next.js
2. Subir no GitHub
3. Conectar Vercel
4. Criar projeto Supabase e variaveis de ambiente
5. Publicar uma primeira versao com login e pagina vazia de trilha

Com isso, o MVP ja fica "online + medivel", que e o ponto principal de validacao.
