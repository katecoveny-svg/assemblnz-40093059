/* ──────────────────────────────────────────────────────────────────────────
 * Homepage — Mārama Whenua editorial / "quiet intelligence for aotearoa"
 *
 * Holding move while the proper Next.js port is built. Ports three local
 * prototypes (hero-vessel.html, scroll-story.html, sector-vessels.html)
 * into the live Vite + React site shell, using a real Midjourney vessel JPG
 * (public/img/hero/waihanga-vessel.jpg) for the hero band.
 *
 * Option A layout: full-bleed dark-green JPG hero band → cream paper
 * editorial heading → cream paper scroll story → cream paper sector vessels.
 * The dark-background hero is a deliberate temporary choice; the proper
 * cream-paper version comes once a spec-aligned MJ vessel is generated.
 *
 * BrandNav stays at the top (sticky dark bar) — sits naturally over the dark
 * hero JPG. BrandFooter stays at the bottom unchanged.
 * ────────────────────────────────────────────────────────────────────────── */

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import BrandNav from "@/components/BrandNav";
import BrandFooter from "@/components/BrandFooter";
import SEO from "@/components/SEO";

const T = {
  paper: "#FAF7F2",
  paperDeep: "#F4EFE8",
  ink: "#23211F",
  inkSoft: "#5A554F",
  inkMute: "#8A847C",
  pounamu: "#2B6B57",
  pounamuMist: "#88A89B",
  gold: "#D4A853",
  goldSoft: "#E8C77A",
  mist: "#E8E4DE",
};

const FONT_DISPLAY = "'Cormorant Garamond', Georgia, serif";
const FONT_BODY = "'Inter', system-ui, -apple-system, sans-serif";
const FONT_MONO = "'IBM Plex Mono', ui-monospace, monospace";

/* ─── PAGE ─── */
const Index = () => {
  return (
    <div style={{ background: T.paper, color: T.ink, fontFamily: FONT_BODY, fontWeight: 300, lineHeight: 1.55 }}>
      <SEO
        title="assembl — quiet intelligence for aotearoa"
        description="Specialist kete for real NZ operations. Assembl runs each workflow in the open and ends each one with an evidence pack you can file, forward or footnote."
      />
      <FontPreload />
      <BrandNav />
      <PaperGrain />

      <Hero />
      <Editorial />
      <ScrollStory />
      <SectorVessels />

      <BrandFooter />
    </div>
  );
};

export default Index;

/* ─── Font preload (Cormorant + Plex Mono are not in the existing site stack) ─── */
function FontPreload() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=IBM+Plex+Mono:wght@300;400&family=Inter:wght@300;400;500&display=swap"
      />
    </>
  );
}

/* ─── Soft paper grain (whole page) ─── */
function PaperGrain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 20% 10%, rgba(212,168,83,0.04), transparent 60%), radial-gradient(ellipse 80% 60% at 90% 80%, rgba(43,107,87,0.04), transparent 60%)",
      }}
    />
  );
}

/* ─── HERO — full-bleed dark green vessel JPG with mono labels overlay ─── */
function Hero() {
  return (
    <section
      aria-label="Waihanga evidence vessel"
      className="relative w-full overflow-hidden"
      style={{ background: "#0F2620", aspectRatio: "16 / 9", minHeight: 420, maxHeight: "82vh" }}
    >
      <img
        src="/img/hero/waihanga-vessel.jpg"
        alt="Sculptural pounamu evidence vessel — Waihanga frame"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        decoding="async"
      />

      {/* Soft vignette so labels stay legible against bright vessel */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 55%, transparent 30%, rgba(15,38,32,0.55) 100%)",
        }}
      />

      {/* Mono labels — soft mist over image */}
      <span className="hero-label hero-label--tl">signal in</span>
      <span className="hero-label hero-label--tr">evidence held</span>
      <span className="hero-label hero-label--bl">decision out</span>
      <span className="hero-label hero-label--br">trail kept</span>

      <span className="hero-cred">prototype · v0.1 · paper, pounamu, brass</span>

      <style>{`
        .hero-label {
          position: absolute;
          font-family: ${FONT_MONO};
          font-size: 11px;
          font-weight: 300;
          letter-spacing: 0.18em;
          color: rgba(232, 228, 222, 0.85);
          text-transform: lowercase;
          white-space: nowrap;
          display: flex; align-items: center; gap: 12px;
          z-index: 2;
          text-shadow: 0 1px 12px rgba(0,0,0,0.6);
        }
        .hero-label::before {
          content: "";
          display: inline-block;
          width: 28px; height: 1px;
          background: ${T.gold};
          opacity: 0.85;
        }
        .hero-label--tr::before, .hero-label--br::before { display: none; }
        .hero-label--tr::after, .hero-label--br::after {
          content: ""; display: inline-block; width: 28px; height: 1px;
          background: ${T.gold}; opacity: 0.85;
        }
        .hero-label--tl { top: 7%; left: 5%; }
        .hero-label--tr { top: 7%; right: 5%; }
        .hero-label--bl { bottom: 9%; left: 5%; }
        .hero-label--br { bottom: 9%; right: 5%; }
        .hero-cred {
          position: absolute;
          bottom: 18px; left: 50%; transform: translateX(-50%);
          font-family: ${FONT_MONO};
          font-size: 10px; letter-spacing: 0.16em;
          color: rgba(232, 228, 222, 0.45);
          z-index: 2;
        }
        @media (max-width: 720px) {
          .hero-label { font-size: 9px; gap: 8px; }
          .hero-label::before, .hero-label--tr::after, .hero-label--br::after { width: 18px; }
          .hero-cred { font-size: 9px; bottom: 12px; }
        }
      `}</style>
    </section>
  );
}

/* ─── EDITORIAL — cream paper, "quiet intelligence for aotearoa" ─── */
function Editorial() {
  return (
    <section className="ed-section">
      <div style={{ maxWidth: 720 }}>
        <div className="ed-eyebrow">specialist kete · real nz operations</div>
        <h1 className="ed-title">
          quiet intelligence
          <br />
          for <em>aotearoa</em>.
        </h1>
        <p className="ed-lede">
          new zealanders use ai widely and trust it warily. assembl runs each workflow in the open and
          ends each one with an evidence pack you can file, forward or footnote.
        </p>
        <div className="ed-cta-row">
          <Link to="/demos/pipeline" className="ed-cta ed-cta--primary">
            See it run on a real workflow
          </Link>
          <Link to="/demos/evidence-pack" className="ed-cta ed-cta--secondary">
            Read the evidence model
          </Link>
        </div>
      </div>

      <style>{`
        .ed-section {
          position: relative; z-index: 10;
          max-width: 1280px;
          margin: 0 auto;
          padding: 112px 48px 96px;
        }
        .ed-eyebrow {
          font-family: ${FONT_MONO};
          font-size: 11px; letter-spacing: 0.18em;
          color: ${T.pounamu};
          margin-bottom: 36px;
          display: flex; align-items: center; gap: 14px;
          text-transform: lowercase;
        }
        .ed-eyebrow::before {
          content: ""; width: 32px; height: 1px; background: ${T.gold};
        }
        .ed-title {
          font-family: ${FONT_DISPLAY};
          font-weight: 300;
          font-size: clamp(44px, 6.6vw, 96px);
          line-height: 1.02;
          letter-spacing: -0.012em;
          color: ${T.ink};
          margin: 0 0 36px;
          text-transform: lowercase;
        }
        .ed-title em { font-style: italic; font-weight: 400; color: ${T.pounamu}; }
        .ed-lede {
          font-family: ${FONT_BODY};
          font-size: 19px; line-height: 1.7;
          color: ${T.inkSoft};
          max-width: 540px;
          margin: 0 0 52px;
          font-weight: 300;
        }
        .ed-cta-row { display: flex; gap: 20px; flex-wrap: wrap; }
        .ed-cta {
          font-family: ${FONT_BODY};
          font-size: 13.5px; letter-spacing: 0.04em;
          padding: 16px 30px;
          border-radius: 1px;
          text-decoration: none;
          display: inline-block;
          transition: background .4s, color .4s, transform .4s, border-color .4s;
          font-weight: 400;
        }
        .ed-cta--primary {
          background: ${T.ink}; color: ${T.paper};
          border: 1px solid ${T.ink};
        }
        .ed-cta--primary:hover {
          background: ${T.pounamu}; border-color: ${T.pounamu};
          transform: translateY(-1px);
        }
        .ed-cta--secondary {
          border: 1px solid ${T.ink}; color: ${T.ink}; background: transparent;
        }
        .ed-cta--secondary:hover { background: ${T.ink}; color: ${T.paper}; }
        @media (max-width: 720px) {
          .ed-section { padding: 72px 24px 64px; }
        }
      `}</style>
    </section>
  );
}

