-- ==============================================
-- Migration: media constraints & storage setup
-- ==============================================

-- 1. Unique constraints per cover e icon
CREATE UNIQUE INDEX IF NOT EXISTS uq_media_single_cover
  ON media_assets (owner_type, owner_id)
  WHERE kind = 'cover';

CREATE UNIQUE INDEX IF NOT EXISTS uq_media_single_icon
  ON media_assets (owner_type, owner_id)
  WHERE kind = 'icon';

-- 2. Check di validità base
ALTER TABLE media_assets
ADD CONSTRAINT chk_media_owner_type_valid
CHECK (
  owner_type IN ('project', 'experience', 'skill')
);

ALTER TABLE media_assets
ADD CONSTRAINT chk_media_kind_valid
CHECK (
  kind IN ('cover', 'gallery', 'icon', 'other')
);

-- 3. (Facoltativo) crea bucket storage
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;
