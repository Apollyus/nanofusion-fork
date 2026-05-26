
-- Strip HTML from all bot_knowledge content
UPDATE bot_knowledge
SET content = regexp_replace(content, '<[^>]*>', '', 'g')
WHERE category = 'předdefinované' OR category = 'služby';

-- Also set some initial greeting buttons if they don't exist
INSERT INTO bot_knowledge (title, content, category, is_active)
VALUES ('GREETING_BUTTONS', 'Čištění střechy, Čištění fasády, Solární panely, Kalkulačka ceny', 'předdefinované', true)
ON CONFLICT (title) DO UPDATE SET content = EXCLUDED.content;
