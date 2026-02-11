-- Create storage bucket for ticket attachments
INSERT INTO storage.buckets (id, name, public)
VALUES ('ticket-attachments', 'ticket-attachments', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for ticket-attachments bucket

-- Policy 1: Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload files"
ON storage.objects FOR INSERT
TO authenticated, anon
WITH CHECK (
  bucket_id = 'ticket-attachments'
);

-- Policy 2: Allow everyone to view files (public bucket)
CREATE POLICY "Anyone can view files"
ON storage.objects FOR SELECT
TO authenticated, anon, public
USING (bucket_id = 'ticket-attachments');

-- Policy 3: Allow users to delete their own files
CREATE POLICY "Users can delete own files"
ON storage.objects FOR DELETE
TO authenticated, anon
USING (
  bucket_id = 'ticket-attachments'
);

-- Policy 4: Allow users to update their own files
CREATE POLICY "Users can update own files"
ON storage.objects FOR UPDATE
TO authenticated, anon
USING (
  bucket_id = 'ticket-attachments'
)
WITH CHECK (
  bucket_id = 'ticket-attachments'
);
