import { useEffect, useState } from 'react';

export type ClientPrincipal = {
  identityProvider: string;
  userId: string;
  userDetails: string; // typically the user's email
  userRoles: string[];
};

type AuthState = {
  loading: boolean;
  user: ClientPrincipal | null;
};

export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({ loading: true, user: null });

  useEffect(() => {
    let cancelled = false;

    fetch('/.auth/me', { credentials: 'same-origin' })
      .then(res => res.json())
      .then((data: { clientPrincipal: ClientPrincipal | null }) => {
        if (!cancelled) {
          setState({ loading: false, user: data.clientPrincipal });
        }
      })
      .catch(() => {
        // /.auth/me is unavailable (e.g. plain Vite dev server without SWA CLI).
        // Treat as unauthenticated rather than crashing.
        if (!cancelled) {
          setState({ loading: false, user: null });
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
