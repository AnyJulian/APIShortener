import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  // The path to the directory where the generated files will be placed
  out: './drizzle',
  // The path to the directory where the schema files are located
  schema: './server/database/schema/',
  
  // The path to the directory where the queries are located
  dialect: 'postgresql',
  
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
