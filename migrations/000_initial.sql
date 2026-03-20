-- Migration: Create form_submissions table
-- Description: Stores form submissions with flexible JSON payload for future extensibility

CREATE TABLE IF NOT EXISTS form_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  form_name TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  payload TEXT NOT NULL
);

-- Create index for faster queries by form_name
CREATE INDEX IF NOT EXISTS idx_form_submissions_form_name ON form_submissions(form_name);

-- Create index for faster queries by created_at
CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON form_submissions(created_at);
