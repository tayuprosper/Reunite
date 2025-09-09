import { createClient } from "@/lib/supabase/server";
import { SupabaseCredetialsError } from "@/utils/errors/supabase-errors";




export const authService = {
  async signIn(email: string, password: string) {
    const supabase = await createClient();
    if (!supabase) {
      throw new Error("Supabase client is not initialized");
    }
    console.log("Signing in with email:", email);
    console.log("Signing in with password:", password);
    if (!email || !password) {
      throw new Error("Email and password are required for login");
    }
    console.log("Attempting to sign in with Supabase...");
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error){ 
      if (error && error.status === 400) {
        console.error("Supabase credentials error:", error.message);
        throw new SupabaseCredetialsError("Invalid email or password");
      }
      else throw error
    }
    console.log("Sign in successful:", data);
    return data;
  },

  async signUp(email: string, password: string) {
    const supabase = await createClient();
    if (!supabase) {
      throw new Error("Supabase client is not initialized");
    }
    console.log("Signing up with email:", email);
    console.log("Signing up with password:", password);
    if (!email || !password) {
      throw new Error("Email and password are required for signup");
    }
    console.log("Attempting to sign up with Supabase...");
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      if (error.status === 400) {
        console.error("Supabase credentials error:", error.message);
        throw new SupabaseCredetialsError("Invalid email or password");
      }else {
        console.error("Error during sign up:", error.message);
        throw error;
      }
    };
    console.log("Signup successful:", data);
    return data;
  },
  async signOut() {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return true;
  },

  // async signInWithProvider(provider: string) {
  //   const supabase = await createClient();
  //   if (!supabase) {
  //     throw new Error("Supabase client is not initialized");
  //   }
  //   console.log("Signing in with provider:", provider);
  //   const { data, error } = await supabase.auth.signInWithOAuth({
  //     provider,
  //     options: {
  //       redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/profile`,
  //     },
  //   });
  //   if (error) {
  //     console.error("Error during sign in with provider:", error.message);
  //     throw error;
  //   }
  //   console.log("Sign in with provider successful:", data);
  //   return data;
  // }

  // update user profile
  async updateProfile(updates: { full_name?: string; phone?: string, email?: string, avatar_url?: string }) {
    const supabase = await createClient();
    if (!supabase) {
      throw new Error("Supabase client is not initialized");
    }
    const user = supabase.auth.getUser();
    if (!user) {
      throw new Error("No user logged in");
    }
    const { data, error } = await supabase.auth.updateUser({
      data: updates,
    });
    if (error) {
      console.error("Error updating profile:", error.message);
      throw error;
    }
    console.log("Profile updated successfully:", data);
    return data;
  }
};