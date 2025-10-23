-- =========================================
-- RLS & Policies
-- =========================================

-- 1) Abilita RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;

-- 2) Lettura pubblica (solo contenuti pubblicati)
-- projects: visibili solo se published + public
CREATE POLICY "read_public_projects"
  ON public.projects
  FOR SELECT
  USING (status = 'published' AND visibility = 'public');

-- skills: visibili solo se published
CREATE POLICY "read_public_skills"
  ON public.skills
  FOR SELECT
  USING (status = 'published');

-- experiences: visibili solo se published
CREATE POLICY "read_public_experiences"
  ON public.experiences
  FOR SELECT
  USING (status = 'published');

-- media_assets: lettura sempre consentita (bucket 'media' è pubblico)
-- Se preferisci legare alla pubblicazione dell'owner, vedi la variante sotto.
CREATE POLICY "read_public_media_assets"
  ON public.media_assets
  FOR SELECT
  USING (true);

-- 3) Scritture: SOLO utenti autenticati (puoi raffinare in futuro)
CREATE POLICY "write_projects_auth"
  ON public.projects
  FOR INSERT TO authenticated
  WITH CHECK (true);
CREATE POLICY "update_projects_auth"
  ON public.projects
  FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "write_skills_auth"
  ON public.skills
  FOR INSERT TO authenticated
  WITH CHECK (true);
CREATE POLICY "update_skills_auth"
  ON public.skills
  FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "write_experiences_auth"
  ON public.experiences
  FOR INSERT TO authenticated
  WITH CHECK (true);
CREATE POLICY "update_experiences_auth"
  ON public.experiences
  FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "write_media_assets_auth"
  ON public.media_assets
  FOR INSERT TO authenticated
  WITH CHECK (true);
CREATE POLICY "update_media_assets_auth"
  ON public.media_assets
  FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

-- (Opzionale) Variante media più restrittiva:
-- consenti SELECT solo se l'owner è pubblicato + pubblico (per projects).
-- ATTENZIONE: query più costose.
-- DROP POLICY IF EXISTS "read_public_media_assets" ON public.media_assets;
-- CREATE POLICY "read_media_if_owner_published"
--   ON public.media_assets
--   FOR SELECT
--   USING (
--     CASE owner_type
--       WHEN 'project' THEN EXISTS (
--         SELECT 1 FROM public.projects p
--         WHERE p.id = media_assets.owner_id
--           AND p.status = 'published'
--           AND p.visibility = 'public'
--       )
--       WHEN 'experience' THEN EXISTS (
--         SELECT 1 FROM public.experiences e
--         WHERE e.id = media_assets.owner_id
--           AND e.status = 'published'
--       )
--       WHEN 'skill' THEN EXISTS (
--         SELECT 1 FROM public.skills s
--         WHERE s.id = media_assets.owner_id
--           AND s.status = 'published'
--       )
--     END
--   );
