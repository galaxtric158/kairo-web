"use client";

import { useSyncExternalStore } from "react";

const mql = typeof window !== "undefined"
  ? window.matchMedia("(prefers-reduced-motion: reduce)")
  : null;

function subscribe(callback: () => void) {
  mql?.addEventListener("change", callback);
  return () => mql?.removeEventListener("change", callback);
}

function getSnapshot() {
  return mql?.matches ?? false;
}

function getServerSnapshot() {
  return false;
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
