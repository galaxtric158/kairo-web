"use client";

import { useSyncExternalStore } from "react";

function checkWebGLSupport(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    return !!gl;
  } catch {
    return false;
  }
}

const subscribe = () => () => {};
const getSnapshot = () => checkWebGLSupport();
const getServerSnapshot = () => true;

export function WebGLGuard({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback: React.ReactNode;
}) {
  const supported = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return supported ? <>{children}</> : <>{fallback}</>;
}
