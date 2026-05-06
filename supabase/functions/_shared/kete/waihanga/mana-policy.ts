// ═══════════════════════════════════════════════════════════════
// WAIHANGA/KAUPAPA · MANA — egress policy (extra hard rules)
// ═══════════════════════════════════════════════════════════════
export const waihanga_extraHardRules = [
  { id: "kaupapa_no_payment_authorise",   re: /\b(authoris|approv)(e|ed|ing)\b.*\b(payment|claim|invoice)\b/i },
  { id: "kaupapa_no_contract_sign",       re: /\b(sign|execut)(e|ed|ing)\b.*\b(contract|agreement|subcontract)\b/i },
  { id: "kaupapa_no_adjudication_file",   re: /\b(filed?|submitted?|lodged?)\b.*\badjudication\b/i },
  { id: "kaupapa_no_pc_certify",          re: /\b(certif)(y|ied|ying)\b.*\b(practical completion|defects liability)\b/i },
  { id: "kaupapa_no_payment_schedule_issue", re: /\b(issued?|served?)\b.*\bpayment schedule\b/i },
  { id: "kaupapa_no_lbp_claim",           re: /\bI am\b.*\blicensed building practitioner\b/i },
];
