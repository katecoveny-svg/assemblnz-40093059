import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import { serve } from "https://deno.land/std@0.208.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

type Kete = "MANAAKI" | "WAIHANGA" | "AUAHA" | "ARATAKI" | "PIKAU" | "TORO";
type ModelChoice = "claude" | "gemini" | "haiku";

interface RoutingDecision {
  requestId: string;
  kete: Kete;
  agent: string;
  model: ModelChoice;
  confidence: number;
  reasoning: string;
}

const INTENT_MAP: Record<string, {
  kete: Kete; agent: string; model: ModelChoice; keywords: string[];
}> = {
  food_safety: {
    kete: "MANAAKI", agent: "aura", model: "claude",
    keywords: ["food", "menu", "allergen", "hygiene", "kitchen", "restaurant", "hotel", "guest", "booking", "reservation", "alcohol", "licence", "bar"],
  },
  construction: {
    kete: "WAIHANGA", agent: "kaupapa", model: "claude",
    keywords: ["building", "consent", "construction", "site", "safety", "scaffold", "excavation", "concrete", "plumbing", "electrical", "lbp", "bim", "payment claim"],
  },
  creative: {
    kete: "AUAHA", agent: "prism", model: "claude",
    keywords: ["brand", "design", "content", "social media", "campaign", "marketing", "logo", "copywrite", "video", "post", "instagram", "tiktok"],
  },
  automotive: {
    kete: "ARATAKI", agent: "fleet_manager", model: "claude",
    keywords: ["vehicle", "fleet", "wof", "cof", "workshop", "maintenance", "driver", "rego", "fuel", "tyre", "service", "odometer"],
  },
  logistics: {
    kete: "PIKAU", agent: "customs_agent", model: "claude",
    keywords: ["import", "export", "customs", "tariff", "freight", "shipping", "biosecurity", "mpi", "dangerous goods", "container", "declaration"],
  },
  family: {
    kete: "TORO", agent: "helm", model: "haiku",
    keywords: ["family", "school", "meal", "trip", "budget", "calendar", "kids", "homework", "doctor", "holiday", "recipe", "grocery"],
  },
};

function selectModel(intent: string, inputLength: number, hasMedia: boolean): ModelChoice {
  if (hasMedia) return "gemini";
  if (inputLength < 50) return "haiku";
  if (["food_safety", "construction", "automotive", "logistics"].includes(intent)) return "claude";
  return "claude";
}

function classifyIntent(userInput: string): { intent: string; confidence: number } {
  const lower = userInput.toLowerCase();
  const scores: Record<string, number> = {};

  for (const [intent, config] of Object.entries(INTENT_MAP)) {
    const matches = config.keywords.filter((kw) => lower.includes(kw));
    scores[intent] = config.keywords.length > 0 ? matches.length / config.keywords.length : 0;
  }

  const sorted = Object.entries(scores).sort(([, a], [, b]) => b - a);
  return {
    intent: sorted[0]?.[0] || "general",
    confidence: sorted[0]?.[1] || 0.3,
  };
}

function getSupabase() {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();
  try {
    const { requestId, userInput, hasMedia = false } = await req.json();

    if (!requestId || !userInput) {
      return new Response(
        JSON.stringify({ error: "requestId and userInput are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { intent, confidence } = classifyIntent(userInput);
    const config = INTENT_MAP[intent] || INTENT_MAP["family"];
    const model = selectModel(intent, userInput.length, hasMedia);

    const decision: RoutingDecision = {
      requestId,
      kete: config.kete,
      agent: config.agent,
      model,
      confidence,
      reasoning: `Intent: ${intent} (${(confidence * 100).toFixed(0)}%) → ${config.kete}/${config.agent} via ${model}`,
    };

    // Log routing decision
    const supabase = getSupabase();
    await supabase.from("routing_log").insert({
      request_id: requestId,
      user_input: userInput.substring(0, 500),
      detected_intent: intent,
      selected_kete: decision.kete,
      selected_agent: decision.agent,
      selected_model: decision.model,
      confidence_score: confidence,
      routing_time_ms: Date.now() - startTime,
    });

    return new Response(
      JSON.stringify({ success: true, routing: decision }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Iho routing error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : String(error) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
