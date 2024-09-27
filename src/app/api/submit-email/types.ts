export interface EmailSubmission {
  id: number;
  email: string;
  ip_address: string;
  last_submission_date: string;
  submission_count: number;
  is_valid: boolean;
  is_spam: boolean;
}

export interface SubmitEmailResponse {
  success: boolean;
  isSpam: boolean;
}

export interface ApiResponse {
  success: boolean;
  isSpam?: boolean;
  error?: string;
}
