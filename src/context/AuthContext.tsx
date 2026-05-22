import React, { createContext, useCallback, useContext, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AuthUser {
  firstName: string;
  lastName: string;
  email: string;
  address?: string;
  preferredLanguage?: string;
}

interface SignupPayload extends AuthUser {
  password: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => { success: boolean; error?: string };
  signup: (payload: SignupPayload) => { success: boolean; error?: string };
  logout: () => void;
}

interface StoredUser extends AuthUser {
  // TODO: hash password before sending to API when wiring real auth
  password: string;
}

// ─── localStorage helpers ─────────────────────────────────────────────────────

const USERS_KEY = "sj311_users";
const SESSION_KEY = "sj311_session";

const getStoredUsers = (): StoredUser[] => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
};

const saveStoredUsers = (users: StoredUser[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const getStoredSession = (): AuthUser | null => {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
  } catch {
    return null;
  }
};

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(getStoredSession);

  const signup = useCallback((payload: SignupPayload): { success: boolean; error?: string } => {
    const users = getStoredUsers();

    const alreadyExists = users.some(
      (u) => u.email.toLowerCase() === payload.email.toLowerCase()
    );

    if (alreadyExists) {
      return { success: false, error: "An account with this email already exists." };
    }

    const newUser: StoredUser = { ...payload };
    saveStoredUsers([...users, newUser]);

    const { password: _pw, ...sessionUser } = newUser;
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);

    return { success: true };
  }, []);

  const login = useCallback((email: string, password: string): { success: boolean; error?: string } => {
    const users = getStoredUsers();

    const match = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password
    );

    if (!match) {
      return { success: false, error: "Incorrect email or password." };
    }

    const { password: _pw, ...sessionUser } = match;
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);

    return { success: true };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("Error in useAuth");
  return ctx;
};
