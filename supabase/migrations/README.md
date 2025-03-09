# Database Migrations

This directory contains SQL migrations for the MenuViz application database.

## Applying Migrations

### Option 1: Using Supabase CLI

1. Make sure you have the Supabase CLI installed:
   ```bash
   npm install -g supabase
   ```

2. Start the local Supabase instance:
   ```bash
   supabase start
   ```

3. Apply the migrations:
   ```bash
   supabase db push
   ```

### Option 2: Using the Apply Script

1. Make sure you have the required dependencies:
   ```bash
   npm install dotenv
   ```

2. Set the `SUPABASE_PROJECT_ID` environment variable or add it to your `.env` file.

3. Run the apply script:
   ```bash
   node scripts/apply-migrations.js
   ```

## Migration Files

The migrations are applied in alphabetical order based on the filename. The naming convention is:

```
YYYYMMDD[HHMMSS]_description.sql
```

For example:
- `20240330000000_create_restaurants_table.sql`
- `20240330000001_create_storage_buckets.sql`

## Troubleshooting

If you encounter errors when applying migrations:

1. Check the Supabase logs:
   ```bash
   supabase logs
   ```

2. Reset the database if needed:
   ```bash
   supabase db reset
   ```

3. Verify that your SQL syntax is compatible with PostgreSQL 15. 