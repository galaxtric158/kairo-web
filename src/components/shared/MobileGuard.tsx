"use client";

import { type ReactNode } from "react";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

export function MobileGuard({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (!isDesktop && fallback) {
    return <>{fallback}</>;
  }

  if (!isDesktop) {
    return null;
  }

  return <>{children}</>;
}
