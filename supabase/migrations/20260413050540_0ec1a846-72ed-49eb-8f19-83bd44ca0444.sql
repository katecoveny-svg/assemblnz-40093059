CREATE TABLE public.flint_proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id TEXT NOT NULL,
  region TEXT NOT NULL,
  current_content TEXT DEFAULT '',
  proposed_content TEXT NOT NULL,
  instructions TEXT DEFAULT '',
  seo_target TEXT DEFAULT '',
  verdict TEXT NOT NULL DEFAULT 'pending_review',
  audit_id TEXT,
  guard_details JSONB DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'pending_review',
  reviewed_by UUID REFERENCES auth.users(id),
  review_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.flint_proposals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view flint proposals"
  ON public.flint_proposals FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert flint proposals"
  ON public.flint_proposals FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update flint proposals"
  ON public.flint_proposals FOR UPDATE TO authenticated USING (true);