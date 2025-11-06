// src/context/SessionContext.jsx
import { createContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export const SessionContext = createContext({
  session: null,
  sessionLoading: false,
  sessionMessage: null,
  sessionError: null,
  handleSignUp: () => {},
  handleSignIn: () => {},
  handleSignOut: () => {},
});

export function SessionProvider({ children }) {
  const [session, setSession] = useState(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [sessionMessage, setSessionMessage] = useState(null);
  const [sessionError, setSessionError] = useState(null);

  // ✅ Verifica sessão inicial e escuta mudanças (login/logout)
  useEffect(() => {
    async function loadSession() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;

        const activeSession = data?.session?.user ? data.session : null;
        setSession(activeSession);
      } catch (error) {
        console.error("Session load error:", error);
        setSessionError(error.message);
      } finally {
        setSessionLoading(false);
      }
    }

    loadSession();

    // Escuta mudanças de autenticação em tempo real
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession?.user ? newSession : null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // ✅ Criação de conta
  async function handleSignUp(email, password, username) {
    setSessionLoading(true);
    setSessionError(null);
    setSessionMessage(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username, admin: false },
          emailRedirectTo: `${window.location.origin}/signin`,
        },
      });

      if (error) throw error;

      if (data.user) {
        setSessionMessage("✅ Registration successful! Check your email to confirm your account.");
        // opcional: redirecionar para signin
        window.location.href = "/signin";
      }
    } catch (error) {
      console.error("SignUp error:", error);
      setSessionError(error.message);
    } finally {
      setSessionLoading(false);
    }
  }

  // ✅ Login
  async function handleSignIn(email, password) {
    setSessionLoading(true);
    setSessionError(null);
    setSessionMessage(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.session?.user) {
        setSession(data.session);
        setSessionMessage("✅ Sign in successful!");
      } else {
        setSession(null);
      }
    } catch (error) {
      console.error("SignIn error:", error);
      setSessionError(error.message);
    } finally {
      setSessionLoading(false);
    }
  }

  // ✅ Logout
  async function handleSignOut() {
    setSessionLoading(true);
    setSessionError(null);

    try {
      await supabase.auth.signOut();
      setSession(null);
      setSessionMessage("👋 Signed out successfully.");
      window.location.href = "/";
    } catch (error) {
      console.error("SignOut error:", error);
      setSessionError(error.message);
    } finally {
      setSessionLoading(false);
    }
  }

  return (
    <SessionContext.Provider
      value={{
        session,
        sessionLoading,
        sessionMessage,
        sessionError,
        handleSignUp,
        handleSignIn,
        handleSignOut,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}
