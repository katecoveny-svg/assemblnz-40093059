// ═══════════════════════════════════════════════════════════════
// WAIHANGA/KAUPAPA · TĀ — policy gates for construction PM
// Coverage: CCA 2002, NZS 3910, Building Act 2004
// ═══════════════════════════════════════════════════════════════
import type { TaRule } from "../pipeline.ts";

export const waihanga_taRules: TaRule[] = [
  // ── CCA Form 1: payment claim must comply with prescribed form
  (req) => {
    const p = req.payload as any;
    if (req.workflow !== "payment_claim_check") return { id: "cca_form1_compliance", level: "PASS" };
    if (p.ccaForm1 !== true)
      return { id: "cca_form1_compliance", level: "BLOCK", reason: "CCA 2002 s.20 — payment claim must comply with prescribed Form 1 (contracts from 1 Dec 2015)" };
    return { id: "cca_form1_compliance", level: "PASS" };
  },

  // ── CCA: payment schedule response timing
  (req) => {
    const p = req.payload as any;
    if (req.workflow !== "payment_claim_check") return { id: "cca_payment_schedule", level: "PASS" };
    if (p.paymentScheduleProvided === false)
      return { id: "cca_payment_schedule", level: "WARN", reason: "CCA 2002 s.22 — no payment schedule provided; if 20 working days elapse, full claimed amount becomes a debt due" };
    return { id: "cca_payment_schedule", level: "PASS" };
  },

  // ── CCA: GST must be included in claim
  (req) => {
    const p = req.payload as any;
    if (req.workflow !== "payment_claim_check") return { id: "cca_gst_included", level: "PASS" };
    if (p.gstIncluded === false)
      return { id: "cca_gst_included", level: "WARN", reason: "Payment claim should include GST (15%) — omission may cause rejection or underpayment" };
    return { id: "cca_gst_included", level: "PASS" };
  },

  // ── CCA: retention money trust (since 5 Oct 2023)
  (req) => {
    const p = req.payload as any;
    if (req.workflow !== "retention_compliance_check") return { id: "cca_retention_trust", level: "PASS" };
    if (p.heldInTrust !== true)
      return { id: "cca_retention_trust", level: "BLOCK", reason: "CCA 2002 s.18C–18I — retention money must be held in a compliant trust account since 5 October 2023; directors personally liable for non-compliance" };
    return { id: "cca_retention_trust", level: "PASS" };
  },

  // ── CCA: retention amount reasonableness (>10% is unusual)
  (req) => {
    const p = req.payload as any;
    if (req.workflow !== "retention_compliance_check") return { id: "cca_retention_rate", level: "PASS" };
    if (p.contractSumNzd && p.retentionAmountNzd) {
      const pct = (p.retentionAmountNzd / p.contractSumNzd) * 100;
      if (pct > 10)
        return { id: "cca_retention_rate", level: "WARN", reason: `Retention at ${pct.toFixed(1)}% of contract sum — typical NZ range is 5–10%. Verify contract terms.` };
    }
    return { id: "cca_retention_rate", level: "PASS" };
  },

  // ── CCA s.13: pay-when-paid clause detection
  (req) => {
    const p = req.payload as any;
    if (req.workflow !== "payment_claim_check") return { id: "cca_pay_when_paid", level: "PASS" };
    if (p.conditionalOnUpstreamPayment === true)
      return { id: "cca_pay_when_paid", level: "BLOCK", reason: "CCA 2002 s.13 — 'pay when paid' clauses are void; payment obligation is unconditional" };
    return { id: "cca_pay_when_paid", level: "PASS" };
  },

  // ── Variation: must be documented before execution
  (req) => {
    const p = req.payload as any;
    if (req.workflow !== "variation_assessment") return { id: "cca_variation_procedure", level: "PASS" };
    if (p.documentedBeforeExecution === false)
      return { id: "cca_variation_procedure", level: "WARN", reason: "Variation instruction not documented before execution — this is the root cause of most NZ construction disputes. Get written instruction." };
    return { id: "cca_variation_procedure", level: "PASS" };
  },

  // ── Variation: unapproved variations in payment claim
  (req) => {
    const p = req.payload as any;
    if (req.workflow !== "payment_claim_check") return { id: "cca_unapproved_variations", level: "PASS" };
    if (p.includesUnapprovedVariations === true)
      return { id: "cca_unapproved_variations", level: "WARN", reason: "Payment claim includes unapproved variations — flag for review before submission" };
    return { id: "cca_unapproved_variations", level: "PASS" };
  },

  // ── Hard rule: never authorise payment
  (req) => {
    const p = req.payload as any;
    if (p.authorisePayment === true)
      return { id: "no_direct_payment", level: "BLOCK", reason: "Hard rule: Kaupapa never authorises, approves, or makes payments" };
    return { id: "no_direct_payment", level: "PASS" };
  },

  // ── Hard rule: never execute contract
  (req) => {
    const p = req.payload as any;
    if (p.executeContract === true)
      return { id: "no_contract_execution", level: "BLOCK", reason: "Hard rule: Kaupapa never signs, executes, or accepts contracts or variations" };
    return { id: "no_contract_execution", level: "PASS" };
  },

  // ── Hard rule: never file adjudication
  (req) => {
    const p = req.payload as any;
    if (p.fileAdjudication === true)
      return { id: "no_adjudication_filing", level: "BLOCK", reason: "Hard rule: Kaupapa never files adjudication applications or responses" };
    return { id: "no_adjudication_filing", level: "PASS" };
  },

  // ── Programme: critical-path delay detection
  (req) => {
    const p = req.payload as any;
    if (req.workflow !== "programme_review") return { id: "programme_delay", level: "PASS" };
    if (p.criticalPathDelayDays && p.criticalPathDelayDays > 0)
      return { id: "programme_delay", level: "WARN", reason: `Critical-path delay: ${p.criticalPathDelayDays} working days — assess extension-of-time entitlement and prolongation costs` };
    return { id: "programme_delay", level: "PASS" };
  },
];
