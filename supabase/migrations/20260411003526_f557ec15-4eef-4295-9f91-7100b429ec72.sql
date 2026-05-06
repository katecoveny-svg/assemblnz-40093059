-- Add provisioning fields to tenant_intake
ALTER TABLE public.tenant_intake
  ADD COLUMN IF NOT EXISTS auth_user_id uuid,
  ADD COLUMN IF NOT EXISTS magic_link_sent boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS provisioned_at timestamptz;

-- Tenant tool connections
CREATE TABLE IF NOT EXISTS public.tenant_tool_connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
  provider text NOT NULL,
  provider_label text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','connected','error','disconnected')),
  scopes text[],
  metadata jsonb DEFAULT '{}',
  connected_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (tenant_id, provider)
);

ALTER TABLE public.tenant_tool_connections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tenant members can view tool connections"
  ON public.tenant_tool_connections FOR SELECT TO authenticated
  USING (tenant_id IN (SELECT tenant_id FROM public.tenant_members WHERE user_id = auth.uid()));

CREATE POLICY "Tenant admins can manage tool connections"
  ON public.tenant_tool_connections FOR ALL TO authenticated
  USING (tenant_id IN (
    SELECT tenant_id FROM public.tenant_members
    WHERE user_id = auth.uid() AND role IN ('admin','manager')
  ))
  WITH CHECK (tenant_id IN (
    SELECT tenant_id FROM public.tenant_members
    WHERE user_id = auth.uid() AND role IN ('admin','manager')
  ));

CREATE POLICY "Service role manages tool connections"
  ON public.tenant_tool_connections FOR ALL TO service_role
  USING (true) WITH CHECK (true);

CREATE INDEX idx_tool_connections_tenant ON public.tenant_tool_connections(tenant_id);

CREATE TRIGGER update_tool_connections_updated_at
  BEFORE UPDATE ON public.tenant_tool_connections
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Add branding fields to tenants for scraped brand data
ALTER TABLE public.tenants
  ADD COLUMN IF NOT EXISTS logo_url text,
  ADD COLUMN IF NOT EXISTS brand_color text,
  ADD COLUMN IF NOT EXISTS website_url text,
  ADD COLUMN IF NOT EXISTS kete_primary text,
  ADD COLUMN IF NOT EXISTS onboarding_complete boolean DEFAULT false;