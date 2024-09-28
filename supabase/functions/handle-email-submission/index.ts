import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  console.log('Function invoked');

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('Parsing request body');
    const { email } = await req.json()
    console.log('Received email:', email);

    const clientIp = req.headers.get('x-forwarded-for') || 'unknown'
    console.log('Client IP:', clientIp);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Missing environment variables');
      throw new Error('Missing environment variables')
    }

    console.log('Creating Supabase client');
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    console.log('Calling handle_email_submission RPC');
    const { data, error } = await supabase
      .rpc('handle_email_submission', { p_email: email, p_ip_address: clientIp })

    if (error) {
      console.error('Error calling handle_email_submission:', error);
      throw error
    }

    console.log('RPC response:', data);

    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    console.error('Unhandled error:', error);
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
