
-- Step 1: Add full-text search column
ALTER TABLE conversation_summaries 
ADD COLUMN fts tsvector GENERATED ALWAYS AS (
  to_tsvector('english', coalesce(summary, ''))
) STORED;

CREATE INDEX idx_conv_summaries_fts ON conversation_summaries USING gin(fts);

-- Step 2: Add lineage tracking
ALTER TABLE conversation_summaries 
ADD COLUMN parent_summary_id UUID REFERENCES conversation_summaries(id),
ADD COLUMN compression_level INTEGER DEFAULT 0,
ADD COLUMN original_message_count INTEGER;

-- Step 3: Search function any agent can call
CREATE OR REPLACE FUNCTION public.search_memory(
  p_user_id UUID,
  p_query TEXT,
  p_agent_id TEXT DEFAULT NULL,
  p_limit INTEGER DEFAULT 5
)
RETURNS TABLE(
  agent_id TEXT,
  summary TEXT,
  key_facts JSONB,
  created_at TIMESTAMPTZ,
  rank REAL
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    cs.agent_id,
    cs.summary,
    cs.key_facts_extracted,
    cs.created_at,
    ts_rank(cs.fts, websearch_to_tsquery('english', p_query)) AS rank
  FROM conversation_summaries cs
  WHERE cs.user_id = p_user_id
    AND cs.fts @@ websearch_to_tsquery('english', p_query)
    AND (p_agent_id IS NULL OR cs.agent_id = p_agent_id)
  ORDER BY rank DESC
  LIMIT p_limit;
$$;
