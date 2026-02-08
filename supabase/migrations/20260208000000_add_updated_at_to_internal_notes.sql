-- Add updated_at column to internal_notes table
ALTER TABLE internal_notes ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Create a trigger to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create the trigger
DROP TRIGGER IF EXISTS update_internal_notes_updated_at ON internal_notes;
CREATE TRIGGER update_internal_notes_updated_at
    BEFORE UPDATE ON internal_notes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();