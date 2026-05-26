-- ============================================================
-- 007 — Gallery Albums
-- Additive migration: no existing data is touched.
-- gallery_items stay untouched; new nullable album_id FK is added.
-- ============================================================

-- 1. Create gallery_albums table
CREATE TABLE IF NOT EXISTS public.gallery_albums (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    title       TEXT        NOT NULL,
    caption     TEXT,
    order_index INT         NOT NULL DEFAULT 0,
    is_active   BOOLEAN     NOT NULL DEFAULT true,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Add album_id to gallery_items (nullable = existing rows unaffected)
ALTER TABLE public.gallery_items
    ADD COLUMN IF NOT EXISTS album_id UUID
        REFERENCES public.gallery_albums(id) ON DELETE CASCADE;

-- Index for JOIN performance
CREATE INDEX IF NOT EXISTS idx_gallery_items_album_id
    ON public.gallery_items(album_id);

-- 3. RLS on gallery_albums
ALTER TABLE public.gallery_albums ENABLE ROW LEVEL SECURITY;

-- Admin/editor: full access
DROP POLICY IF EXISTS "admin_editor_all_gallery_albums" ON public.gallery_albums;
CREATE POLICY "admin_editor_all_gallery_albums" ON public.gallery_albums
    FOR ALL TO authenticated
    USING   (is_admin_or_editor())
    WITH CHECK (is_admin_or_editor());

-- Public: read active albums only
DROP POLICY IF EXISTS "public_read_gallery_albums" ON public.gallery_albums;
CREATE POLICY "public_read_gallery_albums" ON public.gallery_albums
    FOR SELECT USING (is_active = true);

-- 4. Allow public to also read gallery_items that belong to an active album
--    (current policy only allows is_active = true; album photos have is_active = true by default)
--    No change needed — album photos are inserted with is_active = true.
--    The existing "public_read_gallery_items" policy (is_active = true) covers them.

-- DONE. Run NOTIFY to confirm:
DO $$ BEGIN RAISE NOTICE 'Migration 007_gallery_albums applied successfully.'; END $$;
