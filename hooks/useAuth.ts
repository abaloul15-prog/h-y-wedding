"use client";

import { useCallback, useEffect, useState } from "react";

interface AuthResponse {
  authenticated: boolean;
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/auth", { method: "GET", cache: "no-store" })
      .then((res) => res.json() as Promise<AuthResponse>)
      .then((data) => {
        if (!cancelled) setIsAuthenticated(Boolean(data.authenticated));
      })
      .catch(() => {
        if (!cancelled) setIsAuthenticated(false);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const authenticate = useCallback(async (code: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const success = res.ok;
      if (success) setIsAuthenticated(true);
      return success;
    } catch {
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    await fetch("/api/auth", { method: "DELETE" }).catch(() => {});
    setIsAuthenticated(false);
  }, []);

  return { isAuthenticated, isLoading, authenticate, logout };
}
