import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import { serve } from "https://deno.land/std@0.208.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface PolicyRule {
  id: string;
  legislation_code: string;
  legislation_title: string;
  section?: string;
  rule_text: string;
  applicable_kete: string[];
  applicable_action_types: string[];
  policy_type: "allowed" | "approval_required" | "forbidden";
  conditions?: Record<string, unknown>;
  severity: "low" | "medium" | "high" | "critical";
}

interface KahuRequest {
  action: "ingest_legislation" | "get_applicable_rules" | "check_compliance";
  legislationCode?: string;
  rules?: Partial<PolicyRule>[];
  kete?: string;
  actionType?: string;
  context?: Record<string, unknown>;
}

const NZ_LEGISLATION: Record<string, { title: string; ipp_count?: number }> = {
  NZPA2020: { title: "Privacy Act 2020", ipp_count: 13 },
  FA2014:   { title: "Food Act 2014" },
  BA2004:   { title: "Building Act 2004" },
  HSWA2015: { title: "Health and Safety at Work Act 2015" },
  SSAA2012: { title: "Sale and Supply of Alcohol Act 2012" },
  CCA2002:  { title: "Construction Contracts Act 2002" },
  CEA2018:  { title: "Customs and Excise Act 2018" },
  BIOS1993: { title: "Biosecurity Act 1993" },
  HSNO1996: { title: "Hazardous Substances and New Organisms Act 1996" },
  FTA1986:  { title: "Fair Trading Act 1986" },
  CGA1993:  { title: "Consumer Guarantees Act 1993" },
  CA1994:   { title: "Copyright Act 1994" },
  ERA2000:  { title: "Employment Relations Act 2000" },
  HA2003:   { title: "Holidays Act 2003" },
};

function getSupabase() {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );
}

async function getApplicableRules(
  kete: string,
  actionType: string,
  context?: Record<string, unknown>
): Promise<{ rules: PolicyRule[]; error?: string }> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("policy_rules")
      .select("*")
      .contains("applicable_kete", [kete])
      .contains("applicable_action_types", [actionType]);

    if (error) return { rules: [], error: error.message };

    let rules = (data || []) as PolicyRule[];
    if (context) {
      rules = rules.filter((rule) => {
        if (!rule.conditions) return true;
        return Object.entries(rule.conditions).every(
          ([key, value]) => context[key] === value
        );
      });
    }

    const priority: Record<string, number> = { forbidden: 0, approval_required: 1, allowed: 2 };
    rules.sort((a, b) => (priority[a.policy_type] ?? 9) - (priority[b.policy_type] ?? 9));

    return { rules };
  } catch (err) {
    return { rules: [], error: err instanceof Error ? err.message : String(err) };
  }
}

async function checkCompliance(
  kete: string,
  actionType: string,
  context?: Record<string, unknown>
): Promise<{
  decision: "allowed" | "approval_required" | "forbidden";
  rules: PolicyRule[];
  reasoning: string;
}> {
  const { rules } = await getApplicableRules(kete, actionType, context);

  const hasForbidden = rules.some((r) => r.policy_type === "forbidden");
  const hasApproval = rules.some((r) => r.policy_type === "approval_required");

  const decision = hasForbidden
    ? "forbidden"
    : hasApproval
      ? "approval_required"
      : "allowed";

  const reasoning = hasForbidden
    ? `Action blocked: ${rules.filter((r) => r.policy_type === "forbidden").map((r) => r.legislation_title + " s" + r.section).join(", ")}`
    : hasApproval
      ? `Approval required under: ${rules.filter((r) => r.policy_type === "approval_required").map((r) => r.legislation_title + " s" + r.section).join(", ")}`
      : "Action complies with all applicable NZ regulations";

  return { decision, rules, reasoning };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body: KahuRequest = await req.json();

    if (body.action === "get_applicable_rules") {
      if (!body.kete || !body.actionType) {
        return new Response(
          JSON.stringify({ error: "kete and actionType are required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const result = await getApplicableRules(body.kete, body.actionType, body.context);
      return new Response(
        JSON.stringify({ success: !result.error, rules: result.rules, count: result.rules.length, error: result.error }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (body.action === "check_compliance") {
      if (!body.kete || !body.actionType) {
        return new Response(
          JSON.stringify({ error: "kete and actionType are required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const result = await checkCompliance(body.kete, body.actionType, body.context);
      return new Response(
        JSON.stringify({ success: true, decision: result.decision, rules: result.rules, reasoning: result.reasoning }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (body.action === "ingest_legislation") {
      const supabase = getSupabase();
      const { error } = await supabase
        .from("policy_rules")
        .upsert(body.rules || [], { onConflict: "legislation_code,section,rule_text" });
      return new Response(
        JSON.stringify({ success: !error, ingested: body.rules?.length || 0, error: error?.message }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: "Unknown action. Use: ingest_legislation, get_applicable_rules, check_compliance" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Kahu error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : String(error) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
