
-- ════════════════════════════════════════════════
-- TĀ: approval_queue
-- ════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.approval_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID NOT NULL,
  action_type TEXT NOT NULL,
  kete TEXT NOT NULL,
  context JSONB NOT NULL DEFAULT '{}',
  status TEXT DEFAULT 'pending',
  requested_by TEXT,
  approved_by TEXT,
  requested_at TIMESTAMPTZ DEFAULT NOW(),
  decided_at TIMESTAMPTZ,
  decision_reason TEXT,
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '7 days')
);

CREATE OR REPLACE FUNCTION public.validate_approval_status()
  RETURNS trigger LANGUAGE plpgsql SET search_path = 'public' AS $$
BEGIN
  IF NEW.status NOT IN ('pending', 'approved', 'rejected', 'expired') THEN
    RAISE EXCEPTION 'status must be pending, approved, rejected, or expired';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_validate_approval_status
  BEFORE INSERT OR UPDATE ON public.approval_queue
  FOR EACH ROW EXECUTE FUNCTION public.validate_approval_status();

CREATE INDEX IF NOT EXISTS idx_approval_status ON public.approval_queue(status);
CREATE INDEX IF NOT EXISTS idx_approval_request ON public.approval_queue(request_id);

ALTER TABLE public.approval_queue ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access on approval_queue"
  ON public.approval_queue FOR ALL TO service_role
  USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can read approval_queue"
  ON public.approval_queue FOR SELECT TO authenticated
  USING (true);

-- ════════════════════════════════════════════════
-- TĀ: pipeline_audit_logs (distinct from existing audit_log)
-- ════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.pipeline_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID NOT NULL,
  user_id TEXT,
  kete TEXT NOT NULL,
  action_type TEXT NOT NULL,
  step TEXT NOT NULL,
  status TEXT NOT NULL,
  details JSONB,
  hash_prev TEXT,
  hash_current TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_paudit_request ON public.pipeline_audit_logs(request_id);
CREATE INDEX IF NOT EXISTS idx_paudit_kete ON public.pipeline_audit_logs(kete);
CREATE INDEX IF NOT EXISTS idx_paudit_time ON public.pipeline_audit_logs(created_at DESC);

ALTER TABLE public.pipeline_audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access on pipeline_audit_logs"
  ON public.pipeline_audit_logs FOR ALL TO service_role
  USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can read pipeline_audit_logs"
  ON public.pipeline_audit_logs FOR SELECT TO authenticated
  USING (true);

-- ════════════════════════════════════════════════
-- MANA: evidence_packs
-- ════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.evidence_packs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID NOT NULL,
  user_id TEXT NOT NULL,
  kete TEXT NOT NULL,
  action_type TEXT NOT NULL,
  evidence_json JSONB NOT NULL DEFAULT '{}',
  watermark TEXT NOT NULL,
  signed_by TEXT,
  signed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_evidence_request ON public.evidence_packs(request_id);
CREATE INDEX IF NOT EXISTS idx_evidence_kete ON public.evidence_packs(kete);

ALTER TABLE public.evidence_packs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access on evidence_packs"
  ON public.evidence_packs FOR ALL TO service_role
  USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can read evidence_packs"
  ON public.evidence_packs FOR SELECT TO authenticated
  USING (true);

-- ════════════════════════════════════════════════
-- MANA: explanation_objects
-- ════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.explanation_objects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID NOT NULL,
  action TEXT NOT NULL,
  reasoning TEXT NOT NULL,
  sources TEXT[] DEFAULT '{}',
  confidence FLOAT,
  regulations TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_explanation_request ON public.explanation_objects(request_id);

ALTER TABLE public.explanation_objects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access on explanation_objects"
  ON public.explanation_objects FOR ALL TO service_role
  USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can read explanation_objects"
  ON public.explanation_objects FOR SELECT TO authenticated
  USING (true);
