-- Migration: Add optional video_url column to services table
ALTER TABLE services ADD COLUMN IF NOT EXISTS video_url text;
