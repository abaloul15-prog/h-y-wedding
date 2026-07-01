"use client";

import { useCallback, useEffect, useState } from "react";
import { AUTH_STORAGE_KEY, PASSWORD } from "@/lib/constants";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(AUTH_STORAGE_KEY);
      setIsAuthenticated(stored === "true");
    } catch {
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  }, []);

  const authenticate = useCallback((input: string): boolean => {
    const success = input.trim() === PASSWORD;
    if (success) {
      sessionStorage.setItem(AUTH_STORAGE_KEY, "true");
      setIsAuthenticated(true);
    }
    return success;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
  }, []);

  return { isAuthenticated, isLoading, authenticate, logout };
}
