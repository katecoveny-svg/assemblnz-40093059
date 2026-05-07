# assembl design spec

This is the locked source of truth for the assembl visual and voice system. Every code task and content task references this file. If something on a page, in a prompt, or in a generated image disagrees with this document, the document wins.

Status: locked. Changes need a deliberate edit to this file with a dated note in the changelog at the bottom.

---

## 1. Wordmark

The brand is always written lowercase as `assembl`. Capitalised forms are wrong even at sentence start.

That includes headings, button labels, image captions, social posts, slide titles, email subject lines, and the H1 of this document.

---

## 2. Colour palette — Mārama Whenua

Locked 2026-04-24.

| Token | Hex | Role |
|---|---|---|
| Paper | `#FAF7F2` | Dominant background. Should fill ≥80% of every page. |
| Ink | `#23211F` | Body text. |
| Pounamu | `#2B6B57` | Primary accent. The evidence vessel green. |
| Soft gold | `#D4A853` | Gold light points, brass armature, hairline borders. |
| Mist | `#E8E4DE` | Surfaces and secondary cards. |

Paper carries the page. Ink reads against it. Pounamu is the only saturated colour that gets to be loud, and even then it appears in small areas — a vessel, a label, a hairline. Soft gold is reserved for the embedded light points and brass armatures in the visual language; it should never become a fill.

### Kete accents

There are eight kete accent colours, used only inside the kete they belong to. The canonical hex values live in the design tokens file at `lib/design/tokens.ts` (when that file is created — they currently live alongside the kete content in `src/components/kete/keteData.ts`). Reference the token file rather than restate the hex in copy or new components.

If a token disagrees with this spec, fix the token. If the spec disagrees with a kete value already locked in product, raise it before touching either.

---

## 3. Typography

| Use | Family | Weight |
|---|---|---|
| Display | Cormorant Garamond | 300, italic emphasis used sparingly |
| Body | Inter | Regular and medium |
| Mono / labels / prompt output | IBM Plex Mono | Regular |

Editorial headings run large with generous whitespace around them. No drop shadows, no gradients on type, no decorative effects. Italic Cormorant is for emphasis inside a display heading, not for whole paragraphs.

---

## 4. Voice — core messaging

Locked 2026-04-07. Use verbatim where it fits.

> assembl runs specialist operational workflows for real NZ businesses. We reduce admin, surface risk earlier, and keep people in control. Every workflow ends in an evidence pack you can file, forward, or footnote.

### Headlines and te reo

- Headlines lead with business value in plain English.
- Te reo and tikanga show up as quiet texture, never as the H1.
- Macrons must be correct: Pīkau, Manaaki, Waihanga, Auaha, Aotearoa, Tā, Mahara, Mana, Kaupapa.
- Never invent Māori words or phrases. If unsure, ask a reo speaker first.

### Tagline

Governed Intelligence for Aotearoa — specialist kete for real NZ operations.

### Evidence packs

"Evidence pack" is the locked public term for a workflow output. Every workflow ends in a pack you can file, forward, or footnote.

---

## 5. Forbidden phrases and AI clichés

Banned outright:

- "harnessing the power of AI"
- "in today's fast-paced world"
- "leverage"
- "seamless"
- "revolutionise"
- "empower"
- "supercharge"
- "unleash"
- "next-generation"
- "cutting-edge"
- "robust"
- "synergy"
- "trained on 50+ Acts"
- "enterprise-grade"
- "AI-powered" — just say what it does

Also banned: em-dashes used as drama beats, tricolons of three when one good clause will do, "In a world where..." opens.

If a draft contains any of the above, rewrite the sentence rather than swapping a synonym in.

---

## 6. Visual language — sculptural evidence vessels

The signature motif is a sculptural evidence vessel: translucent pounamu mineral, frosted glass, sheer silk organza, fine brushed brass armatures, soft gold light points embedded in the material, cream paper backdrop, natural sunlight, editorial product photography.

Reference points: Aesop product photography, Joby Aviation cinematic scroll storytelling, Linear's interface clarity.

### Banned visual elements

- Kōwhaiwhai
- Sacred Māori carving patterns
- Decorative indigenous patterning of any kind
- Neon
- Hologram clichés
- Generic SaaS gradients
- Sci-fi dashboards

---

## 7. Material grammar per kete (Vessel Studio presets)

Each kete has a fixed material recipe. These are the presets the Vessel Studio works from. Do not improvise new materials per piece.

**Waihanga (Construction).** Translucent jade pounamu mineral panels stacked into architectural block forms. Fine brushed brass armature cage in a geometric grid. Six embedded gold light points.

