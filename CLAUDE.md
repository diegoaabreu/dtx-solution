# CLAUDE.md — DTX Solution Website (Project Lumen)

Documentação técnica oficial do projeto. Usada como contexto pelo Claude Code e por qualquer outra ferramenta de IA integrada ao projeto.

---

## Visão Geral

Site institucional da **DTX Solution** — empresa de tecnologia, segurança e TI baseada em Reading, MA (Greater Boston Area).

- **Domínio:** dtxsolution.com
- **Staging/Preview:** dtxsolution-lumen.vercel.app
- **Repositório:** https://github.com/diegoaabreu/dtx-solution
- **Deploy:** Vercel (automático via push para `master`)
- **Proprietário:** Diego Abreu — diego@dtxsolution.com

---

## Stack Técnica

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| Framework | Next.js | 15.x |
| Estilização | Tailwind CSS | 3.4.x |
| i18n | next-intl | 3.x |
| Ícones | lucide-react | latest |
| Bandeiras | flag-icons | latest |
| Animações | framer-motion | latest (uso opcional) |
| Runtime | Node.js via Vercel | — |

---

## Estrutura de Arquivos

```
/
├── public/
│   └── Assets/                  # Imagens e logos
│       ├── logo_2025_Icon.png   # Ícone transparente (usado em navbar e footer)
│       ├── surv4.png            # Card de câmeras de segurança
│       ├── tv_orbis.png         # Card Orbis
│       ├── coding.png           # Card desenvolvimento web
│       ├── Intercom.png         # Card intercomunicação
│       ├── cabling.jpg          # Card cabeamento estruturado
│       ├── datacenter.png       # Card IT Microsoft
│       └── Surveillance.jpg     # Background do hero
│
├── messages/
│   ├── en.json                  # Inglês
│   ├── pt.json                  # Português
│   └── es.json                  # Espanhol
│
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx       # Layout com next-intl + fontes Google
│   │   │   └── page.tsx         # Página principal (monta todos os componentes)
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts     # API de envio de email via Microsoft Graph
│   │   ├── globals.css          # Tailwind base + flag-icons import
│   │   ├── layout.tsx           # Root layout (redirect para /en)
│   │   └── page.tsx             # Root page (redirect para /en)
│   │
│   ├── components/
│   │   ├── Navbar.tsx           # Header fixo com scroll effect e seletor de idioma
│   │   ├── Hero.tsx             # Seção hero com background e trust strip
│   │   ├── SectionHeader.tsx    # Cabeçalho de seção padrão (eyebrow mono + título + subtítulo)
│   │   ├── Services.tsx         # 2 cards featured + lista de especificações (5 serviços)
│   │   ├── Process.tsx          # "Como trabalhamos" — 4 etapas numeradas
│   │   ├── Trust.tsx            # Números, diferenciais e área de atendimento
│   │   ├── Partners.tsx         # Logos de clientes + tecnologias instaladas
│   │   ├── Contact.tsx          # Formulário de contato + info
│   │   └── Footer.tsx           # Rodapé com logo, redes sociais, links legais
│   │
│   ├── i18n/
│   │   ├── routing.ts           # Define locales: ["en", "pt", "es"], default: "en"
│   │   └── request.ts           # Configuração do servidor next-intl
│   │
│   └── middleware.ts            # Roteamento de locale automático (next-intl)
│
├── tailwind.config.ts
├── next.config.ts
├── package.json
├── .env.local                   # Variáveis locais (não commitado)
└── CLAUDE.md                    # Este arquivo
```

---

## Design System

### Cores (brand tokens)

```js
brand.dark    = "#080D1A"   // Background principal
brand.darker  = "#0D1525"   // Background cards/seções
brand.navy    = "#182855"   // Azul escuro (gradientes, cards featured)
brand.blue    = "#0EA8E1"   // Azul cyan — cor de destaque principal
brand.steel   = "#4D7B9A"   // Azul aço — textos secundários, "Solution" no logo
brand.panel   = "#111B30"   // Superfícies elevadas (frame da câmera, formulário)
brand.mist    = "#A9C3D6"   // Aço claro — destaque do Orbis (substitui o roxo)
```

### Tipografia

- **`font-sans`** → Inter (Google Fonts) — corpo de texto
- **`font-display`** → Montserrat (Google Fonts) — títulos, headings
- **`font-mono`** → JetBrains Mono (Google Fonts) — eyebrows, HUD da câmera, chips de especificação

### Utilitários CSS customizados

```css
.glow-blue      /* box-shadow azul suave */
.glow-blue-sm   /* box-shadow azul menor */
.text-balance   /* text-wrap: balance */
```

### Padrões de opacidade de texto

- `text-white` — títulos principais
- `text-white/75`–`/80` — texto de corpo em superfícies elevadas
- `text-white/65`–`/70` — subtítulos e descrições
- `text-white/55`–`/60` — labels e rodapé (mínimo — abaixo disso falha contraste WCAG)

---

## i18n (Internacionalização)

Três idiomas: **EN** (padrão), **PT** (Português BR), **ES** (Espanhol)

