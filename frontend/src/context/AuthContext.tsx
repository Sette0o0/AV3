import { createContext, useState, useEffect, type ReactNode } from "react";
import type { AuthContextType, FormLogintype, User } from "../utils/types";
import api from "../utils/api";
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: User = jwtDecode(token)
        setUser(decoded)
      } catch (err) {
        console.error("Token inválido")
        localStorage.removeItem("token")
        setUser(null)
      }
    }
    setLoading(false);
  }, []);

  const login = async (usuario: FormLogintype) => {
    try {
      const result = await api.post("/auth", usuario)

      localStorage.setItem("token", JSON.stringify(result.data.token))
      const decoded = jwtDecode<User>(result.data.token)
      setUser(decoded);

      return {
        mensagem: result.data.mensagem,
        ok: 1
      }
    } catch (error: any) {
      console.error(error.message)

      localStorage.removeItem("token")
      setUser(null)

      return {
        mensagem: error.response.data.erro,
        ok: 0
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
