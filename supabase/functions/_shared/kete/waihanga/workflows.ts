// ═══════════════════════════════════════════════════════════════
// WAIHANGA/KAUPAPA · WORKFLOWS
//   1. payment_claim_check
//   2. retention_compliance_check
//   3. variation_assessment
//   4. programme_review
// ═══════════════════════════════════════════════════════════════
import type { KeteRequest, KahuResult, TaResult, MaharaWrite } from "../pipeline.ts";
import { waihanga_extraHardRules } from "./mana-policy.ts";

type WorkflowOutput = {
  output: string;
  maharaWrites: MaharaWrite[];
  extraHardRules?: typeof waihanga_extraHardRules;
};

export const waihanga_workflows = {
  payment_claim_check: (req: KeteRequest, _kahu: KahuResult, ta: TaResult): WorkflowOutput => {
    const p = req.payload as any;
    const gst = p.claimedAmountNzd * 0.15;
    const totalInclGst = p.claimedAmountNzd + gst;
    const warns = ta.warnings.length ? ta.warnings : ["none"];
    const out =
      `PAYMENT CLAIM REVIEW — DRAFT (CCA 2002 compliance check)\n` +
      `Project: ${p.projectId}\n` +
      `Claim date: ${p.claimDate}\n` +
      `Claimed amount (excl GST): NZ$${p.claimedAmountNzd.toLocaleString()}\n` +
      `GST (15%): NZ$${gst.toFixed(2)}\n` +
      `Total (incl GST): NZ$${totalInclGst.toFixed(2)}\n` +
      `Form 1 compliant: ${p.ccaForm1 ? "Yes" : "NO — REQUIRED"}\n` +
      `Warnings: ${warns.join(" | ")}\n` +
      `\n— Draft review only. Awaiting project manager sign-off before submission. ` +
      `Kaupapa does not submit or authorise payment claims.`;
    return {
      output: out,
      maharaWrites: [{
        table: "waihanga_payment_claims",
        row: {
          tenant_id: req.tenantId,
          project_id: p.projectId,
          claimed_amount_nzd: p.claimedAmountNzd,
          gst_nzd: Number(gst.toFixed(2)),
          total_incl_gst_nzd: Number(totalInclGst.toFixed(2)),
          cca_form1: p.ccaForm1,
          status: ta.passed ? "review_ready" : "blocked",
          ta_warnings: ta.warnings,
          created_at: new Date().toISOString(),
        },
      }],
      extraHardRules: waihanga_extraHardRules,
    };
  },

  retention_compliance_check: (req: KeteRequest, _kahu: KahuResult, ta: TaResult): WorkflowOutput => {
    const p = req.payload as any;
    const warns = ta.warnings.length ? ta.warnings : ["none"];
    const out =
      `RETENTION MONEY COMPLIANCE CHECK — DRAFT\n` +
      `Project: ${p.projectId}\n` +
      `Subcontractor: ${p.subcontractorName || "not specified"}\n` +
      `Retention held: NZ$${p.retentionAmountNzd.toLocaleString()}\n` +
      `Held in compliant trust: ${p.heldInTrust ? "Yes" : "NO — NON-COMPLIANT"}\n` +
      `Trust account ref: ${p.trustAccountRef || "not provided"}\n` +
      `Release milestone: ${p.releaseMilestone || "not specified"}\n` +
      `Warnings: ${warns.join(" | ")}\n` +
      `\nCCA 2002 s.18C–18I — since 5 October 2023, retention money must be held ` +
      `in a compliant trust account. Directors are personally liable for non-compliance.\n` +
      `\n— Compliance check only. Kaupapa does not hold, release, or transfer retention money.`;
    return {
      output: out,
      maharaWrites: [{
        table: "waihanga_retention",
        row: {
          tenant_id: req.tenantId,
          project_id: p.projectId,
          subcontractor_name: p.subcontractorName || null,
          retention_amount_nzd: p.retentionAmountNzd,
          held_in_trust: p.heldInTrust,
          trust_account_ref: p.trustAccountRef || null,
          compliant: p.heldInTrust === true,
          status: ta.passed ? "compliant" : "non_compliant",
          created_at: new Date().toISOString(),
        },
      }],
      extraHardRules: waihanga_extraHardRules,
    };
  },

  variation_assessment: (req: KeteRequest, _kahu: KahuResult, ta: TaResult): WorkflowOutput => {
    const p = req.payload as any;
    const warns = ta.warnings.length ? ta.warnings : ["none"];
    const out =
      `VARIATION ASSESSMENT — DRAFT\n` +
      `Project: ${p.projectId}\n` +
      `Description: ${p.variationDescription}\n` +
      `Instructed by: ${p.instructedBy}\n` +
      `Cost impact: NZ$${p.costImpactNzd.toLocaleString()}\n` +
      `Programme impact: ${p.programmeImpactDays ? p.programmeImpactDays + " working days" : "nil"}\n` +
      `Documented before execution: ${p.documentedBeforeExecution !== false ? "Yes" : "NO — get written instruction"}\n` +
      `Status: ${p.variationStatus || "pending"}\n` +
      `Warnings: ${warns.join(" | ")}\n` +
      `\n— Assessment only. Kaupapa does not approve or decline variations. ` +
      `Follow contract variation procedure (NZS 3910 cl 9 / NZS 3916 cl 9).`;
    return {
      output: out,
      maharaWrites: [{
        table: "waihanga_variations",
        row: {
          tenant_id: req.tenantId,
          project_id: p.projectId,
          description: p.variationDescription,
          instructed_by: p.instructedBy,
          cost_impact_nzd: p.costImpactNzd,
          programme_impact_days: p.programmeImpactDays || 0,
          documented: p.documentedBeforeExecution !== false,
          status: p.variationStatus || "pending",
          created_at: new Date().toISOString(),
        },
      }],
      extraHardRules: waihanga_extraHardRules,
    };
  },

  programme_review: (req: KeteRequest, _kahu: KahuResult, ta: TaResult): WorkflowOutput => {
    const p = req.payload as any;
    const activities = p.activities as any[];
    const criticalCount = activities.filter((a: any) => a.onCriticalPath).length;
    const delayedCount = activities.filter((a: any) => a.delayDays && a.delayDays > 0).length;
    const warns = ta.warnings.length ? ta.warnings : ["none"];
    const out =
      `PROGRAMME REVIEW — ${p.projectName}\n` +
      `Project: ${p.projectId}\n` +
      `Total activities: ${activities.length}\n` +
      `Critical-path activities: ${criticalCount}\n` +
      `Delayed activities: ${delayedCount}\n` +
      `Critical-path delay: ${p.criticalPathDelayDays || 0} working days\n` +
      `SPI: ${p.spiValue || "not calculated"}\n` +
      `CPI: ${p.cpiValue || "not calculated"}\n` +
      `Warnings: ${warns.join(" | ")}\n` +
      `\n— Programme review only. Kaupapa does not commit to programme dates ` +
      `or grant extensions of time.`;
    return {
      output: out,
      maharaWrites: [{
        table: "waihanga_programme_reviews",
        row: {
          tenant_id: req.tenantId,
          project_id: p.projectId,
          project_name: p.projectName,
          total_activities: activities.length,
          critical_path_count: criticalCount,
          delayed_count: delayedCount,
          critical_path_delay_days: p.criticalPathDelayDays || 0,
          status: "reviewed",
          created_at: new Date().toISOString(),
        },
      }],
      extraHardRules: waihanga_extraHardRules,
    };
  },
};
