import { createClient } from '@supabase/supabase-js';

const url = 'https://omkrnxtnsuudcciprlow.supabase.co';
const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ta3JueHRuc3V1ZGNjaXBybG93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1OTMwNTksImV4cCI6MjA5MzE2OTA1OX0.1iR7j0pgQjPa7mbam8KhKlNkARHU3zDEmNyfoWefmGA';

export const supabase = createClient(url, anonKey, {
  db: { schema: 'spare_registration' },
});
