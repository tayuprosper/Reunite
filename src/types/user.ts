export interface User {
  id: string;
  aud: string;
  role?: string;
  email?: string;
  email_confirmed_at?: string | null;
  invited_at?: string | null;
  phone?: string;
  phone_confirmed_at?: string | null;
  confirmation_sent_at?: string | null;
  confirmed_at?: string | null;
  recovery_sent_at?: string | null;
  last_sign_in_at?: string | null;
  app_metadata?: Record<string, unknown>;
  user_metadata?: Record<string, unknown>;
  identities?: {
    id: string;
    user_id: string;
    identity_data?: Record<string, unknown>;
    provider: string;
    created_at: string;
    last_sign_in_at: string;
    updated_at?: string;
  }[];
  created_at: string;
  updated_at?: string;
  banned_until?: string | null;
  is_anonymous?: boolean;
}