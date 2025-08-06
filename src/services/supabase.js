import { createClient } from "@supabase/supabase-js";

const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zcmZ3amxxb3RqcWh0cmx4ZGdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0NjI2NDUsImV4cCI6MjA3MDAzODY0NX0.aIy_vpgGl2QuR4q3yJ984q397a4TcXA9Hbk7PQBPKo4";

export const SUPABASE_URL = "https://nsrfwjlqotjqhtrlxdga.supabase.co";
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
