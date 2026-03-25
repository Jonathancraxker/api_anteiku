import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://uzpelutnljkkviivfnzk.supabase.co';
const supabaseKey = process.env.API_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6cGVsdXRubGpra3ZpaXZmbnprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzOTcxNjEsImV4cCI6MjA4OTk3MzE2MX0.4vsi2mrQdqQclQRdfoL5TyWBZ7uUBuEq5bhKPC2_xBM';

export const conn = createClient(supabaseUrl, supabaseKey);