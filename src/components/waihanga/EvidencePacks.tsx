import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check, Clock, AlertCircle, FileText, Sparkles } from "lucide-react";
import { showWorkflowToast } from "./WorkflowToast";

const STATS = [
  { label: "Total Documents", value: "47" },
  { label: "Pack Completeness", value: "78%" },
  { label: "AI Verified", value: "34 / 47" },
];

const BC_DOCS = [
  { name: "Architectural Drawing Set", detail: "42 sheets", status: "complete" },
  { name: "Structural Calculations — Holmes", detail: "", status: "complete" },
  { name: "Fire Engineering Report C/AS7", detail: "", status: "review" },
  { name: "Geotechnical Investigation — Tonkin+Taylor", detail: "", status: "addendum" },
  { name: "BIM Model IFC", detail: "", status: "complete" },
  { name: "Producer Statements PS1", detail: "2 of 4 received", status: "progress" },
  { name: "Accessibility Audit NZS 4121", detail: "", status: "complete" },
  { name: "Energy Model H1/AS1", detail: "", status: "pending" },
];

const RC_DOCS = [
  { name: "AEE s88", status: "complete" },
  { name: "Urban Design Assessment", status: "complete" },
  { name: "Transport Assessment", status: "complete" },
  { name: "Cultural Impact Assessment", status: "progress" },
  { name: "Stormwater Management Plan", status: "complete" },
];

function StatusIcon({ status }: { status: string }) {
  if (status === "complete") return <Check size={14} className="text-primary" />;
  if (status === "review") return <Clock size={14} className="text-[hsl(42,78%,60%)]" />;
  if (status === "progress") return <Clock size={14} className="text-[hsl(42,78%,60%)]" />;
  if (status === "addendum") return <AlertCircle size={14} className="text-[hsl(30,80%,55%)]" />;
  return <div className="w-3.5 h-3.5 rounded-full border border-muted-foreground" />;
}

const COMPILE_STEPS = [
  "Scanning documents...",
  "Verifying Building Code references...",
  "Cross-referencing compliance matrix...",
  "Generating table of contents...",
  "Compiling PDF...",
  "Running gap analysis...",
];

function CompileModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPct(p => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + 2;
      });
      setStep(s => Math.min(Math.floor((pct / 100) * COMPILE_STEPS.length), COMPILE_STEPS.length - 1));
    }, 80);
    const timeout = setTimeout(() => {
      onClose();
      showWorkflowToast("Evidence pack compiled successfully!", "47 documents, 3 gaps identified");
    }, 5000);
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
      <div className="bg-card border border-border rounded-xl p-8 max-w-md w-full mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={20} className="text-[hsl(42,78%,60%)]" />
          <h3 className="text-lg font-medium text-foreground">Compiling Evidence Pack</h3>
        </div>
        <p className="text-sm text-primary mb-4">{COMPILE_STEPS[Math.min(step, COMPILE_STEPS.length - 1)]}</p>
        <Progress value={pct} className="h-2 mb-2" />
        <p className="text-xs text-muted-foreground text-right">{pct}%</p>
      </div>
    </div>
  );
}

export default function EvidencePacks() {
  const [compiling, setCompiling] = useState(false);

  return (
    <div className="space-y-6">
      {compiling && <CompileModal onClose={() => setCompiling(false)} />}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {STATS.map(s => (
          <Card key={s.label} className="bg-card border-border">
            <CardContent className="p-5 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</p>
              <p className="text-2xl font-semibold text-foreground mt-1">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">Building Consent Evidence Pack</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {BC_DOCS.map(d => (
                <li key={d.name} className="flex items-center gap-2 text-sm">
                  <FileText size={14} className="text-muted-foreground shrink-0" />
                  <StatusIcon status={d.status} />
                  <span className="text-foreground flex-1">{d.name}</span>
                  {d.detail && <span className="text-[10px] text-muted-foreground">{d.detail}</span>}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium">Resource Consent Evidence Pack</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {RC_DOCS.map(d => (
                  <li key={d.name} className="flex items-center gap-2 text-sm">
                    <FileText size={14} className="text-muted-foreground shrink-0" />
                    <StatusIcon status={d.status} />
                    <span className="text-foreground">{d.name}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card border-border relative overflow-hidden" style={{ boxShadow: "0 0 40px hsl(42 78% 50% / 0.08)" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(42,78%,60%)]/5 to-transparent pointer-events-none" />
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Sparkles size={16} className="text-[hsl(42,78%,60%)]" />
                AI Evidence Pack Generator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-muted-foreground">Auto-compiles all project documentation into structured evidence packs, cross-referenced against Building Code and consent requirements.</p>
              <div className="flex flex-wrap gap-2">
                <Button className="bg-[hsl(42,78%,50%)] hover:bg-[hsl(42,78%,45%)] text-black text-xs" onClick={() => setCompiling(true)}>Generate Building Consent Pack</Button>
                <Button className="text-xs" onClick={() => setCompiling(true)}>Generate Resource Consent Pack</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
