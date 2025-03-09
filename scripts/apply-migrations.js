#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Get the Supabase project ID from the environment or .env file
require('dotenv').config();
const SUPABASE_PROJECT_ID = process.env.SUPABASE_PROJECT_ID;

if (!SUPABASE_PROJECT_ID) {
  console.error('Error: SUPABASE_PROJECT_ID environment variable is not set');
  process.exit(1);
}

// Path to migrations directory
const migrationsDir = path.join(__dirname, '..', 'supabase', 'migrations');

// Get all migration files
const migrationFiles = fs.readdirSync(migrationsDir)
  .filter(file => file.endsWith('.sql'))
  .sort();

console.log('Applying migrations...');

// Apply each migration
migrationFiles.forEach(file => {
  const migrationPath = path.join(migrationsDir, file);
  console.log(`Applying migration: ${file}`);
  
  try {
    // Read the migration file
    const migration = fs.readFileSync(migrationPath, 'utf8');
    
    // Apply the migration using Supabase CLI
    execSync(`supabase db push --db-url postgresql://postgres:postgres@localhost:54322/postgres`, {
      stdio: 'inherit',
    });
    
    console.log(`Successfully applied migration: ${file}`);
  } catch (error) {
    console.error(`Error applying migration ${file}:`, error.message);
    process.exit(1);
  }
});

console.log('All migrations applied successfully!'); 