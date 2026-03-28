import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = sessionStorage.getItem("interview_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback(async (email: string, _password: string) => {
    // Mock login - will be replaced with Supabase
    const mockUser: User = {
      id: crypto.randomUUID(),
      name: email.split("@")[0],
      email,
    };
    sessionStorage.setItem("interview_user", JSON.stringify(mockUser));
    setUser(mockUser);
  }, []);

  const loginWithGoogle = useCallback(async () => {
    const mockUser: User = {
      id: crypto.randomUUID(),
      name: "Google User",
      email: "user@gmail.com",
    };
    sessionStorage.setItem("interview_user", JSON.stringify(mockUser));
    setUser(mockUser);
  }, []);

  const signup = useCallback(async (name: string, email: string, _password: string) => {
    const mockUser: User = { id: crypto.randomUUID(), name, email };
    sessionStorage.setItem("interview_user", JSON.stringify(mockUser));
    setUser(mockUser);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem("interview_user");
    sessionStorage.removeItem("interview_role");
    sessionStorage.removeItem("interview_domain");
    sessionStorage.removeItem("interview_experience");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, loginWithGoogle, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
