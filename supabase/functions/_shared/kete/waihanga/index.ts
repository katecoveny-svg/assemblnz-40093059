// Waihanga/Kaupapa kete entry point — assembled for the iho-router and the sim runner
import type { KeteDefinition } from "../pipeline.ts";
import { waihanga_validate } from "./kahu.ts";
import { waihanga_taRules } from "./ta-rules.ts";
import { waihanga_workflows } from "./workflows.ts";

export const waihanga: KeteDefinition = {
  name: "WAIHANGA",
  validator: waihanga_validate,
  taRules: waihanga_taRules,
  workflows: waihanga_workflows,
};
