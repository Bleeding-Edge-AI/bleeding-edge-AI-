-- Migration: Add persistent session tracking
-- Run this in your Supabase SQL Editor

-- 1. Add session_id to messages table (if table exists)
ALTER TABLE IF EXISTS messages 
ADD COLUMN IF NOT EXISTS session_id uuid;

-- 2. Create the tables if they don't exist yet (Safety check)
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  company text,
  status text DEFAULT 'NEW',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid REFERENCES leads(id),
  session_id uuid, -- Crucial for anonymous tracking
  role text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- 3. Create an index on session_id for faster lookups when linking leads
CREATE INDEX IF NOT EXISTS idx_messages_session_id ON messages(session_id);