**Pīkau (Freight & Customs).** Translucent cobalt and ice blue glass elongated capsule forms. Fine brushed brass rails. Eight gold points suggesting movement and route data.

**Manaaki (Hospitality).** Translucent terracotta and warm rose silk organza petals layered into an organic blooming form. Brass armature. Warm amber and soft gold points.

**Auaha (Creative).** Translucent deep violet and dusty plum membranes layered like archive folios. Brass armature spine. Ten gold flecks.

---

## 8. Image generation conventions

For Midjourney, Fal, OpenAI, and any other generator:

- Always include the negative anchor: `--no dark background, forest, gemstone, organic shell, pebble`
- Generate the hero image first, then lock the four kete generations to that hero's `--sref` so the set reads as a single shoot
- For Fal flux-pro v1.1 ultra-redux, the negative anchor goes inlined parenthetically at the end of the positive prompt (no `--no` flag support)
- Cream paper backdrop is non-negotiable. Reject any generation that drifts to a dark or forest background.
- When in doubt, anchor the prompt to "editorial product photography, Aesop-style studio still life, museum quality"

---

## 9. Social and web export sizes

Canonical list. Use these dimensions verbatim — do not round or substitute.

**Instagram**
- Post 1080×1080 (1:1)
- Portrait 1080×1350 (4:5)
- Story / Reel 1080×1920 (9:16)

**TikTok**
- 1080×1920 (9:16)

**LinkedIn**
- Post 1200×627 (1.91:1)
- Banner 1584×396
- Square 1080×1080

**X / Twitter**
- Post 1600×900 (16:9)

**YouTube**
- Thumbnail 1280×720
- Channel banner 2560×1440

**Facebook**
- Post 1200×630
- Cover 820×312

**Pinterest**
- Pin 1000×1500 (2:3)

**Web and email**
- Web hero 1920×1080
- Email banner 600×200

---

## 10. AI Blueprint for Aotearoa alignment

Published May 2026.

- assembl's positioning anchors to the Blueprint's "high-use, low-trust" tension — high AI adoption, trust hasn't kept pace. Evidence packs are the operating answer.
- Waihanga maps to the Blueprint's AEC workstream. Maria Mingallon and Te Waihanga are stakeholders. This is the strongest direct alignment.
- Auaha maps to Creative Industries. Paula Browning is the workstream lead.
- Manaaki and Pīkau are not Blueprint workstreams. Position carefully. Do not claim alignment.
- Never quote or paraphrase the Blueprint directly. Never claim assembl is "part of" the AI Forum. Te Ao Māori shows up as natural advantage but quietly.

---

## 11. Tikanga compliance

Non-negotiable.

- No kōwhaiwhai, sacred Māori patterns, or decorative indigenous patterning anywhere visual.
- No invented te reo Māori phrases. Never make up names or words. If unsure, leave it in English or ask a reo speaker.
- Never claim te reo capability without proper consultation. Te Hiku Media and the Taiuru framework are the references.
- Macrons matter. Pīkau not Pikau. Tā not Ta. Mātauranga not Matauranga.

---

## 12. Component naming convention

The upcoming homepage refresh task should produce these components.

Under `components/site/`:

- `HeroAssembl`
- `EvidenceVesselVisual`
- `ScrollEvidenceStory`
- `SectorVessels`
- `IntelligenceInterface`
- `FounderTrustSection`
- `FinalCTA`

Motion helpers under `components/motion/`:

- `FadeIn`
- `TextReveal`
- `MagneticButton`

New components introduced by future tasks should match the same naming rhythm: PascalCase, sector or function first, descriptive noun second.

---

## 13. Copyright and content boundaries

- Original visual designs only. Never copy existing artists' work.
- Original prompts only. Do not reference specific named artists in Midjourney or Fal prompts.
- Every claim made in public material needs a five-column claim register row before it goes live: claim text, evidence, audience, owner, review date. No row, no claim.

---

## Related artefacts

- `agents/_shared/brand-prefix.md` — agent system-prompt guardrails. It enforces the voice rules from section 4 and 5 at runtime; it is not a substitute for this spec and should be kept in sync when sections 4 or 5 change.
- `src/components/kete/keteData.ts` — current home of kete accent hex values. To migrate to `lib/design/tokens.ts` when that file is created.

---

## Changelog

- 2026-05-07 — Initial locked spec consolidated from brand decisions of 2026-04-07 (voice) and 2026-04-24 (Mārama Whenua palette).
