import { createContext, useContext, type ReactNode } from 'react';
import { useAuth, type ClientPrincipal } from '../hooks/useAuth';

type AuthContextValue = {
  loading: boolean;
  user: ClientPrincipal | null;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextValue>({
  loading: true,
  user: null,
  isAuthenticated: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const { loading, user } = useAuth();

  return (
    <AuthContext.Provider value={{ loading, user, isAuthenticated: user !== null }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextValue {
  return useContext(AuthContext);
}
