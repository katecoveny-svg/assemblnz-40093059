// ═══════════════════════════════════════════════════════════════
// WAIHANGA/KAUPAPA · KAHU — input validation for construction PM
// ═══════════════════════════════════════════════════════════════
import type { KeteRequest } from "../pipeline.ts";

export function waihanga_validate(req: KeteRequest): string[] {
  const errs: string[] = [];
  const p = req.payload as Record<string, any>;

  switch (req.workflow) {
    case "payment_claim_check":
      if (!p.projectId) errs.push("project_id_required");
      if (typeof p.claimedAmountNzd !== "number" || p.claimedAmountNzd <= 0)
        errs.push("claimed_amount_invalid");
      if (!p.claimDate || isNaN(Date.parse(p.claimDate)))
        errs.push("claim_date_invalid");
      if (typeof p.ccaForm1 !== "boolean")
        errs.push("cca_form1_flag_required");
      break;

    case "retention_compliance_check":
      if (!p.projectId) errs.push("project_id_required");
      if (typeof p.retentionAmountNzd !== "number" || p.retentionAmountNzd < 0)
        errs.push("retention_amount_invalid");
      if (typeof p.heldInTrust !== "boolean")
        errs.push("held_in_trust_flag_required");
      break;

    case "variation_assessment":
      if (!p.projectId) errs.push("project_id_required");
      if (!p.variationDescription || typeof p.variationDescription !== "string")
        errs.push("variation_description_required");
      if (typeof p.costImpactNzd !== "number")
        errs.push("cost_impact_required");
      if (!p.instructedBy) errs.push("instructed_by_required");
      break;

    case "programme_review":
      if (!p.projectId) errs.push("project_id_required");
      if (!p.projectName) errs.push("project_name_required");
      if (!Array.isArray(p.activities) || p.activities.length === 0)
        errs.push("activities_required");
      break;

    default:
      errs.push(`unknown_workflow:${req.workflow}`);
  }
  return errs;
}
