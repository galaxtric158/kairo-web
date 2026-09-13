# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4. Lenis (smooth scroll), GSAP (scroll choreography), CSS/canvas for ambient motion. No 3D runtime on the marketing surface.

## Users

Serious hobbyists, students, and beginner-to-intermediate makers building Arduino, ESP32, Raspberry Pi, robotics, and IoT projects — people who know enough to build but regularly get stuck where hardware meets software. Not complete beginners; not enterprise teams.

## Product Purpose

Kairo is an AI engineering environment for physical computing, not a foundation model. It answers one question: "Why doesn't my hardware project work?" Given a project — code, board configuration, GPIO usage, wiring description, libraries, and serial output — it builds a structured picture of the whole hardware/software system, diagnoses failures, proposes fixes, and verifies them by rebuilding, reflashing, and re-observing the device.

## Positioning

General coding assistants understand software. Physical computing adds hardware: pins, wiring, sensors, board configuration, libraries, firmware, serial telemetry, physical-world failures. Kairo's product is the engineering system around a replaceable LLM: project representation, hardware-aware checks, device integrations, diagnostics, verification loops, and persistent project memory. The model is a component; the system is the moat.

## Operating Context

Two teenage cofounders, ~$300 budget, ~2 years. No foundation-model training, no GPU infrastructure, no enterprise sales. Build in the open with existing model APIs, local computation, and open-source tooling. Prove value with a narrow prototype before anything else.

## Capabilities and Constraints

Exploring, in order: project inspection (repo, board, config, dependencies, pins), serial/telemetry reading, deterministic conflict checks (pin conflicts, I2C address mismatches, library issues), single-call AI diagnosis over a structured bundle, then closed-loop fix → rebuild → reflash → observe → verify.

Not yet built: the CLI prototype, device integrations, the project graph store, automated verification runs, pricing, or billing. Nothing on this site that looks like a working product is one unless labeled otherwise — concept previews are marked as concepts.

Starting ecosystem: ESP32 + PlatformIO + Arduino framework. One board family and a handful of common sensors first; breadth only after depth works.

## Brand Commitments

Name: Kairo. Voice: technical, precise, serious, honest about what is built versus planned. Visual: dark, mathematical, computational, restrained. No purple gradients, no glowing cards, no generic AI startup aesthetics. The aesthetic is "a mathematical instrument designed by a world-class digital studio."

## Evidence on Hand

A written thesis, a falsification plan (30/90/180/365-day milestones with kill criteria), and this site. No prototype, no users, no benchmarks, no revenue. Every claim about the future is a plan, not a fact.

## Product Principles

1. Verification over generation — a fix counts only when the device confirms it
2. System over model — the LLM is replaceable; context and verification are the product
3. Honesty over hype — concept, planned, and built are always labeled
4. Narrow before broad — one ecosystem, five faults, ten users before anything else
5. Kill criteria over sunk cost — abandon what the evidence rejects

## Accessibility & Inclusion

WCAG AA contrast requirements. Reduced motion support. Screen reader compatible. Keyboard navigation required.
