import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/../utils/supabase/client'
import isEmail from 'validator/lib/isEmail'
import { EmailSubmission, ApiResponse } from './types'

// Specify the database schema type
type Database = {
  public: {
    Tables: {
      email_submissions: {
        Row: EmailSubmission;
        Insert: Omit<EmailSubmission, 'id'>;
        Update: Partial<Omit<EmailSubmission, 'id'>>;
      };
    };
  };
};

const supabase = createClient();
const isSpam = (submissionCount: number, lastSubmissionDate: string): boolean => {
  const timeSinceLastSubmission = Date.now() - new Date(lastSubmissionDate).getTime();
  const hoursSinceLastSubmission = timeSinceLastSubmission / (1000 * 60 * 60);

  return submissionCount > 5 && hoursSinceLastSubmission < 24;
};

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  const { email } = await request.json();
  const ipAddress = request.ip || request.headers.get('x-forwarded-for') || '';

  if (!isEmail(email)) {
    return NextResponse.json({ success: false, error: 'Invalid email address' }, { status: 400 });
  }

  try {
    let { data, error } = await supabase
      .from('email_submissions')
      .select('*')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    let submissionCount = 1;
    let lastSubmissionDate = new Date().toISOString();

    if (data) {
      submissionCount = data.submission_count + 1;
      lastSubmissionDate = data.last_submission_date;
    }

    const isSpamSubmission = isSpam(submissionCount, lastSubmissionDate);

    const upsertData: Database['public']['Tables']['email_submissions']['Insert'] = {
      email,
      ip_address: ipAddress,
      last_submission_date: new Date().toISOString(),
      submission_count: submissionCount,
      is_valid: true,
      is_spam: isSpamSubmission
    };

    const { error: upsertError } = await supabase
      .from('email_submissions')
      .upsert(upsertData)
      .single();

    if (upsertError) {
      throw upsertError;
    }

    return NextResponse.json({ success: true, isSpam: isSpamSubmission });
  } catch (error) {
    console.error('Error processing email submission:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
