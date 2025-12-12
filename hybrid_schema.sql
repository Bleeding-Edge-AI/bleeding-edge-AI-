-- Migration: Hybrid Lead Capture (JSONB Transcript)
-- Run this in Supabase SQL Editor

-- 1. Drop the old relational messages table
DROP TABLE IF EXISTS messages;

-- 2. Refactor 'leads' table
-- We will recreate it to ensure cleaner schema, but IF you wanted to keep data you would ALTER.
-- Assuming we can start fresh for this new architecture:
DROP TABLE IF EXISTS leads;

CREATE TABLE leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  transcript jsonb DEFAULT '[]'::jsonb,
  email text,
  name text,
  company text,
  service_requested text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 3. Enable extensions if needed
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; 
