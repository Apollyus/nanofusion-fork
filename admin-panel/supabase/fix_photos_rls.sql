-- Ensure public read access to realization_photos
DO $$ 
BEGIN
  -- Enable RLS
  ALTER TABLE realization_photos ENABLE ROW LEVEL SECURITY;

  -- Create public select policy if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'realization_photos' 
    AND policyname = 'Public read access for realization_photos'
  ) THEN
    CREATE POLICY "Public read access for realization_photos" 
    ON realization_photos FOR SELECT 
    USING (true);
  END IF;

  -- Ensure admins can do everything
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'realization_photos' 
    AND policyname = 'Service role full access for realization_photos'
  ) THEN
    CREATE POLICY "Service role full access for realization_photos" 
    ON realization_photos FOR ALL 
    USING (true) 
    WITH CHECK (true);
  END IF;
END $$;