- Roteamento: `/en/*`, `/pt/*`, `/es/*`
- Middleware redireciona automaticamente `/` para `/en`
- Mensagens em `messages/{locale}.json`
- Seletor de idioma no Navbar usa `flag-icons` CSS (classes `fi fi-us`, `fi fi-br`, `fi fi-es`)
- Flags adicionadas via `@import 'flag-icons/css/flag-icons.min.css'` no `globals.css`

**Estrutura das mensagens:**
```
nav, hero (specs[], feed), services.items[], process.steps[], trust (items[], stats[], towns[]), partners, contact, footer
```

---

## Serviços (ordem de exibição)

### Linha superior — cards featured (lado a lado, lg:grid-cols-2)
1. **Security Cameras** (id: `cameras`) — tema azul, imagem `surv4.png`
2. **Orbis for Buildings** (id: `orbis`) — tema aço (`brand.mist`), imagem `tv_orbis.png`, badge "Subscription"

(Cameras usa `surv2.png`; o Hero usa `surv4.png` como "feed de câmera" com HUD.)

### Lista de especificações (sem imagens, ícone + descrição + chips)
3. **Website Development** (id: `web`)
4. **Intercom Systems** (id: `intercom`)
5. **IP Telephony** (id: `voip`)
6. **Structured Cabling** (id: `cabling`)
7. **Microsoft IT Services** (id: `it`)

---

## Formulário de Contato — Microsoft Graph API

O formulário envia email real via **Microsoft Graph API** usando client credentials flow.

### Fluxo
1. Frontend (`Contact.tsx`) faz `POST /api/contact` com os dados do form
2. API route (`src/app/api/contact/route.ts`) obtém token via Azure AD
3. Chama `POST https://graph.microsoft.com/v1.0/users/{email}/sendMail`
4. Email chega em `diego@dtxsolution.com` com `Reply-To` do remetente

### Variáveis de ambiente necessárias

```env
AZURE_TENANT_ID=...       # Directory (tenant) ID do Azure AD
AZURE_CLIENT_ID=...       # Application (client) ID
AZURE_CLIENT_SECRET=...   # Client secret (rotacionar periodicamente)
CONTACT_EMAIL=diego@dtxsolution.com
```

Configurar em: **Vercel → Project → Settings → Environment Variables**

### Pré-requisitos Azure
- App Registration criado no Azure Portal
- Permissão `Mail.Send` (Application, não Delegated)
- **Admin Consent concedido** — sem isso retorna 403

---

## DNS (domain.com)

| Tipo | Host | Valor | Destino |
|------|------|-------|---------|
| `A` | `@` | `76.76.21.21` | Vercel (dtxsolution.com) |
| `CNAME` | `www` | `cname.vercel-dns.com` | Vercel (www) |
| `A` | `orbis` | IP do servidor próprio | Servidor Namecheap |
| `A` | `nexus` | IP do servidor próprio | Servidor Namecheap |
| `A` | `*` | IP do servidor próprio | Fallback Namecheap |

---

## Gotchas e Decisões Técnicas

### create-next-app falha com maiúsculas
npm rejeita nomes de pacote com letras maiúsculas. Usar scaffold manual se o nome do projeto tiver maiúsculas ou espaços.

### Logo no navbar
Usar `logo_2025_Icon.png` (fundo transparente) + texto CSS, **nunca** `logo_2025_Main_White.png` que tem fundo branco e aparece como caixa branca no tema escuro.

### overflow-hidden + transform + border-radius (Safari)
Cards com `overflow-hidden rounded-xl` e filhos com `scale` no hover podem "sangrar" 1px. Fix: mover o `scale` para um wrapper div interno que englobe tanto a imagem quanto o overlay gradiente.

### Navbar border-b
`border-b border-white/5` com `backdrop-blur-md` causa uma linha branca visível ao rolar. Usar só `shadow-lg shadow-black/30` para separação.

### Emoji flags não renderizam no Windows
`🇺🇸🇧🇷🇪🇸` aparecem como "US BR ES" texto no Windows. Solução: `flag-icons` npm package com classes CSS `fi fi-us`, `fi fi-br`, `fi fi-es`.

### Reading mode (Readability.js)
O algoritmo de leitura do browser ignora formulários e elementos com baixa densidade textual. O `<address>` com os contatos está presente no DOM mas pode não ser detectado — limitação inerente do algoritmo para páginas que não são artigos.

### Imagens no Vercel
Arquivos adicionados à pasta `public/Assets/` precisam ser commitados explicitamente com `git add` — o Vercel só recebe o que está no repositório.

---

## Workflow de Desenvolvimento

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento
npm run dev          # http://localhost:3000 → redireciona para /en

# Build de produção
npm run build

# Deploy (automático via push)
git add .
git commit -m "descrição"
git push             # Vercel detecta e faz deploy em ~1 min
```

---

## Contatos e Redes

- **Email:** diego@dtxsolution.com
- **Telefone:** (857) 999-9922
- **Localização:** Reading, MA — Greater Boston Area
- **Instagram:** https://www.instagram.com/dtx.solution/
- **Facebook:** https://www.facebook.com/dtx.solution85