/* ─── SCROLL STORY — five scenes following one Waihanga PM ─── */
type Scene = {
  id: string;
  step: string;
  eyebrow: string;
  title: React.ReactNode;
  body: string;
  visual: React.ReactNode;
};

function ScrollStory() {
  const [activeIdx, setActiveIdx] = useState(0);
  const sceneRefs = useRef<(HTMLElement | null)[]>([]);

  const scenes: Scene[] = [
    {
      id: "story-s1",
      step: "scene 01 · the variation",
      eyebrow: "scene one",
      title: (
        <>
          council comes back on <em>the cantilever.</em>
        </>
      ),
      body:
        "bca wants a structural variation on the lounge cantilever. you need the original consent, the calcs, last week's site diary and the subbie programme. they're in four different places.",
      visual: <SceneFragments />,
    },
    {
      id: "story-s2",
      step: "scene 02 · pulling it in",
      eyebrow: "scene two",
      title: (
        <>
          assembl pulls <em>the right pieces in.</em>
        </>
      ),
      body:
        "open the waihanga kete. the consent agent reads the bca notice, finds the original drawings, the structural calcs and the diary, and lays them out by category.",
      visual: <SceneStrata />,
    },
    {
      id: "story-s3",
      step: "scene 03 · the workflow",
      eyebrow: "scene three",
      title: (
        <>
          the workflow <em>runs in front of you.</em>
        </>
      ),
      body:
        "the agent re-runs the cantilever calcs, drafts the engineer's response, and flags a 4-day programme hit. every step is cited and reversible. you stay in the seat.",
      visual: <SceneStack />,
    },
    {
      id: "story-s4",
      step: "scene 04 · the pack",
      eyebrow: "scene four",
      title: (
        <>
          everything holds together as <em>one evidence pack.</em>
        </>
      ),
      body:
        "the response, the supporting drawings, the recalcs, the timestamps. one artefact, ready for sign-off, with the trail behind every line.",
      visual: <SceneVessel />,
    },
    {
      id: "story-s5",
      step: "scene 05 · the handoff",
      eyebrow: "scene five",
      title: (
        <>
          file it, forward it, <em>footnote it.</em>
        </>
      ),
      body:
        "send the variation to council. forward the same pack to your qs, your engineer or your legal team. you made the call; the pack proves the work.",
      visual: <SceneBrief />,
    },
  ];

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting && en.intersectionRatio > 0.4) {
            const idx = sceneRefs.current.findIndex((el) => el === en.target);
            if (idx >= 0) setActiveIdx(idx);
          }
        });
      },
      { threshold: [0.4, 0.6] }
    );
    sceneRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="story-root" style={{ background: T.paper, position: "relative", zIndex: 1 }}>
      {/* progress rail */}
      <aside className="story-rail" aria-hidden>
        {scenes.map((s, i) => (
          <button
            key={s.id}
            className={`story-tick ${i === activeIdx ? "is-active" : ""}`}
            onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
            aria-label={`Jump to ${s.step}`}
          />
        ))}
      </aside>

      {scenes.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          ref={(el) => (sceneRefs.current[i] = el)}
          className="story-scene"
        >
          <div className="story-copy">
            <div className="story-eyebrow">{s.eyebrow}</div>
            <h2 className="story-h2">{s.title}</h2>
            <p className="story-body">{s.body}</p>
          </div>
          <div className="story-stage" aria-hidden>
            {s.visual}
          </div>
        </section>
      ))}

      <style>{`
        .story-rail {
          position: fixed; top: 50%; right: 32px; transform: translateY(-50%);
          z-index: 30; display: flex; flex-direction: column; gap: 18px;
        }
        .story-tick {
          width: 6px; height: 6px; border-radius: 50%;
          background: rgba(35,33,31,0.18);
          transition: all .5s ease; cursor: pointer;
          border: 0; padding: 0;
        }
        .story-tick.is-active {
          background: ${T.gold};
          box-shadow: 0 0 10px rgba(212,168,83,0.5);
          transform: scale(1.4);
        }
        .story-scene {
          position: relative;
          min-height: 100vh;
          padding: 120px 64px;
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 80px;
          align-items: center;
          max-width: 1440px;
          margin: 0 auto;
        }
        .story-copy { position: sticky; top: 30vh; align-self: start; max-width: 440px; }
        .story-eyebrow {
          font-family: ${FONT_MONO};
          font-size: 11px; letter-spacing: 0.18em;
          color: ${T.pounamu};
          margin-bottom: 28px;
          display: flex; align-items: center; gap: 14px;
          text-transform: lowercase;
        }
        .story-eyebrow::before {
          content: ""; width: 32px; height: 1px; background: ${T.gold};
        }
        .story-h2 {
          font-family: ${FONT_DISPLAY};
          font-weight: 300;
          font-size: clamp(38px, 5vw, 72px);
          line-height: 1.05; letter-spacing: -0.012em;
          color: ${T.ink};
          margin: 0 0 24px;
          text-transform: lowercase;
        }
        .story-h2 em { font-style: italic; color: ${T.pounamu}; font-weight: 400; }
        .story-body {
          font-family: ${FONT_BODY};
          font-size: 17px; line-height: 1.7;
          color: ${T.inkSoft};
        }
        .story-stage {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1.05;
          display: flex; align-items: center; justify-content: center;
          perspective: 1200px;
        }
        @media (max-width: 980px) {
          .story-rail { display: none; }
          .story-scene {
            grid-template-columns: 1fr; gap: 48px; padding: 80px 24px;
            min-height: auto;
          }
          .story-copy { position: relative; top: auto; max-width: 100%; }
          .story-stage { aspect-ratio: 1 / 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .story-root *, .story-root *::before, .story-root *::after {
            animation: none !important; transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ── Scene 1: scattered fragment notes ── */
function SceneFragments() {
  const notes: Array<{ tag: string; name: string; top: string; left: string; rot: number }> = [
    { tag: "tender · pdf", name: "welly · stage 2", top: "4%", left: "4%", rot: -5 },
    { tag: "mbie · bulletin", name: "consent dwell", top: "2%", left: "42%", rot: 3 },
    { tag: "consent · #4421", name: "awaiting BCA", top: "6%", left: "74%", rot: -2 },
    { tag: "SOC · q2 report", name: "port of tauranga", top: "24%", left: "18%", rot: 4 },
    { tag: "manifest · TUI-3142", name: "fish, perishable", top: "22%", left: "56%", rot: -3 },
    { tag: "cover-count · q2", name: "wgn cbd · 87.4%", top: "38%", left: "2%", rot: 2 },
    { tag: "claim · acc-2046", name: "site fall · open", top: "42%", left: "38%", rot: -4 },
    { tag: "nzfc · slate r19", name: "scripted · pending", top: "40%", left: "72%", rot: 5 },
    { tag: "dwell · TGA", name: "+1.4 days", top: "60%", left: "14%", rot: -2 },
    { tag: "induction · site-c", name: "expired · 14d", top: "62%", left: "48%", rot: 3 },
    { tag: "POS · feed", name: "repeat-visit ↘", top: "78%", left: "8%", rot: 4 },
    { tag: "wage signal · q2", name: "trades + 4.2%", top: "80%", left: "52%", rot: -3 },
  ];
  return (
    <div className="s1-stage">
      {notes.map((n, i) => (
        <div
          key={i}
          className="s1-note"
          style={{ top: n.top, left: n.left, transform: `rotate(${n.rot}deg)` }}
        >
          <div className="s1-tag">
            <span className="s1-dot" />
            {n.tag}
          </div>
          <div className="s1-name">{n.name}</div>
          <div className="s1-line" />
          <div className="s1-line s1-line--short" />
        </div>
      ))}
      <style>{`
        .s1-stage { position: relative; width: 100%; height: 100%; }
        .s1-note {
          position: absolute;
          background: ${T.paper};
          border: 0.5px solid rgba(212,168,83,0.32);
          border-radius: 2px;
          padding: 14px 16px 12px;
          box-shadow: 0 12px 24px -12px rgba(35,33,31,0.18), 0 2px 4px rgba(35,33,31,0.04);
          min-width: 140px;
          animation: s1-drift 14s ease-in-out infinite;
        }
        .s1-note:nth-child(odd) { animation-delay: -3s; animation-duration: 18s; }
        .s1-note:nth-child(3n) { animation-duration: 20s; }
        .s1-note::before {
          content: ""; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, ${T.gold}, transparent);
          opacity: 0.5;
        }
        .s1-tag {
          font-family: ${FONT_MONO};
          font-size: 9px; letter-spacing: 0.14em;
          color: ${T.inkMute};
          margin-bottom: 6px;
          display: flex; align-items: center; gap: 8px;
          text-transform: lowercase;
        }
        .s1-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: radial-gradient(circle, ${T.goldSoft}, ${T.gold} 70%, transparent);
          box-shadow: 0 0 8px 1px rgba(212,168,83,0.55);
          animation: dot-pulse 4.5s ease-in-out infinite;
          flex-shrink: 0;
        }
        .s1-name {
          font-family: ${FONT_DISPLAY};
          font-style: italic; font-weight: 400; font-size: 14px;
          color: ${T.ink}; line-height: 1.2; margin-top: 2px;
        }
        .s1-line {
          height: 0.5px; width: 60%;
          background: rgba(35,33,31,0.18);
          margin-top: 4px;
        }
        .s1-line--short { width: 42%; }
        @keyframes s1-drift {
          0%, 100% { translate: 0 0; }
          50% { translate: 2px -3px; }
        }
        @keyframes dot-pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
}

