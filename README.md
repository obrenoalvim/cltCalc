# CLT Calculator — Sistema Completo de Cálculos Trabalhistas

Aplicação web em React + TypeScript para simular e visualizar cálculos trabalhistas brasileiros (CLT), incluindo salário líquido, descontos (INSS/IRPF), FGTS, férias, 13º e cenários de rescisão. Construída com Vite e Tailwind CSS.

## Visão Geral
- Preencha um formulário com dados pessoais e contratuais (salário, admissão, benefícios e descontos).
- Visualize um dashboard com visão geral, detalhamento mensal, projeções anuais, direitos adquiridos e simulação de rescisão.
- Todos os valores são estimativas baseadas em regras padrão vigentes e podem variar por convenção/acordos.

## Funcionalidades
- Cálculo de salário líquido com base em INSS, IRPF e descontos adicionais.
- FGTS mensal e acumulado no período.
- Benefícios e descontos (vale transporte com teto de 6%, VR/VA/saúde/creche, sindicato/associação/ empréstimos/outros).
- Projeções: 13º, férias + 1/3, total anual.
- Direitos adquiridos: férias proporcionais, 13º proporcional, período aquisitivo.
- Simulação de rescisão: sem justa causa, pedido de demissão e justa causa (inclui FGTS disponível e multa de 40% quando aplicável).

## Tecnologias
- React 18 + TypeScript
- Vite 5
- Tailwind CSS 3
- ESLint (typescript-eslint, react-hooks, react-refresh)
- lucide-react (ícones)

## Requisitos
- Node.js 18+ (recomendado para Vite 5)
- npm (ou pnpm/yarn, ajustando os comandos)

## Instalação e Execução
```bash
# Instalar dependências
npm install

# Ambiente de desenvolvimento
npm run dev
# Abra http://localhost:5173

# Build de produção
npm run build

# Pré-visualização do build
npm run preview

# Lint
npm run lint
```

## Estrutura do Projeto
```
.
├─ index.html
├─ package.json
├─ src/
│  ├─ App.tsx                 # Navegação entre Formulário e Dashboard
│  ├─ main.tsx                # Bootstrap da aplicação
│  ├─ index.css               # Tailwind
│  ├─ components/
│  │  ├─ FormularioCLT.tsx    # Coleta de dados para os cálculos
│  │  └─ DashboardCLT.tsx     # Visões: geral, detalhada, rescisão, direitos
│  ├─ types/
│  │  └─ clt.ts               # Tipagens de entrada e resultados
│  ├─ utils/
│  │  ├─ calculations.ts      # Regras e fórmulas dos cálculos
│  │  └─ formatters.ts        # Formatação de moedas/data/percentuais
│  └─ vite-env.d.ts
├─ tailwind.config.js
├─ postcss.config.js
├─ tsconfig*.json
└─ eslint.config.js
```

## Scripts Disponíveis
- dev: inicia o servidor de desenvolvimento (Vite)
- build: gera o bundle de produção
- preview: sobe um servidor para pré-visualizar o build
- lint: executa o ESLint

## Regras de Cálculo (resumo)
As regras abaixo são implementadas em `src/utils/calculations.ts` com valores de 2024:
- INSS: cálculo progressivo por faixas.
- IRPF: base = (salário bruto − INSS − dedução por dependente); aplica faixas e dedução.
- Dedução por dependente IR: R$ 189,59.
- FGTS: 8% do salário (limitado ao teto de contribuição adotado no arquivo).
- Vale transporte: desconto limitado a 6% do salário bruto.
- Férias: salário + 1/3 constitucional nas projeções; proporcionais na rescisão/direitos.
- 13º: integral nas projeções; proporcional conforme meses no ano corrente.
- Rescisão:
  - Sem justa causa: saldo + 13º prop. + férias prop. + 1/3 + FGTS disponível + multa 40% FGTS.
  - Pedido de demissão: saldo + 13º prop. + férias prop. + 1/3 + FGTS disponível (sem multa).
  - Justa causa: saldo + FGTS disponível (sem férias/13º/multa).
- Seguro-desemprego (simplificado): elegibilidade a partir de 12 meses; cálculo de parcelas com piso no salário mínimo.

Atenção: Os cálculos são simplificações para fins de simulação e podem não cobrir todas as particularidades legais, acordos e convenções.

## Atualizando Tabelas/Parâmetros
- Edite `src/utils/calculations.ts`:
  - FAIXAS_INSS, FAIXAS_IRPF
  - DEDUCAO_DEPENDENTE_IR, TETO_FGTS, SALARIO_MINIMO
- Após alterações, rode `npm run dev` ou recompile com `npm run build`.

## Qualidade de Código
- ESLint configurado para TypeScript e React Hooks.
- Ajuste regras em `eslint.config.js` conforme necessário.

## Build e Deploy
- O build de produção gera a pasta `dist/` com arquivos estáticos.
- Você pode servir este conteúdo em qualquer host estático (Netlify, Vercel, GitHub Pages, NGINX, etc.).
- Para servidores que exigem base path customizado, ajuste `vite.config.ts` conforme necessário.

## Contribuindo
- Abra uma issue descrevendo melhorias ou problemas.
- Faça um fork, crie um branch e envie um PR com uma descrição clara.