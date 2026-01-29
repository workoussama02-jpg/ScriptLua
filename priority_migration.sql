-- Migration to change priority values from French to English
-- This script updates the tickets table to use English priority values

-- Step 1: Drop the existing check constraint (ignore if it doesn't exist)
ALTER TABLE tickets DROP CONSTRAINT IF EXISTS tickets_priority_check;

-- Step 2: Update existing data from French to English
UPDATE tickets SET priority = 'low' WHERE priority = 'Faible';
UPDATE tickets SET priority = 'normal' WHERE priority = 'Normale';
UPDATE tickets SET priority = 'high' WHERE priority = 'Élevée';
UPDATE tickets SET priority = 'urgent' WHERE priority = 'Urgente';

-- Step 3: Add new check constraint with English values
ALTER TABLE tickets ADD CONSTRAINT tickets_priority_check
    CHECK (priority IN ('low', 'normal', 'high', 'urgent'));

-- Step 4: Update the default value to English
ALTER TABLE tickets ALTER COLUMN priority SET DEFAULT 'normal';

-- Step 5: Verify the changes
-- You can run this query to check the updated priorities:
-- SELECT priority, COUNT(*) FROM tickets GROUP BY priority;