/* ── Scene 2: aligning into strata ── */
function SceneStrata() {
  const rows = [
    { tag: "regulatory", items: ["tender · welly · stage 2", "consent · #4421 awaiting", "mbie · bulletin q2"] },
    { tag: "operational", items: ["manifest · TUI-3142", "dwell · TGA +1.4d", "induction · site-c expired"] },
    { tag: "market", items: ["cover · wgn 87.4%", "POS · repeat-visit ↘", "SOC · port q2"] },
    { tag: "workforce", items: ["claim · acc-2046", "wage · trades +4.2%", "slate · nzfc r19"] },
    { tag: "cultural · context", items: ["iwi register · live", "tikanga · applied", "privacy · IPP-3A"] },
  ];
  return (
    <div className="s2-stage">
      <svg className="s2-connectors" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line x1="20" y1="14" x2="20" y2="32" />
        <line x1="48" y1="14" x2="48" y2="32" />
        <line x1="78" y1="14" x2="78" y2="32" />
        <line x1="14" y1="32" x2="14" y2="50" />
        <line x1="42" y1="32" x2="42" y2="50" />
        <line x1="70" y1="32" x2="70" y2="50" />
        <line x1="22" y1="50" x2="22" y2="68" />
        <line x1="50" y1="50" x2="50" y2="68" />
        <line x1="78" y1="50" x2="78" y2="68" />
        <line x1="18" y1="68" x2="18" y2="86" />
        <line x1="46" y1="68" x2="46" y2="86" />
        <line x1="72" y1="68" x2="72" y2="86" />
      </svg>
      {rows.map((row, ri) => (
        <div key={row.tag} className="s2-row" style={{ top: `${6 + ri * 18}%` }}>
          <span className="s2-rowtag">{row.tag}</span>
          {row.items.map((item, ii) => (
            <div key={ii} className="s2-note">
              <span className="s2-note-dot" />
              {item}
            </div>
          ))}
        </div>
      ))}
      <style>{`
        .s2-stage { position: relative; width: 100%; height: 100%; }
        .s2-connectors {
          position: absolute; inset: 0; width: 100%; height: 100%;
          pointer-events: none; z-index: 0;
        }
        .s2-connectors line {
          stroke: ${T.gold}; stroke-width: 0.5;
          vector-effect: non-scaling-stroke;
          opacity: 0.5; stroke-dasharray: 2,2;
        }
        .s2-row {
          position: absolute;
          left: 4%; right: 4%;
          display: flex; gap: 10px; align-items: center;
          height: 48px;
        }
        .s2-rowtag {
          position: absolute; left: 0; top: -16px;
          font-family: ${FONT_MONO};
          font-size: 9px; letter-spacing: 0.16em;
          color: ${T.pounamu};
          text-transform: lowercase;
        }
        .s2-rowtag::before {
          content: ""; display: inline-block; width: 14px; height: 1px;
          background: ${T.gold};
          vertical-align: middle; margin-right: 8px;
        }
        .s2-note {
          position: relative;
          background: ${T.paper};
          border: 0.5px solid rgba(212,168,83,0.32);
          border-radius: 2px;
          padding: 8px 12px;
          box-shadow: 0 8px 16px -10px rgba(35,33,31,0.16);
          font-family: ${FONT_MONO};
          font-size: 9px; letter-spacing: 0.14em;
          color: ${T.inkMute};
          display: flex; align-items: center; gap: 8px;
          white-space: nowrap;
          transform: rotate(-1deg);
          text-transform: lowercase;
        }
        .s2-note:nth-child(even) { transform: rotate(1deg); }
        .s2-note-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: radial-gradient(circle, ${T.goldSoft}, ${T.gold} 70%, transparent);
          box-shadow: 0 0 8px 1px rgba(212,168,83,0.55);
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
}

/* ── Scene 3: translucent stack ── */
function SceneStack() {
  return (
    <div className="s3-stage">
      <div className="s3-stack">
        <div className="s3-panel s3-l1" />
        <div className="s3-panel s3-l2" />
        <div className="s3-panel s3-l3" />
        <div className="s3-panel s3-l4" />
        <div className="s3-panel s3-l5" />
        <div className="s3-panel s3-l6" />

        <span className="s3-dot s3-dot-a" />
        <span className="s3-dot s3-dot-s s3-dot-b" />
        <span className="s3-dot s3-dot-c" />
        <span className="s3-dot s3-dot-s s3-dot-d" />
      </div>

      <svg className="s3-armature" viewBox="0 0 100 105" preserveAspectRatio="none">
        <rect x="6" y="3" width="88" height="99" rx="3" />
        <line x1="6" y1="18" x2="94" y2="18" />
        <line x1="6" y1="87" x2="94" y2="87" />
        <line className="accent" x1="50" y1="3" x2="50" y2="18" />
        <line className="accent" x1="50" y1="87" x2="50" y2="102" />
        <circle className="marker" cx="50" cy="10.5" r="0.9" />
        <circle className="marker" cx="50" cy="94.5" r="0.9" />
      </svg>

      <style>{`
        .s3-stage { position: relative; width: 100%; height: 100%; }
        .s3-stack {
          position: absolute; inset: 8% 10%;
          transform-style: preserve-3d;
          transform: rotateX(2deg) rotateY(-4deg);
        }
        .s3-panel { position: absolute; border-radius: 6px; pointer-events: none; }
        .s3-l1 {
          inset: 6% 14% 14% 4%;
          background: linear-gradient(160deg, rgba(43,107,87,0.42), rgba(43,107,87,0.22) 55%, rgba(136,168,155,0.3));
          mix-blend-mode: multiply;
          box-shadow: 0 30px 60px -30px rgba(43,107,87,0.4);
        }
        .s3-l2 {
          inset: 14% 8% 18% 12%;
          background: linear-gradient(180deg, rgba(43,107,87,0.28), rgba(136,168,155,0.18));
          mix-blend-mode: multiply;
        }
        .s3-l3 {
          inset: 18% 4% 8% 18%;
          background: linear-gradient(200deg, rgba(232,199,122,0.18), rgba(250,247,242,0.55) 50%, rgba(232,228,222,0.4));
          border: 0.5px solid rgba(212,168,83,0.22);
          box-shadow: inset 0 0 30px rgba(250,247,242,0.4);
        }
        .s3-l4 {
          inset: 26% 18% 24% 10%;
          background: linear-gradient(165deg, rgba(232,228,222,0.6), rgba(250,247,242,0.35) 55%, rgba(43,107,87,0.1));
          border: 0.5px solid rgba(35,33,31,0.08);
          box-shadow: 0 20px 40px -20px rgba(35,33,31,0.18), inset 0 1px 0 rgba(255,255,255,0.5);
        }
        .s3-l5 {
          inset: 32% 28% 34% 22%;
          background: linear-gradient(180deg, rgba(250,247,242,0.7), rgba(232,228,222,0.4));
          border: 0.5px solid rgba(35,33,31,0.06);
        }
        .s3-l6 {
          inset: 8% 48% 8% 48%;
          background: linear-gradient(180deg, rgba(212,168,83,0.16), rgba(212,168,83,0.06) 50%, rgba(212,168,83,0.16));
          border-left: 0.5px solid rgba(212,168,83,0.4);
          border-right: 0.5px solid rgba(212,168,83,0.4);
          border-radius: 0;
        }
        .s3-armature {
          position: absolute; inset: 8% 10%;
          width: 80%; height: 84%;
          pointer-events: none;
          opacity: 0.6;
        }
        .s3-armature line, .s3-armature rect, .s3-armature circle {
          stroke: ${T.gold}; stroke-width: 0.5; fill: none;
          vector-effect: non-scaling-stroke; opacity: 0.7;
        }
        .s3-armature .accent { stroke-width: 0.4; opacity: 0.4; stroke-dasharray: 1.5,2; }
        .s3-armature .marker { fill: ${T.gold}; stroke: none; opacity: 0.8; }
        .s3-dot {
          position: absolute; width: 6px; height: 6px; border-radius: 50%;
          background: radial-gradient(circle, ${T.goldSoft}, ${T.gold} 70%, transparent);
          box-shadow: 0 0 12px 2px rgba(212,168,83,0.45);
          animation: dot-pulse 5s ease-in-out infinite; z-index: 6;
        }
        .s3-dot-s { width: 4px; height: 4px; }
        .s3-dot-a { top: 32%; left: 36%; animation-delay: .2s; }
        .s3-dot-b { top: 48%; left: 54%; animation-delay: 1.6s; }
        .s3-dot-c { top: 62%; left: 42%; animation-delay: 3.0s; }
        .s3-dot-d { top: 38%; left: 62%; animation-delay: .8s; }
      `}</style>
    </div>
  );
}

/* ── Scene 4: full sculptural vessel ── */
function SceneVessel() {
  return (
    <div className="s4-stage">
      <div className="s4-vessel-wrap">
        <div className="s4-vessel">
          <div className="v-panel v-back" />
          <div className="v-panel v-mid" />
          <div className="v-panel v-spine" />
          <div className="v-panel v-front" />

          <svg className="v-armature" viewBox="0 0 100 118" preserveAspectRatio="none">
            <rect x="5" y="3" width="90" height="112" rx="3" ry="3" />
            <line x1="5" y1="20" x2="95" y2="20" />
            <line x1="5" y1="98" x2="95" y2="98" />
            <line className="accent" x1="50" y1="3" x2="50" y2="20" strokeDasharray="1.5,2" />
            <line className="accent" x1="50" y1="98" x2="50" y2="115" strokeDasharray="1.5,2" />
            <line x1="5" y1="3" x2="12" y2="3" />
            <line x1="5" y1="3" x2="5" y2="10" />
            <line x1="88" y1="3" x2="95" y2="3" />
            <line x1="95" y1="3" x2="95" y2="10" />
            <line x1="5" y1="115" x2="12" y2="115" />
            <line x1="5" y1="108" x2="5" y2="115" />
            <line x1="88" y1="115" x2="95" y2="115" />
            <line x1="95" y1="108" x2="95" y2="115" />
            <circle className="marker" cx="50" cy="11.5" r="0.9" />
            <circle className="marker" cx="50" cy="106.5" r="0.9" />
            <line className="accent" x1="5" y1="40" x2="9" y2="40" />
            <line className="accent" x1="5" y1="60" x2="9" y2="60" />
            <line className="accent" x1="5" y1="80" x2="9" y2="80" />
            <line className="accent" x1="91" y1="40" x2="95" y2="40" />
            <line className="accent" x1="91" y1="60" x2="95" y2="60" />
            <line className="accent" x1="91" y1="80" x2="95" y2="80" />
          </svg>

          <span className="v-dot v-d1" />
          <span className="v-dot v-d2" />
          <span className="v-dot v-d3" />
          <span className="v-dot v-d4" />
          <span className="v-dot v-d5" />
          <span className="v-dot v-d6" />
          <span className="v-dot v-d7" />
          <span className="v-dot v-d8" />

          <div className="v-shadow" />
        </div>
      </div>

      <span className="v-label v-label-tl">signal in</span>
      <span className="v-label v-label-tr v-label-right">evidence held</span>
      <span className="v-label v-label-bl">decision out</span>
      <span className="v-label v-label-br v-label-right">trail kept</span>

      <style>{vesselStyles}</style>
    </div>
  );
}

/* ── Scene 5: vessel + decision brief ── */
function SceneBrief() {
  return (
    <div className="s5-grid">
      <div className="s5-vessel-host">
        <div className="s4-vessel-wrap">
          <div className="s4-vessel">
            <div className="v-panel v-back" />
            <div className="v-panel v-mid" />
            <div className="v-panel v-spine" />
            <div className="v-panel v-front" />

            <svg className="v-armature" viewBox="0 0 100 118" preserveAspectRatio="none">
              <rect x="5" y="3" width="90" height="112" rx="3" ry="3" />
              <line x1="5" y1="20" x2="95" y2="20" />
              <line x1="5" y1="98" x2="95" y2="98" />
              <circle className="marker" cx="50" cy="11.5" r="0.9" />
              <circle className="marker" cx="50" cy="106.5" r="0.9" />
            </svg>

            <span className="v-dot v-d1" />
            <span className="v-dot v-d2" />
            <span className="v-dot v-d3" />
            <span className="v-dot v-d4" />
            <span className="v-dot v-d5" />
            <span className="v-dot v-d6" />
            <span className="v-dot v-d7" />

            <div className="v-shadow" />
          </div>
        </div>
      </div>

      <div className="brief">
        <div className="brief-head">
          <span className="brief-live">waihanga · consents · live</span>
          <span>07 may 2026 · 09:14 nzst</span>
        </div>

        <div className="brief-eyebrow">evidence pack · ready to file</div>
        <div className="brief-title">
          consent #BC-2025-04421 · <em>variation drafted.</em>
        </div>

        <p className="brief-body">
          bca flagged the lounge cantilever during inspection and asked for a structural variation.
          the agent re-ran the calcs against the original drawings, drafted the engineer's response,
          and noted retention exposure if practical completion slips. lbp signature is pending; the
          pack is ready to forward to legal.
        </p>

        <div className="brief-timeline">
          <div className="brief-timeline-head">
            <span>workflow trail</span>
            <span>14 steps · each cited</span>
          </div>
          <div className="brief-timeline-track">
            <div className="brief-timeline-line" />
            <span className="brief-tl-mark" style={{ left: "6%" }} />
            <span className="brief-tl-mark" style={{ left: "18%" }} />
            <span className="brief-tl-mark" style={{ left: "32%" }} />
            <span className="brief-tl-mark" style={{ left: "44%" }} />
            <span className="brief-tl-mark" style={{ left: "58%" }} />
            <span className="brief-tl-mark" style={{ left: "72%" }} />
            <span className="brief-tl-mark brief-tl-mark--now" style={{ left: "88%" }} />
          </div>
          <div className="brief-tl-axis">
            <span>intake</span>
            <span>check</span>
            <span>draft</span>
            <span>review</span>
            <span>file</span>
          </div>
        </div>

        <dl className="brief-meta">
          <div className="brief-cell">
            <dt>consent</dt>
            <dd>BC-2025-04421</dd>
          </div>
          <div className="brief-cell">
            <dt>bca</dt>
            <dd>
              wellington<em> · city council</em>
            </dd>
          </div>
          <div className="brief-cell">
            <dt>lbp</dt>
            <dd>
              signature<em> · pending</em>
            </dd>
          </div>
          <div className="brief-cell">
            <dt>retention</dt>
            <dd>
              exposure<em> · flagged</em>
            </dd>
          </div>
        </dl>
      </div>

      <style>{vesselStyles}</style>
      <style>{`
        .s5-grid {
          position: relative; width: 100%; height: 100%;
          display: grid; grid-template-columns: 0.85fr 1fr; gap: 48px;
        }
        .s5-vessel-host {
          position: relative; height: 100%; perspective: 1200px; min-height: 480px;
        }
        .brief {
          position: relative;
          background: ${T.paper};
          border: 0.5px solid rgba(35,33,31,0.1);
          border-radius: 2px;
          padding: 32px 32px 28px;
          display: flex; flex-direction: column;
          box-shadow: 0 40px 80px -40px rgba(35,33,31,0.22);
          align-self: center;
        }
        .brief::before {
          content: ""; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, ${T.gold}, transparent);
        }
        .brief-head {
          display: flex; justify-content: space-between; align-items: center;
          font-family: ${FONT_MONO};
          font-size: 10px; letter-spacing: 0.16em; color: ${T.inkMute};
          padding-bottom: 18px; border-bottom: 0.5px solid rgba(35,33,31,0.08);
          text-transform: lowercase;
        }
        .brief-live { display: flex; align-items: center; gap: 10px; color: ${T.pounamu}; }
        .brief-live::before {
          content: ""; width: 6px; height: 6px; border-radius: 50%; background: ${T.pounamu};
          box-shadow: 0 0 8px rgba(43,107,87,0.5);
          animation: dot-pulse 3s ease-in-out infinite;
        }
        .brief-eyebrow {
          font-family: ${FONT_MONO};
          font-size: 10px; letter-spacing: 0.18em;
          color: ${T.pounamu};
          margin: 22px 0 12px;
          display: flex; align-items: center; gap: 12px;
          text-transform: lowercase;
        }
        .brief-eyebrow::before {
          content: ""; width: 24px; height: 1px; background: ${T.gold};
        }
        .brief-title {
          font-family: ${FONT_DISPLAY};
          font-size: 30px; font-weight: 300; line-height: 1.15;
          letter-spacing: -0.005em; color: ${T.ink};
          margin-bottom: 18px;
          text-transform: lowercase;
        }
        .brief-title em { font-style: italic; color: ${T.pounamu}; font-weight: 400; }
        .brief-body {
          font-size: 14px; line-height: 1.7; color: ${T.inkSoft};
          padding-bottom: 22px;
          border-bottom: 0.5px solid rgba(35,33,31,0.08);
        }
        .brief-timeline { padding: 20px 0 22px; border-bottom: 0.5px solid rgba(35,33,31,0.08); }
        .brief-timeline-head {
          font-family: ${FONT_MONO};
          font-size: 10px; letter-spacing: 0.16em; color: ${T.inkMute};
          margin-bottom: 14px;
          display: flex; justify-content: space-between;
          text-transform: lowercase;
        }
        .brief-timeline-track { position: relative; height: 18px; }
        .brief-timeline-line {
          position: absolute; left: 0; right: 0; top: 50%; height: 1px;
          background: linear-gradient(90deg, rgba(35,33,31,0.04), rgba(35,33,31,0.18) 20%, rgba(35,33,31,0.18) 80%, rgba(35,33,31,0.04));
        }
        .brief-tl-mark {
          position: absolute; top: 50%;
          width: 5px; height: 5px; border-radius: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, ${T.goldSoft}, ${T.gold} 70%, transparent);
          box-shadow: 0 0 8px 1px rgba(212,168,83,0.5);
        }
        .brief-tl-mark--now {
          width: 8px; height: 8px;
          box-shadow: 0 0 14px 2px rgba(212,168,83,0.6);
          animation: dot-pulse 3.4s ease-in-out infinite;
        }
        .brief-tl-axis {
          display: flex; justify-content: space-between; margin-top: 10px;
          font-family: ${FONT_MONO};
          font-size: 9px; letter-spacing: 0.14em; color: ${T.inkMute};
          text-transform: lowercase;
        }
        .brief-meta {
          display: grid; grid-template-columns: 1fr 1fr; gap: 18px 32px; padding-top: 22px;
          margin: 0;
        }
        .brief-cell dt {
          font-family: ${FONT_MONO};
          font-size: 10px; letter-spacing: 0.16em; color: ${T.inkMute};
          margin-bottom: 6px;
          display: flex; align-items: center; gap: 8px;
          text-transform: lowercase;
        }
        .brief-cell dt::before {
          content: ""; width: 14px; height: 1px; background: ${T.gold};
        }
        .brief-cell dd {
          font-family: ${FONT_DISPLAY};
          font-size: 18px; font-weight: 300;
          color: ${T.ink}; line-height: 1.2;
          margin: 0;
          text-transform: lowercase;
        }
        .brief-cell dd em { font-style: italic; color: ${T.pounamu}; font-weight: 400; }
        @media (max-width: 980px) {
          .s5-grid { grid-template-columns: 1fr; gap: 24px; }
          .s5-vessel-host { height: 50vh; min-height: 360px; }
        }
      `}</style>
    </div>
  );
}

/* ── Shared vessel styles (Scene 4 + Scene 5) ── */
const vesselStyles = `
  .s4-stage { position: relative; width: 100%; height: 100%; perspective: 1200px; }
  .s4-vessel-wrap { position: absolute; inset: 6% 14%; transform-style: preserve-3d; }
  .s4-vessel {
    position: absolute; inset: 0; transform-style: preserve-3d;
    animation: vessel-breathe 22s ease-in-out infinite;
  }
  @keyframes vessel-breathe {
    0%, 100% { transform: rotateY(-5deg) rotateX(2deg); }
    50% { transform: rotateY(5deg) rotateX(-2deg); }
  }
  .v-panel { position: absolute; border-radius: 8px; pointer-events: none; }
  .v-back {
    inset: 4% 14% 16% 4%;
    background: linear-gradient(160deg, rgba(43,107,87,0.42), rgba(43,107,87,0.22) 45%, rgba(136,168,155,0.28));
    mix-blend-mode: multiply;
    box-shadow: 0 40px 80px -40px rgba(43,107,87,0.4), inset 0 1px 0 rgba(250,247,242,0.3);
    transform: translateZ(-30px);
  }
  .v-mid {
    inset: 14% 4% 6% 16%;
    background: linear-gradient(200deg, rgba(232,199,122,0.18), rgba(250,247,242,0.55) 40%, rgba(232,228,222,0.4));
    border: 0.5px solid rgba(212,168,83,0.22);
    box-shadow: 0 20px 50px -25px rgba(35,33,31,0.18), inset 0 0 30px rgba(250,247,242,0.4);
  }
  .v-front {
    inset: 24% 22% 24% 12%;
    background: linear-gradient(165deg, rgba(232,228,222,0.6), rgba(250,247,242,0.35) 55%, rgba(43,107,87,0.1));
    border: 0.5px solid rgba(35,33,31,0.08);
    box-shadow: 0 30px 60px -30px rgba(35,33,31,0.15), inset 0 1px 0 rgba(255,255,255,0.5);
    transform: translateZ(40px);
  }
  .v-spine {
    inset: 8% 47% 8% 47%;
    background: linear-gradient(180deg, rgba(212,168,83,0.12), rgba(212,168,83,0.06) 50%, rgba(212,168,83,0.12));
    border-left: 0.5px solid rgba(212,168,83,0.4);
    border-right: 0.5px solid rgba(212,168,83,0.4);
    border-radius: 0;
    transform: translateZ(20px);
  }
  .v-armature {
    position: absolute; inset: 0; width: 100%; height: 100%;
    pointer-events: none; transform: translateZ(50px); z-index: 5;
  }
  .v-armature line, .v-armature rect, .v-armature circle {
    stroke: #D4A853; stroke-width: 0.6; fill: none;
    vector-effect: non-scaling-stroke; opacity: 0.85;
  }
  .v-armature .accent { stroke-width: 0.4; opacity: 0.5; }
  .v-armature .marker { fill: #D4A853; stroke: none; opacity: 0.9; }
  .v-dot {
    position: absolute; width: 8px; height: 8px; border-radius: 50%;
    background: radial-gradient(circle, rgba(232,199,122,1), rgba(212,168,83,0.9) 50%, transparent);
    box-shadow: 0 0 14px 3px rgba(212,168,83,0.45), 0 0 4px rgba(232,199,122,0.8);
    animation: dot-pulse 5s ease-in-out infinite;
    transform: translateZ(60px); z-index: 4;
  }
  .v-d1 { top: 28%; left: 34%; animation-delay: 0s; }
  .v-d2 { top: 44%; left: 58%; animation-delay: 1.4s; }
  .v-d3 { top: 60%; left: 42%; animation-delay: 2.8s; }
  .v-d4 { top: 36%; left: 64%; animation-delay: .6s; width: 5px; height: 5px; }
  .v-d5 { top: 70%; left: 50%; animation-delay: 3.4s; }
  .v-d6 { top: 52%; left: 30%; animation-delay: 2.0s; width: 5px; height: 5px; }
  .v-d7 { top: 22%; left: 54%; animation-delay: 4.0s; width: 4px; height: 4px; }
  .v-d8 { top: 78%; left: 60%; animation-delay: 1.0s; width: 4px; height: 4px; }
  .v-shadow {
    position: absolute; bottom: -2%; left: 14%; right: 14%; height: 28px;
    background: radial-gradient(ellipse, rgba(35,33,31,0.22), rgba(35,33,31,0.08) 50%, transparent 75%);
    filter: blur(10px); z-index: 0;
  }
  .v-label {
    position: absolute;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px; letter-spacing: 0.14em;
    color: #5A554F; white-space: nowrap;
    display: flex; align-items: center; gap: 10px; z-index: 10;
    text-transform: lowercase;
  }
  .v-label::before {
    content: ""; display: inline-block; width: 20px; height: 1px; background: #D4A853;
  }
  .v-label-right::before { display: none; }
  .v-label-right::after {
    content: ""; display: inline-block; width: 20px; height: 1px; background: #D4A853;
  }
  .v-label-tl { top: 2%; left: 0%; }
  .v-label-tr { top: 14%; right: 0%; }
  .v-label-bl { bottom: 18%; left: 0%; }
  .v-label-br { bottom: 6%; right: 0%; }
`;

/* ─── SECTOR VESSELS — four cards ─── */
type Sector = {
  key: string;
  reo: string;
  en: string;
  index: string;
  color: string;
  to: string;
  blurb: string;
  signals: string;
  evidence: string;
  context: string;
  action: string;
  vessel: React.ReactNode;
};

function SectorVessels() {
  const sectors: Sector[] = [
    {
      key: "waihanga",
      reo: "waihanga",
      en: "construction",
      index: "01 / 04",
      color: "#2B6B57",
      to: "/waihanga/about",
      blurb: "mineral, structural, weight-bearing. consents, capacity, compliance and crew movement — laid out like quarried stone.",
      signals: "BCA backlogs, residential consent volume, materials index",
      evidence: "3,412 living data points across 17 territorial authorities",
      context: "Q2 consent issuance trending 8.4% below five-year mean",
      action: "review subcontractor pipeline · brief commercial team",
      vessel: <VesselWaihanga />,
    },
    {
      key: "pikau",
      reo: "pīkau",
      en: "freight & customs",
      index: "02 / 04",
      color: "#2C4A7A",
      to: "/pikau",
      blurb: "cobalt clear, in motion. ports, manifests, dwell times and duty risk — held in glass capsules you can read end-to-end.",
      signals: "port dwell time, container TEU flow, customs clearance lag",
      evidence: "live feed from Auckland, Tauranga, Lyttelton, Otago",
      context: "Tauranga dwell up 1.4 days · flow-on risk to perishables",
      action: "flag at-risk consignees · prepare client briefing",
      vessel: <VesselPikau />,
    },
    {
      key: "manaaki",
      reo: "manaaki",
      en: "hospitality",
      index: "03 / 04",
      color: "#B85C3C",
      to: "/manaaki",
      blurb: "warm, welcoming, layered. covers, dwell, repeat custom and sentiment — gathered like silk petals around a single guest.",
      signals: "cover counts, repeat-visit rate, regional sentiment, F&B price index",
      evidence: "POS, booking, review and visitation feeds — anonymised",
      context: "winter shoulder dwell strong in CHC · Auckland CBD softening",
      action: "tighten staff roster · hold price · brief operators",
      vessel: <VesselManaaki />,
    },
    {
      key: "auaha",
      reo: "auaha",
      en: "creative",
      index: "04 / 04",
      color: "#3D2D5C",
      to: "/auaha/about",
      blurb: "archive deep, signal bright. funding rounds, festival circuits, IP movement and cultural tides — stratified for reading.",
      signals: "NZFC slates, NZ On Air rounds, festival selections, agency awards",
      evidence: "open funding registers + curated industry feeds",
      context: "doc + scripted features both compressed · post-prod capacity tight",
      action: "pre-position studio bid · convene a writers' room",
      vessel: <VesselAuaha />,
    },
  ];

  return (
    <section className="sv-root" id="sectors">
      <header className="sv-head">
        <div className="sv-eyebrow">four sectors · four vessels</div>
        <h2 className="sv-title">
          each sector, <em>its own</em> evidence vessel.
        </h2>
        <p className="sv-lede">
          every industry holds its signals differently — pounamu hard, glass clear, silk warm,
          archive deep. assembl renders each sector as a sculptural object you can read at a glance,
          then interrogate at depth.
        </p>
      </header>

      <div className="sv-grid">
        {sectors.map((s) => (
          <Link to={s.to} key={s.key} className="sv-card" style={{ ["--tag" as string]: s.color }} tabIndex={0}>
            <div className="sv-card-head">
              <span className="sv-card-tag">
                {s.reo} · {s.en}
              </span>
              <span>{s.index}</span>
            </div>
            <div className={`sv-vessel sv-v-${s.key}`}>
              <div className="sv-vessel-form">{s.vessel}</div>
            </div>
            <h3 className="sv-card-name">
              {s.reo} <em>· {s.en}</em>
            </h3>
            <p className="sv-card-blurb">{s.blurb}</p>
            <dl className="sv-reveal">
              <div className="sv-row"><dt>signals</dt><dd>{s.signals}</dd></div>
              <div className="sv-row"><dt>evidence</dt><dd>{s.evidence}</dd></div>
              <div className="sv-row"><dt>context</dt><dd>{s.context}</dd></div>
              <div className="sv-row"><dt>suggested action</dt><dd>{s.action}</dd></div>
            </dl>
          </Link>
        ))}
      </div>

      <div className="sv-foot">
        <span>prototype · v0.1 · sector vessels</span>
        <span>hover · interrogate · brief</span>
      </div>

      <style>{`
        .sv-root { position: relative; z-index: 1; background: ${T.paper}; padding: 48px 0 96px; }
        .sv-head { max-width: 1100px; margin: 80px auto 64px; padding: 0 48px; }
        .sv-eyebrow {
          font-family: ${FONT_MONO};
          font-size: 11px; letter-spacing: 0.18em;
          color: ${T.pounamu};
          margin-bottom: 32px;
          display: flex; align-items: center; gap: 14px;
          text-transform: lowercase;
        }
        .sv-eyebrow::before {
          content: ""; width: 32px; height: 1px; background: ${T.gold};
        }
        .sv-title {
          font-family: ${FONT_DISPLAY};
          font-weight: 300;
          font-size: clamp(36px, 5.4vw, 76px);
          line-height: 1.05; letter-spacing: -0.012em;
          color: ${T.ink};
          margin: 0 0 24px;
          text-transform: lowercase;
        }
        .sv-title em { font-style: italic; color: ${T.pounamu}; font-weight: 400; }
        .sv-lede {
          font-family: ${FONT_BODY};
          font-size: 18px; line-height: 1.7; color: ${T.inkSoft};
          max-width: 560px; margin: 0;
        }
        .sv-grid {
          max-width: 1280px; margin: 0 auto 120px; padding: 0 48px;
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 40px;
        }
        .sv-card {
          position: relative;
          background: ${T.paper};
          border: 0.5px solid rgba(35,33,31,0.08);
          border-radius: 2px;
          padding: 48px 40px 40px;
          display: flex; flex-direction: column; gap: 24px;
          transition: all 0.6s cubic-bezier(.2,.8,.2,1);
          overflow: hidden;
          text-decoration: none;
          color: ${T.ink};
        }
        .sv-card::before {
          content: ""; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, ${T.gold}, transparent);
          opacity: 0.4; transition: opacity .4s;
        }
        .sv-card:hover, .sv-card:focus-within {
          border-color: rgba(35,33,31,0.18);
          box-shadow: 0 30px 80px -40px rgba(35,33,31,0.18);
          transform: translateY(-2px);
        }
        .sv-card:hover::before, .sv-card:focus-within::before { opacity: 1; }
        .sv-card-head {
          display: flex; justify-content: space-between; align-items: flex-start;
          font-family: ${FONT_MONO};
          font-size: 11px; letter-spacing: 0.14em; color: ${T.inkMute};
          text-transform: lowercase;
        }
        .sv-card-tag { display: flex; align-items: center; gap: 10px; }
        .sv-card-tag::before {
          content: ""; width: 6px; height: 6px; border-radius: 50%;
          background: var(--tag, ${T.gold});
        }
        .sv-vessel {
          position: relative; width: 100%; aspect-ratio: 1.2 / 1;
          display: flex; align-items: center; justify-content: center;
          margin: 8px 0 16px;
        }
        .sv-vessel-form {
          position: relative; width: 78%; height: 88%;
          transform: rotateX(2deg);
          transition: transform .8s cubic-bezier(.2,.8,.2,1);
        }
        .sv-card:hover .sv-vessel-form, .sv-card:focus-within .sv-vessel-form {
          transform: rotateX(-2deg) rotateY(3deg);
        }
        .sv-card-name {
          font-family: ${FONT_DISPLAY};
          font-size: 38px; line-height: 1; letter-spacing: -0.005em;
          color: ${T.ink}; font-weight: 300;
          display: flex; align-items: baseline; gap: 14px;
          margin: 0;
          text-transform: lowercase;
        }
        .sv-card-name em {
          font-family: ${FONT_MONO}; font-style: normal;
          font-size: 11px; letter-spacing: 0.14em; color: ${T.inkMute};
          font-weight: 400;
        }
        .sv-card-blurb {
          color: ${T.inkSoft}; font-size: 15px; line-height: 1.65;
          max-width: 38ch; margin: 0;
        }
        .sv-reveal {
          display: grid; grid-template-columns: 1fr 1fr; gap: 18px 28px;
          padding-top: 24px;
          border-top: 0.5px solid rgba(35,33,31,0.1);
          max-height: 0; opacity: 0; overflow: hidden;
          transition: max-height .7s cubic-bezier(.2,.8,.2,1), opacity .5s ease, padding-top .7s;
          margin: 0;
        }
        .sv-card:hover .sv-reveal, .sv-card:focus-within .sv-reveal {
          max-height: 320px; opacity: 1;
        }
        .sv-row { display: flex; flex-direction: column; gap: 6px; }
        .sv-row dt {
          font-family: ${FONT_MONO};
          font-size: 10px; letter-spacing: 0.16em; color: ${T.inkMute};
          text-transform: lowercase;
        }
        .sv-row dt::before {
          content: ""; display: inline-block; width: 14px; height: 1px;
          background: ${T.gold}; vertical-align: middle; margin-right: 8px;
        }
        .sv-row dd { font-size: 13.5px; line-height: 1.55; color: ${T.ink}; margin: 0; }
        .sv-foot {
          max-width: 1280px; margin: 0 auto; padding: 0 48px;
          font-family: ${FONT_MONO};
          font-size: 11px; letter-spacing: 0.14em; color: ${T.inkMute};
          display: flex; justify-content: space-between; align-items: center;
          text-transform: lowercase;
        }

        /* armature shared */
        .sv-arm { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 5; }
        .sv-arm line, .sv-arm rect, .sv-arm circle, .sv-arm path {
          stroke: ${T.gold}; stroke-width: 0.6; fill: none;
          vector-effect: non-scaling-stroke; opacity: 0.85;
        }
        .sv-arm .accent { stroke-width: 0.4; opacity: 0.5; }
        .sv-arm .marker { fill: ${T.gold}; stroke: none; opacity: 0.9; }
        .sv-pt {
          position: absolute; width: 6px; height: 6px; border-radius: 50%;
          background: radial-gradient(circle, ${T.goldSoft}, ${T.gold} 70%, transparent);
          box-shadow: 0 0 10px 2px rgba(212,168,83,0.45);
          animation: dot-pulse 5s ease-in-out infinite; z-index: 4;
        }
        .sv-pt-s { width: 4px; height: 4px; }

        /* Waihanga blocky panels */
        .sv-v-waihanga .sv-pn-1 {
          position: absolute; inset: 6% 12% 16% 6%; border-radius: 6px;
          background: linear-gradient(155deg, rgba(43,107,87,0.5), rgba(43,107,87,0.25) 60%, rgba(136,168,155,0.32));
          mix-blend-mode: multiply;
          box-shadow: 0 30px 60px -30px rgba(43,107,87,0.4);
        }
        .sv-v-waihanga .sv-pn-2 {
          position: absolute; inset: 18% 6% 10% 18%; border-radius: 6px;
          background: linear-gradient(190deg, rgba(232,228,222,0.55), rgba(250,247,242,0.3) 60%, rgba(43,107,87,0.1));
          border: 0.5px solid rgba(212,168,83,0.2);
        }
        .sv-v-waihanga .sv-pn-3 {
          position: absolute; inset: 28% 24% 24% 14%; border-radius: 6px;
          background: linear-gradient(160deg, rgba(232,228,222,0.6), rgba(250,247,242,0.35));
          border: 0.5px solid rgba(35,33,31,0.06);
        }

        /* Pikau capsule */
        .sv-v-pikau .sv-pn-1 {
          position: absolute; inset: 4% 28% 12% 28%; border-radius: 60px;
          background: linear-gradient(180deg, rgba(44,74,122,0.42), rgba(44,74,122,0.22) 50%, rgba(122,146,181,0.3));
          mix-blend-mode: multiply;
          box-shadow: 0 30px 60px -30px rgba(44,74,122,0.42);
        }
        .sv-v-pikau .sv-pn-2 {
          position: absolute; inset: 10% 32% 18% 32%; border-radius: 50px;
          background: linear-gradient(180deg, rgba(232,228,222,0.5), rgba(250,247,242,0.35) 60%, rgba(44,74,122,0.12));
          border: 0.5px solid rgba(212,168,83,0.3);
        }
        .sv-v-pikau .sv-pn-3 {
          position: absolute; inset: 18% 38% 26% 38%; border-radius: 36px;
          background: linear-gradient(180deg, rgba(250,247,242,0.55), rgba(232,228,222,0.4));
          border: 0.5px solid rgba(35,33,31,0.08);
        }

        /* Manaaki petals */
        .sv-v-manaaki .sv-pn-1 {
          position: absolute; inset: 8% 18% 18% 18%;
          border-radius: 50% 50% 45% 45%;
          background: linear-gradient(155deg, rgba(184,92,60,0.45), rgba(184,92,60,0.22) 55%, rgba(224,168,142,0.32));
          mix-blend-mode: multiply;
          box-shadow: 0 30px 60px -30px rgba(184,92,60,0.4);
          transform: rotate(-4deg);
        }
        .sv-v-manaaki .sv-pn-2 {
          position: absolute; inset: 14% 12% 14% 22%;
          border-radius: 50% 50% 40% 40%;
          background: linear-gradient(195deg, rgba(232,199,122,0.32), rgba(250,247,242,0.45) 55%, rgba(232,228,222,0.35));
          border: 0.5px solid rgba(212,168,83,0.28);
          transform: rotate(2deg);
        }
        .sv-v-manaaki .sv-pn-3 {
          position: absolute; inset: 24% 26% 24% 22%;
          border-radius: 50% 50% 35% 35%;
          background: linear-gradient(160deg, rgba(232,228,222,0.6), rgba(250,247,242,0.32));
          border: 0.5px solid rgba(35,33,31,0.07);
          transform: rotate(-2deg);
        }

        /* Auaha archive */
        .sv-v-auaha .sv-pn-1 {
          position: absolute; inset: 8% 10% 14% 10%; border-radius: 4px;
          background: linear-gradient(160deg, rgba(61,45,92,0.45), rgba(61,45,92,0.22) 55%, rgba(154,138,181,0.3));
          mix-blend-mode: multiply;
          box-shadow: 0 30px 60px -30px rgba(61,45,92,0.4);
        }
        .sv-v-auaha .sv-pn-2 {
          position: absolute; inset: 14% 14% 8% 16%; border-radius: 3px;
          background: linear-gradient(200deg, rgba(232,199,122,0.18), rgba(250,247,242,0.5) 50%, rgba(154,138,181,0.18));
          border: 0.5px solid rgba(212,168,83,0.24);
        }
        .sv-v-auaha .sv-pn-3 {
          position: absolute; inset: 22% 22% 22% 22%; border-radius: 2px;
          background: linear-gradient(165deg, rgba(232,228,222,0.55), rgba(250,247,242,0.35));
          border: 0.5px solid rgba(35,33,31,0.08);
        }
        .sv-v-auaha .sv-pn-4 {
          position: absolute; inset: 28% 38% 28% 38%;
          background: linear-gradient(180deg, rgba(212,168,83,0.12), rgba(212,168,83,0.04));
          border-left: 0.5px solid rgba(212,168,83,0.4);
          border-right: 0.5px solid rgba(212,168,83,0.4);
          border-radius: 0;
        }

        @media (max-width: 980px) {
          .sv-grid { grid-template-columns: 1fr; padding: 0 24px; gap: 24px; }
          .sv-card { padding: 36px 28px 32px; }
          .sv-card-name { font-size: 32px; }
          .sv-reveal { grid-template-columns: 1fr; }
          .sv-head { padding: 0 24px; margin: 48px auto 40px; }
          .sv-foot { padding: 0 24px; flex-direction: column; gap: 12px; align-items: flex-start; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sv-root *, .sv-root *::before, .sv-root *::after {
            animation: none !important; transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}

function VesselWaihanga() {
  return (
    <>
      <div className="sv-pn-1" />
      <div className="sv-pn-2" />
      <div className="sv-pn-3" />
      <svg className="sv-arm" viewBox="0 0 100 84" preserveAspectRatio="none">
        <rect x="5" y="3" width="90" height="78" rx="2" />
        <line x1="5" y1="18" x2="95" y2="18" />
        <line x1="5" y1="66" x2="95" y2="66" />
        <line className="accent" x1="50" y1="3" x2="50" y2="18" strokeDasharray="1.5,2" />
        <line className="accent" x1="50" y1="66" x2="50" y2="81" strokeDasharray="1.5,2" />
        <circle className="marker" cx="50" cy="10.5" r="0.8" />
        <circle className="marker" cx="50" cy="73.5" r="0.8" />
      </svg>
      <span className="sv-pt" style={{ top: "30%", left: "38%", animationDelay: ".2s" }} />
      <span className="sv-pt sv-pt-s" style={{ top: "48%", left: "58%", animationDelay: "1.4s" }} />
      <span className="sv-pt" style={{ top: "64%", left: "44%", animationDelay: "2.8s" }} />
      <span className="sv-pt sv-pt-s" style={{ top: "38%", left: "62%", animationDelay: ".8s" }} />
    </>
  );
}

function VesselPikau() {
  return (
    <>
      <div className="sv-pn-1" />
      <div className="sv-pn-2" />
      <div className="sv-pn-3" />
      <svg className="sv-arm" viewBox="0 0 100 84" preserveAspectRatio="none">
        <rect x="28" y="3" width="44" height="78" rx="22" />
        <line x1="28" y1="20" x2="72" y2="20" />
        <line x1="28" y1="64" x2="72" y2="64" />
        <line className="accent" x1="50" y1="3" x2="50" y2="20" strokeDasharray="1.5,2" />
        <line className="accent" x1="50" y1="64" x2="50" y2="81" strokeDasharray="1.5,2" />
        <circle className="marker" cx="50" cy="11.5" r="0.8" />
        <circle className="marker" cx="50" cy="72.5" r="0.8" />
        <line className="accent" x1="22" y1="42" x2="28" y2="42" />
        <line className="accent" x1="72" y1="42" x2="78" y2="42" />
      </svg>
      <span className="sv-pt" style={{ top: "28%", left: "48%", animationDelay: ".4s" }} />
      <span className="sv-pt sv-pt-s" style={{ top: "46%", left: "46%", animationDelay: "1.8s" }} />
      <span className="sv-pt" style={{ top: "60%", left: "50%", animationDelay: "3.2s" }} />
    </>
  );
}

function VesselManaaki() {
  return (
    <>
      <div className="sv-pn-1" />
      <div className="sv-pn-2" />
      <div className="sv-pn-3" />
      <svg className="sv-arm" viewBox="0 0 100 84" preserveAspectRatio="none">
        <path d="M 12 70 Q 50 6 88 70 Z" />
        <line x1="12" y1="70" x2="88" y2="70" />
        <line className="accent" x1="50" y1="3" x2="50" y2="14" strokeDasharray="1.5,2" />
        <line className="accent" x1="50" y1="70" x2="50" y2="81" strokeDasharray="1.5,2" />
        <circle className="marker" cx="50" cy="9" r="0.8" />
        <circle className="marker" cx="50" cy="76" r="0.8" />
        <line className="accent" x1="20" y1="56" x2="14" y2="56" />
        <line className="accent" x1="80" y1="56" x2="86" y2="56" />
      </svg>
      <span
        className="sv-pt"
        style={{ top: "36%", left: "46%", animationDelay: ".4s", background: "radial-gradient(circle, #E8C77A, #B85C3C 70%, transparent)" }}
      />
      <span
        className="sv-pt sv-pt-s"
        style={{ top: "52%", left: "38%", animationDelay: "2.0s", background: "radial-gradient(circle, #E8C77A, #B85C3C 70%, transparent)" }}
      />
      <span
        className="sv-pt sv-pt-s"
        style={{ top: "50%", left: "58%", animationDelay: "3.4s", background: "radial-gradient(circle, #E8C77A, #B85C3C 70%, transparent)" }}
      />
    </>
  );
}

function VesselAuaha() {
  return (
    <>
      <div className="sv-pn-1" />
      <div className="sv-pn-2" />
      <div className="sv-pn-3" />
      <div className="sv-pn-4" />
      <svg className="sv-arm" viewBox="0 0 100 84" preserveAspectRatio="none">
        <rect x="6" y="3" width="88" height="78" rx="1" />
        <line x1="6" y1="22" x2="94" y2="22" />
        <line x1="6" y1="42" x2="94" y2="42" />
        <line x1="6" y1="62" x2="94" y2="62" />
        <line className="accent" x1="50" y1="3" x2="50" y2="81" strokeDasharray="1,2.5" />
        <circle className="marker" cx="50" cy="12.5" r="0.7" />
        <circle className="marker" cx="50" cy="32" r="0.7" />
        <circle className="marker" cx="50" cy="52" r="0.7" />
        <circle className="marker" cx="50" cy="71.5" r="0.7" />
      </svg>
      <span className="sv-pt sv-pt-s" style={{ top: "18%", left: "36%", animationDelay: ".4s" }} />
      <span className="sv-pt sv-pt-s" style={{ top: "32%", left: "64%", animationDelay: "1.6s" }} />
      <span className="sv-pt" style={{ top: "48%", left: "44%", animationDelay: "2.4s" }} />
      <span className="sv-pt sv-pt-s" style={{ top: "62%", left: "58%", animationDelay: "3.6s" }} />
      <span className="sv-pt sv-pt-s" style={{ top: "74%", left: "40%", animationDelay: "4.4s" }} />
    </>
  );
}
