import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Car, Users, FileText, Shield, Wrench, DollarSign, MessageSquare, Clock, Star, Megaphone, Heart } from "lucide-react";
import SEO from "@/components/SEO";
import BrandNav from "@/components/BrandNav";
import BrandFooter from "@/components/BrandFooter";
import GlowPageWrapper from "@/components/kete/GlowPageWrapper";
import KeteAgentChat from "@/components/kete/KeteAgentChat";
import KeteRaceVideo from "@/components/kete/KeteRaceVideo";
import aratakiIcon from "@/assets/arataki-kete-car.png";

const BG = "#09090F";
const ACCENT = "#E8E8E8";
const POUNAMU = "#3A7D6E";
const POUNAMU_LIGHT = "#7ECFC2";
const BONE = "#F5F0E8";
const GOLD = "#D4A843";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  }),
};

const AGENTS = [
  { code: "CHARTER", role: "Customer enquiry intake & qualification", icon: MessageSquare },
  { code: "ARBITER", role: "Deal structuring & negotiation support", icon: DollarSign },
  { code: "SHIELD", role: "Compliance — MVSA, FTA, CCCFA", icon: Shield },
  { code: "ANCHOR", role: "Delivery coordination & handover", icon: Car },
  { code: "MOTOR", role: "Workshop scheduling & capacity", icon: Wrench },
  { code: "APEX", role: "Warranty narrative drafting", icon: FileText },
  { code: "PILOT", role: "Loan car & fleet management", icon: Clock },
  { code: "ECHO", role: "Customer communications & follow-up", icon: Users },
  { code: "FLUX", role: "Campaign localisation from OEM briefs", icon: Megaphone },
  { code: "AROHA", role: "Staff rostering & HR compliance", icon: Heart },
  { code: "SENTINEL", role: "Site safety & workshop H&S", icon: Star },
];

const COMPLIANCE = [
  "Fair Trading Act 1986 — claims scanned pre-publish",
  "Motor Vehicle Sales Act 2003 — CIN timing enforced",
  "CCCFA 2003 — finance language guardrails active",
  "Privacy Act 2020 · IPP 3A — automated-decision disclosure",
];

const DEMO_FLOW = [
  { step: "Enquiry received", detail: "Customer details captured, vehicle interest logged, test drive booked", icon: MessageSquare },
  { step: "Deal & compliance", detail: "MVSA CIN generated, finance language checked, FTA claims scanned", icon: Shield },
  { step: "Delivery pack", detail: "Handover checklist, warranty registration, and service schedule prepared", icon: FileText },
  { step: "Service & loyalty", detail: "Workshop booking, warranty claim drafting, retention touchpoints", icon: Wrench },
];

