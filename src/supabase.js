import { createClient } from "@supabase/supabase-js";

// Usa le credenziali ottenute da Supabase
const supabase = createClient(
  "https://uzyvkffwfdmvnygloosa.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6eXZrZmZ3ZmRtdm55Z2xvb3NhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwNDY3NDMsImV4cCI6MjA1OTYyMjc0M30.wJitzk-3lqQQLsYUBLybtObdgWw_SWw-e-sw8Dr_BDA"
);

export default supabase;
