-- =========================================
-- STORAGE POLICIES for bucket 'media'
-- =========================================

CREATE POLICY "insert_media_objects_auth"
  ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'media');

CREATE POLICY "update_media_objects_auth"
  ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'media') WITH CHECK (bucket_id = 'media');

CREATE POLICY "delete_media_objects_auth"
  ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'media');
  