export default function AratakiLandingPage() {
  const [activeDemo, setActiveDemo] = useState(0);
  const [hoveredAgent, setHoveredAgent] = useState<number | null>(null);

  return (
    <GlowPageWrapper accentColor={ACCENT}>
      <div style={{ background: BG, minHeight: "100vh", color: "#fff" }}>
        <SEO
          title="Arataki — Automotive Dealership Operations | assembl"
          description="Operational intelligence for NZ motor dealers. Customer journey orchestration, warranty claims, workshop capacity, and compliance — governed, auditable, human-in-the-loop."
        />
        <BrandNav />

        {/* ── Hero ── */}
        <main className="relative flex flex-col items-center px-6 pt-16 pb-28 text-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{
            background: `radial-gradient(ellipse 80% 50% at 50% 30%, ${POUNAMU}10 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 70% 60%, ${GOLD}06 0%, transparent 60%)`,
          }} />

          {[...Array(6)].map((_, i) => (
            <motion.div key={i} className="absolute rounded-full pointer-events-none" style={{
              width: 3 + i * 1.5, height: 3 + i * 1.5,
              background: i % 2 === 0 ? POUNAMU : POUNAMU_LIGHT,
              left: `${15 + i * 14}%`, top: `${20 + (i % 3) * 25}%`, opacity: 0.15,
            }} animate={{ y: [0, -20 - i * 5, 0], opacity: [0.1, 0.3, 0.1], scale: [1, 1.5, 1] }}
              transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }} />
          ))}

          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="mb-8">
            <img src={aratakiIcon} alt="Arataki kete — automotive" className="w-40 h-40 sm:w-48 sm:h-48 object-contain" style={{ filter: `drop-shadow(0 0 40px rgba(58,125,110,0.3))` }} />
          </motion.div>

          <motion.p className="text-[10px] uppercase tracking-[5px] mb-6" style={{ color: POUNAMU, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}
            variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            ARATAKI · AUTOMOTIVE
          </motion.p>

          <motion.h1 className="text-4xl sm:text-6xl font-display font-light tracking-[0.02em] mb-4 max-w-3xl leading-[1.1]"
            variants={fadeUp} initial="hidden" animate="visible" custom={1}>
            <span style={{ background: `linear-gradient(135deg, ${BONE} 0%, ${POUNAMU_LIGHT} 50%, ${BONE} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundSize: "200% auto" }}>
              Every handoff.
            </span>
            <br />
            <span style={{ background: `linear-gradient(135deg, ${BONE} 0%, ${GOLD} 60%, ${BONE} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundSize: "200% auto" }}>
              Tracked.
            </span>
          </motion.h1>

          <motion.p className="text-lg sm:text-xl font-display font-light tracking-[0.02em] mb-6 max-w-2xl" style={{ color: "rgba(255,255,255,0.35)" }} variants={fadeUp} initial="hidden" animate="visible" custom={1.5}>
            Operational intelligence for NZ dealerships
          </motion.p>

          <motion.p className="text-sm sm:text-base max-w-xl mb-8 font-body leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }} variants={fadeUp} initial="hidden" animate="visible" custom={2}>
            Arataki connects the stages your teams already run — enquiry, test drive, sale, delivery, service, loyalty — into a single governed workflow.
          </motion.p>

          <motion.div className="relative rounded-2xl px-7 py-6 max-w-md mb-12 text-left overflow-hidden" style={{
            background: `linear-gradient(135deg, rgba(58,125,110,0.08) 0%, rgba(255,255,255,0.02) 100%)`,
            border: `1px solid ${POUNAMU}30`, backdropFilter: "blur(20px)",
            boxShadow: `0 8px 32px rgba(0,0,0,0.3), 0 0 60px ${POUNAMU}08, inset 0 1px 0 rgba(255,255,255,0.05)`,
          }} variants={fadeUp} initial="hidden" animate="visible" custom={3}
            whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
            <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${POUNAMU}60, transparent)` }} />
            <p className="text-[10px] uppercase tracking-[3px] mb-4" style={{ color: POUNAMU, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>11 agents · human-in-the-loop</p>
            <ul className="space-y-3">
              {COMPLIANCE.map((item, idx) => (
                <motion.li key={item} className="flex items-start gap-3 text-xs font-body" style={{ color: "rgba(255,255,255,0.6)" }}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + idx * 0.08 }}>
                  <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: `${POUNAMU}20`, boxShadow: `0 0 8px ${POUNAMU}20` }}>
                    <Check size={10} style={{ color: POUNAMU_LIGHT }} />
                  </div>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="flex flex-col sm:flex-row items-center gap-4" variants={fadeUp} initial="hidden" animate="visible" custom={4}>
            <Link to="/arataki/dashboard" className="group relative flex items-center gap-2 px-10 py-4 rounded-full text-sm font-semibold font-body overflow-hidden" style={{ color: "#fff" }}>
              <div className="absolute inset-0 rounded-full" style={{ background: `linear-gradient(135deg, ${POUNAMU} 0%, #2D6A5E 100%)` }} />
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: `0 0 30px ${POUNAMU}40` }} />
              <span className="relative z-10">Launch Arataki Dashboard</span>
              <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/contact" className="group px-10 py-4 rounded-full text-sm font-medium font-body transition-all duration-300" style={{ color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
              <span className="group-hover:text-white/80 transition-colors">Book a walk-through</span>
            </Link>
          </motion.div>
        </main>

        {/* ── Agent Network ── */}
        <section className="relative px-6 pb-24 max-w-5xl mx-auto">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none" style={{ background: `radial-gradient(ellipse, ${POUNAMU}06 0%, transparent 70%)` }} />
          <motion.div className="text-center mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <p className="text-[10px] tracking-[4px] mb-3 uppercase" style={{ color: POUNAMU, fontFamily: "'JetBrains Mono', monospace" }}>specialist network</p>
            <h2 className="text-2xl sm:text-3xl font-display font-light" style={{ color: BONE }}>11 agents working together</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {AGENTS.map((a, i) => (
              <motion.div key={a.code} className="group relative p-5 rounded-xl overflow-hidden cursor-default" style={{
                background: hoveredAgent === i ? `linear-gradient(135deg, rgba(58,125,110,0.1) 0%, rgba(212,168,67,0.05) 100%)` : `linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)`,
                border: `1px solid ${hoveredAgent === i ? POUNAMU + "40" : "rgba(255,255,255,0.06)"}`,
                transition: "all 0.4s ease",
                boxShadow: hoveredAgent === i ? `0 8px 32px rgba(0,0,0,0.3), 0 0 40px ${POUNAMU}08` : "none",
              }} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                onMouseEnter={() => setHoveredAgent(i)} onMouseLeave={() => setHoveredAgent(null)}>
                <div className="absolute top-0 left-0 right-0 h-[1px] transition-opacity duration-500" style={{ opacity: hoveredAgent === i ? 1 : 0, background: `linear-gradient(90deg, transparent, ${POUNAMU}50, transparent)` }} />
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-400" style={{
                    background: hoveredAgent === i ? `linear-gradient(135deg, ${POUNAMU}25, ${POUNAMU}10)` : `${POUNAMU}10`,
                    boxShadow: hoveredAgent === i ? `0 0 16px ${POUNAMU}15` : "none",
                  }}>
                    <a.icon size={18} style={{ color: POUNAMU }} />
                  </div>
                  <span className="text-xs font-mono font-bold" style={{ color: hoveredAgent === i ? BONE : "rgba(255,255,255,0.7)", transition: "color 0.3s" }}>{a.code}</span>
                </div>
                <p className="text-[12px] leading-relaxed transition-colors duration-300" style={{ color: hoveredAgent === i ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.35)" }}>{a.role}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Live Demo Flow ── */}
        <section className="relative px-6 pb-28 max-w-4xl mx-auto">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] pointer-events-none" style={{ background: `radial-gradient(ellipse, ${POUNAMU}06 0%, transparent 60%)` }} />
          <motion.div className="text-center mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <p className="text-[10px] tracking-[4px] mb-3 uppercase" style={{ color: POUNAMU, fontFamily: "'JetBrains Mono', monospace" }}>workflow</p>
            <h2 className="text-2xl sm:text-3xl font-display font-light" style={{ color: BONE }}>How it works</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
            {DEMO_FLOW.map((d, i) => (
              <motion.button key={d.step} onClick={() => setActiveDemo(i)} className="group relative p-5 rounded-xl text-left overflow-hidden" style={{
                background: activeDemo === i ? `${POUNAMU}12` : "rgba(255,255,255,0.02)",
                border: `1px solid ${activeDemo === i ? POUNAMU + "40" : "rgba(255,255,255,0.06)"}`,
                boxShadow: activeDemo === i ? `0 4px 24px rgba(0,0,0,0.3), 0 0 40px ${POUNAMU}06` : "none",
                transition: "all 0.4s ease",
              }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                {activeDemo === i && <motion.div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${POUNAMU}, transparent)` }} layoutId="arataki-demo-accent" />}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300" style={{
                    background: activeDemo === i ? POUNAMU : "rgba(255,255,255,0.06)",
                    boxShadow: activeDemo === i ? `0 0 16px ${POUNAMU}30` : "none",
                  }}>
                    <d.icon size={14} style={{ color: activeDemo === i ? "#fff" : "rgba(255,255,255,0.35)" }} />
                  </div>
                  <span className="text-xs font-medium transition-colors duration-300" style={{ color: activeDemo === i ? BONE : "rgba(255,255,255,0.5)" }}>{d.step}</span>
                </div>
                <p className="text-[11px] leading-relaxed transition-colors duration-300" style={{ color: activeDemo === i ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.25)" }}>{d.detail}</p>
              </motion.button>
            ))}
          </div>

          <motion.div className="relative p-8 rounded-2xl overflow-hidden" style={{
            background: `linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)`,
            border: `1px solid ${POUNAMU}18`,
            boxShadow: `0 16px 48px rgba(0,0,0,0.4), 0 0 80px ${POUNAMU}04, inset 0 1px 0 rgba(255,255,255,0.04)`,
          }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${POUNAMU}30, transparent)` }} />
            <div className="flex items-center gap-2.5 mb-6">
              <motion.div className="w-2.5 h-2.5 rounded-full" style={{ background: POUNAMU, boxShadow: `0 0 10px ${POUNAMU}40` }} animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity }} />
              <span className="text-[10px] uppercase tracking-[3px] font-mono" style={{ color: POUNAMU }}>Live preview</span>
            </div>
            {activeDemo === 0 && (
              <motion.div className="grid grid-cols-2 gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} key="ar-0">
                {[
                  { label: "Customer", value: "James & Sarah Chen" },
                  { label: "Interest", value: "2026 Toyota RAV4 Hybrid" },
                  { label: "Stage", value: "Test drive booked" },
                  { label: "Source", value: "Website enquiry" },
                  { label: "Trade-in", value: "2019 Honda CR-V" },
                  { label: "Finance", value: "Pre-approved — $42k" },
                ].map((f, idx) => (
                  <motion.div key={f.label} className="p-3 rounded-lg text-xs" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                    <span className="text-white/25 text-[10px]">{f.label}</span>
                    <p className="text-white/70 font-mono mt-1">{f.value}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
            {activeDemo === 1 && (
              <motion.div className="space-y-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} key="ar-1">
                {["MVSA 2003 — CIN generated within 3 working days ✓", "FTA 1986 — advertised price claims validated ✓", "CCCFA — finance disclosure language checked ✓", "Privacy Act — automated-decision disclosure prepared ✓"].map((line, idx) => (
                  <motion.div key={line} className="flex items-center gap-3 text-xs p-3 rounded-lg" style={{ background: `${POUNAMU}08`, border: `1px solid ${POUNAMU}15` }}
                    initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: `${POUNAMU}20` }}>
                      <Check size={11} style={{ color: POUNAMU_LIGHT }} />
                    </div>
                    <span className="text-white/60">{line}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}
            {activeDemo === 2 && (
              <motion.div className="space-y-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} key="ar-2">
                {[
                  { check: "Vehicle handover checklist — 14 items", st: "pass" },
                  { check: "Warranty registration — submitted", st: "pass" },
                  { check: "First service scheduled — 10,000km", st: "pass" },
                  { check: "Customer satisfaction survey — queued", st: "pending" },
                ].map((c, idx) => (
                  <motion.div key={c.check} className="flex items-center justify-between text-xs p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}
                    initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.08 }}>
                    <span className="text-white/50">{c.check}</span>
                    <span className={`text-[10px] uppercase font-semibold ${c.st === "pass" ? "text-emerald-400" : "text-amber-400"}`}>{c.st}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}
            {activeDemo === 3 && (
              <motion.div className="text-center py-6" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} key="ar-3">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: `${POUNAMU}15`, boxShadow: `0 0 30px ${POUNAMU}15` }}>
                  <Wrench size={28} style={{ color: POUNAMU }} />
                </div>
                <p className="text-sm text-white/70 mb-1">Service loop activated</p>
                <p className="text-[10px] text-white/40">10,000km service reminder · Warranty claim auto-drafted · Loyalty touchpoint at 6 months</p>
              </motion.div>
            )}
          </motion.div>
        </section>

        <KeteRaceVideo slug="arataki" keteName="Arataki" accentColor={ACCENT} />

        <section className="relative text-center px-6 pb-24">
          <motion.div className="relative inline-flex flex-col items-center gap-4 p-10 rounded-2xl overflow-hidden" style={{
            background: `linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)`,
            border: `1px solid ${POUNAMU}25`,
            boxShadow: `0 8px 32px rgba(0,0,0,0.3), 0 0 60px ${POUNAMU}05`,
          }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${POUNAMU}40, transparent)` }} />
            <p className="text-sm text-white/60">Ready to connect your dealership operations?</p>
            <Link to="/arataki/dashboard" className="group relative flex items-center gap-2 px-10 py-4 rounded-full text-sm font-semibold transition-all overflow-hidden" style={{ color: "#fff" }}>
              <div className="absolute inset-0 rounded-full" style={{ background: POUNAMU }} />
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: `0 0 30px ${POUNAMU}40` }} />
              <span className="relative z-10">Open Arataki Dashboard</span>
              <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </section>

        <BrandFooter />
        <KeteAgentChat
          keteName="Arataki" keteLabel="Automotive Dealerships" accentColor="#E8E8E8"
          defaultAgentId="motor" packId="waka"
          starterPrompts={["What does Arataki cover for dealerships?", "How does customer journey tracking work?", "Tell me about warranty claim drafting", "What compliance is built in?"]}
        />
      </div>
    </GlowPageWrapper>
  );
}
