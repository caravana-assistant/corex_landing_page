# Requirements — corex_stage2_landing

> Source-of-truth: `../../corex-stage2-landing-spec_v2.md`
> Last updated: 2026-05-09

## ✅ Implementado
- Scaffold Next.js 16 + React 19 + Tailwind 4 + TypeScript
- App Router, `src/`, ESLint, import alias `@/*`
- pnpm workspace config

## ⚠️ Pendente — Componentes (ordem de implementação)
- [ ] Sticky header (logo + lang toggle placeholder + Register CTA persistente)
- [ ] Hero (vídeo loop + overlay + slogan + countdown + CTAs)
- [ ] Stage 1 stat counter strip (300 athletes / 13 divisions / 6 lanes)
- [ ] About the League block
- [ ] Season 8-stages grid (Stage 1 ✅ + Stage 2 spotlight + 6 TBA)
- [ ] Categories card grid (11 divisões agrupadas Open/Doubles/Relay/Youth/Kids/POD)
- [ ] Race Format block (Chipper format + Rulebook download)
- [ ] Schedule table (responsive)
- [ ] Race Day Package card grid (9 cards — kit, medal, recovery, etc)
- [ ] More Than a Race community block (family challenges, F&B, recovery, music)
- [ ] Registration block (CTA + fee TBD + dates TBD)
- [ ] Venue + Google Maps embed
- [ ] Prizes block
- [ ] Pre-event downloads (Rulebook EN/AR PDFs)
- [ ] Sponsors strip
- [ ] FAQ accordion
- [ ] Newsletter capture form
- [ ] Footer (logos + links + EN/AR toggle placeholder + copyright)

## ⚠️ Pendente — Assets
- [ ] Hero video cut from `Assets/References/media/Corex_CleanShot 2026-04-14 at 10.15.21.mp4`
- [ ] Hero static fallback `Assets/assets/hero_bg.jpeg`
- [ ] Logo CoreX SVG/PNG variants pro header (white/transparent)
- [ ] Stage 1 photo gallery (selecionar 8-12 fotos de `Assets/References/media/`)
- [ ] OG card image (1200×630)
- [ ] Favicon

## ⚠️ Pendente — Conteúdo
- [x] **Brand colors** — extracted from `Assets/assets/` (volt green `#88c547` on black, white text)
- [x] **Registration URL** — https://in.abudhabimarathon.events/corex--stage-2
- [x] **WhatsApp group link** — https://chat.whatsapp.com/K2aHcGZjRNO6hN99ZVqhFD
- [ ] Registration fee + open/close dates
- [ ] Refund policy
- [ ] Title sponsor + partner logos (Pyxis Mario for finals)
- [ ] F&B vendor list
- [ ] Family zone activities + partner
- [ ] Community workout time slot
- [ ] Recommended hotels (2-3)
- [ ] Parking + public transport details
- [ ] Analytics IDs (GA4 + Meta Pixel)
- [ ] Athlete waiver document
- [ ] Standings/ranking page URL

## ⚠️ Pendente — Técnico
- [ ] Countdown timer component
- [ ] FAQ accordion component (shadcn or custom)
- [ ] Newsletter form integration (Resend ou similar)
- [ ] SEO metadata + OG tags + Twitter cards
- [ ] Schema.org SportsEvent JSON-LD
- [ ] Cookie banner
- [ ] Lighthouse > 90 mobile audit
- [ ] Vercel deploy config

## ⚠️ Pendente — Fase 2 (AR + RTL)
- [ ] next-intl install + config
- [ ] `[lang]` route segment
- [ ] AR translation profissional do EN copy
- [ ] RTL layout flip
- [ ] Date/number locale formatting
- [ ] AR rulebook PDF (converter `Rulebook_v3 - Arabic.docx`)

## 🐛 Bugs Conhecidos
- Nenhum (projeto novo)

## 🎯 Próximos Passos (próxima sessão)
1. Definir paleta provisória até hex codes do Pyxis chegarem (sugestão: dark base + accent neutro)
2. Implementar layout root (header + footer estruturais)
3. Implementar hero com vídeo + countdown
4. Stage 1 stat strip
5. Iterar até primeiro draft visível em `pnpm dev`
