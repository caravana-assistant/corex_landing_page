# Plano de Implementação

## Fases

### ✅ Fase 0 — Spec & Scaffold (concluída)
- [x] Inventário Corex folder
- [x] Reconciliar spec_v1 com brief institucional + assets + hyrox-clone
- [x] 6 decisões críticas batidas
- [x] Scaffold Next.js 16 + React 19 + Tailwind 4 + TS

### ⏳ Fase 1 — Estrutura & Layout
- [ ] Definir paleta provisória (cores + tipografia)
- [ ] Layout root (`src/app/layout.tsx`)
- [ ] Sticky header component
- [ ] Footer component
- [ ] Tailwind theme config (cores CoreX, fontes)
- [ ] Wrapper section component (max-width, padding consistente)

### ⏳ Fase 2 — Hero + Above-the-fold
- [ ] HeroVideo component (loop vídeo + fallback static + overlay escuro)
- [ ] Slogan ALL CAPS + subhead
- [ ] Countdown timer (até May 16, 2026 4PM)
- [ ] CTAs (Register Now + Watch Highlights)
- [ ] Stage 1 stat counter strip (animated)

### ⏳ Fase 3 — Content sections (top half)
- [ ] About the League block
- [ ] Season 8-stages grid (Stage 2 spotlight)
- [ ] Categories grid (11 divisões)
- [ ] Race Format block + Rulebook download CTA

### ⏳ Fase 4 — Content sections (bottom half)
- [ ] Schedule table (responsive)
- [ ] Race Day Package card grid (9 cards)
- [ ] More Than a Race community block (family challenges, F&B, recovery, music, athlete stories)
- [ ] Registration block
- [ ] Venue + Google Maps
- [ ] Prizes block
- [ ] Pre-event downloads
- [ ] Sponsors strip

### ⏳ Fase 5 — Interactivity
- [ ] FAQ accordion (shadcn ou Radix UI)
- [ ] Newsletter capture form (Resend integration)
- [ ] Smooth scroll
- [ ] Parallax sutil hero
- [ ] Animated stat counters (intersection observer)

### ⏳ Fase 6 — SEO & Performance
- [ ] Metadata API (title, description, OG, Twitter cards)
- [ ] Schema.org SportsEvent JSON-LD
- [ ] Image optimization (Next.js Image)
- [ ] Lazy-load video
- [ ] Cookie banner
- [ ] Lighthouse audit > 90 mobile

### ⏳ Fase 7 — Deploy & Soft-launch
- [ ] Vercel deploy
- [ ] Domain setup
- [ ] Analytics wiring (GA4 + Meta Pixel)
- [ ] Soft-launch com placeholders TBD

### ⏳ Fase 8 (futuro) — AR + RTL
- [ ] next-intl setup
- [ ] `[lang]` route segment
- [ ] AR translation profissional
- [ ] RTL layout
- [ ] AR rulebook PDF

## Status Atual
**Fase 0 ✅** → Iniciando Fase 1

## Dependências externas
- **Pyxis (Mario)**: brand hex codes + logos finais
- **ADSC**: registration URL, fee, open/close, refund policy
- **Cliente/Saqer**: F&B vendors, parking, hotels
- **Pyxis/Inspired Media**: assets cut do vídeo Stage 1
