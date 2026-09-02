# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, pnpm. Lenis (smooth scroll), GSAP (animation), React Three Fiber + drei (3D visualizations).

## Users

ML engineers, deep learning researchers, developers interested in transformer architecture, and technical audiences who want to understand how a language model is built from scratch.

## Product Purpose

A technical showcase and documentation hub for Kairo-10M, a ~10.23M parameter decoder-only transformer implemented completely from scratch using PyTorch primitives. The site communicates what Kairo is, how it works, why its architecture is interesting, what currently exists, and what remains to be built. Eventually it will host an interactive playground for inference/chat.

## Positioning

Kairo is built entirely from PyTorch primitives with no external model libraries. It is a from-scratch implementation that makes transformer internals transparent and accessible, rather than a black-box API or fine-tuned product.

## Operating Context

Developers and researchers evaluating the project, reading documentation, inspecting the codebase, and potentially contributing. The site serves as both technical reference and proof of implementation quality.

## Capabilities and Constraints

Core model implemented: configuration system, RMSNorm, token embeddings, RoPE, SwiGLU, causal self-attention, transformer blocks, full model, weight-tied LM head, loss computation, tokenizer interface, test suite, model inspection, validation.

Not yet implemented: dataset downloader, web crawler, pretraining, distributed training, RLHF, instruction tuning, chat UI, API server, quantization, speculative decoding, MoE, multimodal inputs, RAG, external model loading, HuggingFace compatibility.

Model specs: decoder-only transformer, vocab 16,384, max seq len 2,048, hidden 256, 8 layers, 4 attention heads, head dim 64, FFN intermediate 640, RMSNorm (e=1e-6), SwiGLU, RoPE, causal multi-head self-attention, no attention bias, embedding/LM-head weight tying, ~10.23M parameters.

## Brand Commitments

Name: Kairo (Kairo-10M). Voice: technical, precise, serious. Visual: dark, mathematical, computational, restrained. No purple gradients, no glowing cards, no generic AI startup aesthetics. The aesthetic is "a mathematical instrument designed by a world-class digital studio."

## Evidence on Hand

The complete model architecture specification. Implemented component list. Full future roadmap. No trained weights, no inference results, no benchmarks, no external testimonials. The model has been validated but not pretrained on any dataset.

## Product Principles

1. Transparency over mystique — make transformer internals visible and understandable
2. Implementation quality as proof — the code itself demonstrates competence
3. Educational value — help people understand how language models work
4. From-scratch authenticity — no external model libraries, pure PyTorch primitives
5. Serious engineering artifact, not marketing material

## Accessibility & Inclusion

WCAG AA contrast requirements. Reduced motion support. Screen reader compatible. All visualizations must have text alternatives. Keyboard navigation required.
