-- ============================================================
-- STORAGE RLS POLICIES
-- ============================================================

DO $$
DECLARE
  bucket_name TEXT;
  buckets TEXT[] := ARRAY['hero', 'services', 'realizations', 'articles', 'gallery'];
BEGIN
  FOREACH bucket_name IN ARRAY buckets LOOP
    -- Allow authenticated users to upload
    EXECUTE format('
      CREATE POLICY "authenticated_upload_%s"
      ON storage.objects FOR INSERT
      TO authenticated
      WITH CHECK (bucket_id = %L);
    ', bucket_name, bucket_name);

    -- Allow public read
    EXECUTE format('
      CREATE POLICY "public_read_%s"
      ON storage.objects FOR SELECT
      TO public
      USING (bucket_id = %L);
    ', bucket_name, bucket_name);

    -- Allow authenticated users to delete
    EXECUTE format('
      CREATE POLICY "authenticated_delete_%s"
      ON storage.objects FOR DELETE
      TO authenticated
      USING (bucket_id = %L);
    ', bucket_name, bucket_name);
  END LOOP;
END $$;
