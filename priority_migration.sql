-- Migration to change priority values from French to English
-- This script updates the tickets table to use English priority values

-- Pre-migration check: Surface any unexpected priority values
-- Run this query to identify values that won't be mapped:
-- SELECT DISTINCT priority FROM tickets WHERE priority IS NOT NULL AND priority != '';

-- Execute migration in a transaction with error handling
DO $$
BEGIN
    -- Step 1: Drop the existing check constraint (ignore if it doesn't exist)
    ALTER TABLE tickets DROP CONSTRAINT IF EXISTS tickets_priority_check;

    -- Step 2: Update existing data from French to English
    UPDATE tickets SET priority = 'low' WHERE priority = 'Faible';
    UPDATE tickets SET priority = 'normal' WHERE priority = 'Normale';
    UPDATE tickets SET priority = 'high' WHERE priority = 'Élevée';
    UPDATE tickets SET priority = 'urgent' WHERE priority = 'Urgente';

    -- Fallback: Set any unmapped values (including NULLs and empty strings) to 'normal'
    UPDATE tickets SET priority = 'normal'
    WHERE priority NOT IN ('low', 'normal', 'high', 'urgent')
       OR priority IS NULL
       OR priority = '';

    -- Step 3: Add new check constraint with English values
    ALTER TABLE tickets ADD CONSTRAINT tickets_priority_check
        CHECK (priority IN ('low', 'normal', 'high', 'urgent'));

    -- Step 4: Update the default value to English
    ALTER TABLE tickets ALTER COLUMN priority SET DEFAULT 'normal';

    RAISE NOTICE 'Migration completed successfully';
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Migration failed: %', SQLERRM;
END $$;

-- Step 5: Verify the changes
-- You can run this query to check the updated priorities:
-- SELECT priority, COUNT(*) FROM tickets GROUP BY priority;