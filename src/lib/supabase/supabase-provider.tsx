'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { SupabaseClient, User } from '@supabase/supabase-js';
import { createClient } from './client';

interface SupabaseContextProps {
  supabase: SupabaseClient;
  user: User | null;
  loading: boolean;
}

const supabase = createClient();

const SupabaseContext = createContext<SupabaseContextProps | undefined>(undefined);

export const SupabaseProvider = ({ children, initialUser }: { children: ReactNode; initialUser: User | null }) => {
  const [user, setUser] = useState<User | null>(initialUser);
  const [loading, setLoading] = useState(!initialUser);

  useEffect(() => {
    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    setLoading(false);

    return () => listener.subscription.unsubscribe();
  }, []);

  return <SupabaseContext.Provider value={{ supabase, user, loading }}>{children}</SupabaseContext.Provider>;
};

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (!context) throw new Error('useSupabase must be used within SupabaseProvider');
  return context;
};
