# Design

<!-- impeccable:design-schema 1 -->

## World

A mathematical instrument designed by a world-class digital studio. Deep blacks, graphite layers, subtle translucent materials, precise white/gray typography, restrained amber accent illumination, mathematical grids, coordinate systems, vectors, particles, tensors, numerical labels, technical annotations, subtle noise, thin borders, controlled depth.

The aesthetic sits between oscilloscope interface and Bauhaus exhibition — technical precision with editorial beauty. No purple gradients, no glowing cards, no generic AI startup visual language.

## Palette

| Token | Value | Role |
|---|---|---|
| `--bg-primary` | `#0a0a0a` | Page background |
| `--bg-secondary` | `#111111` | Card/section backgrounds |
| `--bg-tertiary` | `#1a1a1a` | Elevated surfaces |
| `--bg-glass` | `rgba(255,255,255,0.03)` | Glass panels |
| `--border` | `rgba(255,255,255,0.06)` | Subtle dividers |
| `--border-hover` | `rgba(255,255,255,0.12)` | Interactive borders |
| `--text-primary` | `#e8e8e8` | Main text |
| `--text-secondary` | `#888888` | Muted text |
| `--text-tertiary` | `#555555` | Disabled/caption |
| `--accent` | `#d4a853` | Primary accent (amber/gold) |
| `--accent-dim` | `rgba(212,168,83,0.15)` | Accent backgrounds |
| `--accent-glow` | `rgba(212,168,83,0.08)` | Subtle glow |

## Typography

| Role | Font | Weight | Use |
|---|---|---|---|
| Body | Inter | 400, 500, 600 | Prose, headings, UI |
| Mono | JetBrains Mono | 400, 500 | Code, parameters, data |
| Display | Inter | 600, tight tracking | Hero titles |

Scale: 4.5rem hero → 3rem h1 → 2rem h2 → 1.25rem h3 → 1rem body → 0.875rem small

## Spacing

8px base unit. Sections: 192px vertical (desktop), 128px (tablet), 96px (mobile). Max content: 1200px. Grid: 12-column, 24px gutters.

## Components

GlassPanel: translucent surface with backdrop-filter blur. Button: minimal, border-based, accent on hover. CodeBlock: syntax-highlighted, dark background. AnimatedCounter: number animation. ScrollReveal: GSAP scroll-triggered fade. Badge: small label. ParameterGrid: dot grid visualization.

## Motion

One authored moment per section. Exponential ease-out from visible default. Lenis for scroll, GSAP for choreography, R3F for 3D, CSS for micro-interactions. Reduced motion: instant reveals, frozen particles, no auto-rotation.

## Depth

Thin 1px borders at 6% white. Subtle box-shadows with offset. Glass panels with backdrop-filter. Layered backgrounds at different opacity levels. No heavy shadows, no neon glows.

## Anti-patterns to avoid

Same-size cards as page structure. Gradient text. Glass as decoration. Colored border-left/right. Sparklines/progress rings as content. Monospace as costume. Unicode/emoji as icons. Generic rounded rectangles. Meaningless gradients. Excessive animations.
