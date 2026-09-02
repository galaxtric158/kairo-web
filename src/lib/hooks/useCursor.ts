"use client";

import { useRef, useEffect, useCallback } from "react";

interface CursorState {
  x: number;
  y: number;
  ringX: number;
  ringY: number;
  isHovering: boolean;
  isVisible: boolean;
}

interface UseCursorOptions {
  stiffness?: number;
  damping?: number;
  mass?: number;
}

function springStep(
  current: number,
  target: number,
  velocity: number,
  stiffness: number,
  damping: number,
  mass: number,
  dt: number
): [number, number] {
  const springForce = -stiffness * (current - target);
  const dampingForce = -damping * velocity;
  const acceleration = (springForce + dampingForce) / mass;
  const newVelocity = velocity + acceleration * dt;
  const newPosition = current + newVelocity * dt;
  return [newPosition, newVelocity];
}

export function useCursor({
  stiffness = 500,
  damping = 28,
  mass = 0.5,
}: UseCursorOptions = {}) {
  const stateRef = useRef<CursorState>({
    x: -100,
    y: -100,
    ringX: -100,
    ringY: -100,
    isHovering: false,
    isVisible: false,
  });
  const velocityRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef(0);
  const lastTimeRef = useRef(0);
  const listenersRef = useRef<Set<(s: CursorState) => void>>(new Set());

  const subscribe = useCallback((listener: (s: CursorState) => void) => {
    listenersRef.current.add(listener);
    return () => {
      listenersRef.current.delete(listener);
    };
  }, []);

  const notify = useCallback(() => {
    const s = stateRef.current;
    listenersRef.current.forEach((fn) => fn({ ...s }));
  }, []);

  useEffect(() => {
    const isTouch = window.matchMedia(
      "(hover: none) or (pointer: coarse)"
    ).matches;
    if (isTouch) return;

    const onMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
      stateRef.current.x = e.clientX;
      stateRef.current.y = e.clientY;
      stateRef.current.isVisible = true;
    };

    const onEnter = () => {
      stateRef.current.isVisible = true;
    };

    const onLeave = () => {
      stateRef.current.isVisible = false;
    };

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive =
        target.closest("a, button, input, textarea, select, [role='button']");
      stateRef.current.isHovering = !!interactive;
    };

    const tick = (time: number) => {
      if (lastTimeRef.current === 0) lastTimeRef.current = time;
      const dt = Math.min((time - lastTimeRef.current) / 1000, 0.064);
      lastTimeRef.current = time;

      const s = stateRef.current;
      const t = targetRef.current;

      const [newX, newVx] = springStep(
        s.ringX,
        t.x,
        velocityRef.current.x,
        stiffness,
        damping,
        mass,
        dt
      );
      const [newY, newVy] = springStep(
        s.ringY,
        t.y,
        velocityRef.current.y,
        stiffness,
        damping,
        mass,
        dt
      );

      s.ringX = newX;
      s.ringY = newY;
      velocityRef.current.x = newVx;
      velocityRef.current.y = newVy;

      notify();
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", checkHover, { passive: true });
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", checkHover);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [stiffness, damping, mass, notify]);

  return { subscribe, stateRef };
}
