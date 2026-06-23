# Changelog — CoreX Landing (corexchallenge.ae)

Repo `caravana-assistant/corex_landing_page` · branch `main`. Hash routing — F5 works on any route, no server rewrite config needed. Deploy = build + publish output.

## 2026-06-23 — Multi-page + phase site + a11y

### Architecture
- **Multi-page (hash routing)** — single-scroll landing → individual pages: `#/` Index · `#/stages` · `#/stage/N` · `#/my-corex`. Top menu: Stages · My CoreX. Legacy `/my-schedule` → `#/my-corex`. (COR-163 P1)
- **Stage page = tabs**: Rulebook · Venue · Results · Photos · My CoreX (sticky tab bar; My CoreX embedded per stage). (COR-163 P2a)

### Phase-based site (COR-169)
- Auto-switches by current event date (GST): pre (≤D-2) · eve (D-1, countdown) · day (D0, live) · post (D+1, results-first). Override: `?phase=eve|day|post` or `stage_config.forced_phase`.
- Index gained **About** + **Results & Rankings** (links each completed stage to its Results tab). (P2b)

### My CoreX
- Check-in / competition shown as **"From HH:MM"** (not exact start). (COR-177)

### Accessibility & design (COR-162)
- WCAG AA contrast (`#767676` → `#9a9a9a`); `aria-label`s on My CoreX inputs; emoji → SVG/text; 44px touch targets; surfaces lifted off pure black; reduced-motion respected; countdown guards invalid date.

---

## 2026-05-09 — Session #1

### Adicionado
- Spec reconciliado v2 (`Work Projects/Corex/corex-stage2-landing-spec_v2.md`) integrando spec_v1 + brief institucional + assets + ideias do hyrox-clone
- Scaffold Next.js 16.2.6 + React 19.2.4 + Tailwind 4 + TypeScript + ESLint (App Router, src/, import alias `@/*`)
- Estrutura keepgoing: SESSION_STATE.md, CHANGELOG.md, CONVERSATION_LOG.md, REQUIREMENTS.md, IMPLEMENTATION_PLAN.md
- Memory file em `~/.claude/projects/-Users-Shared-workspace-Work-Projects-Corex-Apps-corex_stage2_landing/memory/corex_stage2_landing-sessions.md`

### Decisões
- 11 divisões (Stage 1 menos Pro M/W) — Pro volta Stage 3+
- Venue: Hazza bin Zayed Gymnasium, Al Ain
- Data: May 16, 2026
- Slogan hero: "CHARGE UP. BREAK YOUR LIMIT." (oficial Pyxis)
- Format: Chipper For Time (consistente com Stage 1)
- Community subhead: "Your road to Hyrox starts here. Built for athletes, made for the community."
- Idioma: EN-only soft-launch, AR sprint 2

### Status
Scaffold pronto. Implementação de componentes não iniciada.
