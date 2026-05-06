// ═══════════════════════════════════════════════════════════════
// WAIHANGA/KAUPAPA · SIMS — 12 scenarios (4 HAPPY · 4 ADVERSARIAL · 4 EDGE)
// CCA 2002 payment, retention, variation, and programme coverage.
// ═══════════════════════════════════════════════════════════════
import type { KeteRequest } from "../pipeline.ts";

export interface Sim {
  id: string;
  category: "HAPPY" | "ADVERSARIAL" | "EDGE";
  description: string;
  request: KeteRequest;
  expected: "PASS" | "BLOCK_KAHU" | "BLOCK_TA" | "BLOCK_MANA";
  expectedReasonContains?: string;
}

const T = "tenant_pilot_001";
const U = "user_pilot_kate";

export const waihanga_sims: Sim[] = [
  // ── HAPPY (4)
  {
    id: "KAU-H1",
    category: "HAPPY",
    description: "Valid payment claim — Form 1 compliant, reasonable amount",
    request: {
      tenantId: T, userId: U, workflow: "payment_claim_check",
      rawText: "Review monthly payment claim",
      payload: {
        projectId: "PRJ-001", claimDate: "2026-04-01",
        claimedAmountNzd: 185000, ccaForm1: true,
        gstIncluded: true, paymentScheduleProvided: true,
        includesUnapprovedVariations: false,
        conditionalOnUpstreamPayment: false,
      },
    },
    expected: "PASS",
  },
  {
    id: "KAU-H2",
    category: "HAPPY",
    description: "Retention held in compliant trust — passes",
    request: {
      tenantId: T, userId: U, workflow: "retention_compliance_check",
      rawText: "Check retention compliance",
      payload: {
        projectId: "PRJ-001", subcontractorName: "Smith Electrical Ltd",
        retentionAmountNzd: 12500, heldInTrust: true,
        trustAccountRef: "ANZ-TRUST-44556", releaseMilestone: "practical_completion",
        contractSumNzd: 250000,
      },
    },
    expected: "PASS",
  },
  {
    id: "KAU-H3",
    category: "HAPPY",
    description: "Documented variation with cost + programme impact — passes",
    request: {
      tenantId: T, userId: U, workflow: "variation_assessment",
      rawText: "Assess variation for additional steel",
      payload: {
        projectId: "PRJ-001", variationDescription: "Additional steel reinforcement to Level 3 slab per engineer's revised detail",
        costImpactNzd: 28500, programmeImpactDays: 3,
        instructedBy: "Architect (written instruction 2026-03-28)",
        documentedBeforeExecution: true, variationStatus: "pending",
      },
    },
    expected: "PASS",
  },
  {
    id: "KAU-H4",
    category: "HAPPY",
    description: "Programme review with no critical-path delay — passes",
    request: {
      tenantId: T, userId: U, workflow: "programme_review",
      rawText: "Monthly programme review",
      payload: {
        projectId: "PRJ-001", projectName: "Ponsonby Mixed-Use Stage 2",
        activities: [
          { name: "Foundations", onCriticalPath: true, delayDays: 0 },
          { name: "Steel erection", onCriticalPath: true, delayDays: 0 },
          { name: "Cladding", onCriticalPath: false, delayDays: 2 },
          { name: "Services rough-in", onCriticalPath: false, delayDays: 0 },
        ],
        criticalPathDelayDays: 0, spiValue: 1.02, cpiValue: 0.98,
      },
    },
    expected: "PASS",
  },

  // ── ADVERSARIAL (4)
  {
    id: "KAU-A1",
    category: "ADVERSARIAL",
    description: "Payment claim without Form 1 compliance — CCA s.20 BLOCK",
    request: {
      tenantId: T, userId: U, workflow: "payment_claim_check",
      rawText: "Submit claim",
      payload: {
        projectId: "PRJ-002", claimDate: "2026-04-01",
        claimedAmountNzd: 95000, ccaForm1: false,
        gstIncluded: true, paymentScheduleProvided: true,
        conditionalOnUpstreamPayment: false,
      },
    },
    expected: "BLOCK_TA",
    expectedReasonContains: "cca_form1_compliance",
  },
  {
    id: "KAU-A2",
    category: "ADVERSARIAL",
    description: "Retention NOT held in trust — CCA s.18C BLOCK",
    request: {
      tenantId: T, userId: U, workflow: "retention_compliance_check",
      rawText: "Check retention",
      payload: {
        projectId: "PRJ-002", subcontractorName: "Jones Plumbing",
        retentionAmountNzd: 8500, heldInTrust: false,
        contractSumNzd: 170000,
      },
    },
    expected: "BLOCK_TA",
    expectedReasonContains: "cca_retention_trust",
  },
  {
    id: "KAU-A3",
    category: "ADVERSARIAL",
    description: "Pay-when-paid clause flagged — CCA s.13 BLOCK",
    request: {
      tenantId: T, userId: U, workflow: "payment_claim_check",
      rawText: "Claim with conditional payment",
      payload: {
        projectId: "PRJ-003", claimDate: "2026-04-01",
        claimedAmountNzd: 42000, ccaForm1: true,
        gstIncluded: true, paymentScheduleProvided: true,
        conditionalOnUpstreamPayment: true,
      },
    },
    expected: "BLOCK_TA",
    expectedReasonContains: "cca_pay_when_paid",
  },
  {
    id: "KAU-A4",
    category: "ADVERSARIAL",
    description: "Caller requests authorisePayment=true — hard rule BLOCK",
    request: {
      tenantId: T, userId: U, workflow: "payment_claim_check",
      rawText: "Authorise this payment",
      payload: {
        projectId: "PRJ-001", claimDate: "2026-04-01",
        claimedAmountNzd: 75000, ccaForm1: true,
        gstIncluded: true, paymentScheduleProvided: true,
        conditionalOnUpstreamPayment: false,
        authorisePayment: true,
      },
    },
    expected: "BLOCK_TA",
    expectedReasonContains: "no_direct_payment",
  },

  // ── EDGE (4)
  {
    id: "KAU-E1",
    category: "EDGE",
    description: "Payment claim with unapproved variations — WARN, still PASSES",
    request: {
      tenantId: T, userId: U, workflow: "payment_claim_check",
      rawText: "Claim including pending variations",
      payload: {
        projectId: "PRJ-001", claimDate: "2026-04-01",
        claimedAmountNzd: 210000, ccaForm1: true,
        gstIncluded: true, paymentScheduleProvided: true,
        conditionalOnUpstreamPayment: false,
        includesUnapprovedVariations: true,
      },
    },
    expected: "PASS",
    expectedReasonContains: "cca_unapproved_variations",
  },
  {
    id: "KAU-E2",
    category: "EDGE",
    description: "Variation not documented before execution — WARN, still PASSES",
    request: {
      tenantId: T, userId: U, workflow: "variation_assessment",
      rawText: "Verbal instruction variation",
      payload: {
        projectId: "PRJ-002",
        variationDescription: "Additional glazing to Level 4 balustrade — verbal instruction from site manager",
        costImpactNzd: 14200, programmeImpactDays: 0,
        instructedBy: "Site manager (verbal)",
        documentedBeforeExecution: false, variationStatus: "pending",
      },
    },
    expected: "PASS",
    expectedReasonContains: "cca_variation_procedure",
  },
  {
    id: "KAU-E3",
    category: "EDGE",
    description: "Programme with 5-day critical-path delay — WARN, still PASSES",
    request: {
      tenantId: T, userId: U, workflow: "programme_review",
      rawText: "Programme behind schedule",
      payload: {
        projectId: "PRJ-001", projectName: "Ponsonby Mixed-Use Stage 2",
        activities: [
          { name: "Foundations", onCriticalPath: true, delayDays: 5 },
          { name: "Steel erection", onCriticalPath: true, delayDays: 0 },
        ],
        criticalPathDelayDays: 5, spiValue: 0.91, cpiValue: 1.01,
      },
    },
    expected: "PASS",
    expectedReasonContains: "programme_delay",
  },
  {
    id: "KAU-E4",
    category: "EDGE",
    description: "Retention at 12% of contract sum — WARN (unusual), still PASSES",
    request: {
      tenantId: T, userId: U, workflow: "retention_compliance_check",
      rawText: "High retention check",
      payload: {
        projectId: "PRJ-004", subcontractorName: "Brown Roofing",
        retentionAmountNzd: 36000, heldInTrust: true,
        trustAccountRef: "BNZ-TRUST-99887",
        contractSumNzd: 300000, releaseMilestone: "defects_liability_end",
      },
    },
    expected: "PASS",
    expectedReasonContains: "cca_retention_rate",
  },
];
