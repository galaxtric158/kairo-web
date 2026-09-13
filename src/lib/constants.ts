export const NAV_LINKS = [
  { href: "/architecture", label: "Architecture" },
  { href: "/engine", label: "Engine" },
  { href: "/prototype", label: "Prototype" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/docs", label: "Docs" },
] as const;

export const DIAGNOSIS_LOOP = [
  {
    label: "Inspect",
    dim: "repo · board",
    text: "Read the project as a whole: source files, PlatformIO config, board definition, libraries, and declared wiring.",
  },
  {
    label: "Understand",
    dim: "pins · parts",
    text: "Build a structured picture: which GPIO each component claims, which bus each sensor speaks, which library versions are pinned.",
  },
  {
    label: "Observe",
    dim: "serial · scan",
    text: "Compile the firmware, scan the buses, and read serial output. Ground truth comes from the device, not the code.",
  },
  {
    label: "Diagnose",
    dim: "conflicts · evidence",
    text: "Cross-check everything: pin conflicts, I2C address mismatches, library faults, brownout patterns. Each claim cited to a log line.",
  },
  {
    label: "Fix",
    dim: "diff · permission",
    text: "Propose the smallest change that explains the evidence. Nothing is modified without permission.",
  },
  {
    label: "Verify",
    dim: "flash · observe",
    text: "Rebuild, reflash, re-observe. A fix counts only when the device confirms it. Otherwise the loop runs again.",
  },
] as const;

export const COMMON_FAULTS = [
  {
    title: "Pin mismatch",
    description:
      "Code drives GPIO17; the hardware configuration says the sensor is wired to GPIO4. Nothing is broken, so nothing can work.",
    signal: "code ≠ wiring doc",
  },
  {
    title: "Silent sensor",
    description:
      "The library opens I2C at 0x76, but the bus scan answers at 0x77, or answers nothing at all. Serial shows no response.",
    signal: "scan ≠ address",
  },
  {
    title: "Brownout reset",
    description:
      "The motor stalls, current spikes, voltage sags, the ESP32 resets mid-loop. The log looks like random crashes.",
    signal: "reset pattern",
  },
] as const;

export const STARTING_STACK = [
  {
    name: "ESP32",
    role: "Board",
    status: "Starting point",
    active: true,
    description:
      "Cheap, ubiquitous, verbose: Wi-Fi, I2C, SPI, and boot logs rich enough to reason over. One family first.",
  },
  {
    name: "PlatformIO",
    role: "Build system",
    status: "Starting point",
    active: true,
    description:
      "Machine-readable config, pinned libraries, scriptable builds. The only stack that gives an agent something solid to hold.",
  },
  {
    name: "Arduino framework",
    role: "Firmware",
    status: "Starting point",
    active: true,
    description:
      "The largest pool of stuck makers and repeated failure modes. Depth here transfers everywhere later.",
  },
  {
    name: "Raspberry Pi",
    role: "Board",
    status: "Later",
    active: false,
    description:
      "It is Linux. General coding agents already own it. Kairo goes here only after the microcontroller loop is proven.",
  },
  {
    name: "MicroPython",
    role: "Firmware",
    status: "Later",
    active: false,
    description:
      "A live REPL allows inspection without reflashing. Second firmware target once the compiled loop works.",
  },
  {
    name: "ESP-IDF",
    role: "Firmware",
    status: "Later",
    active: false,
    description:
      "Powerful but pro-only and steep. Follows demand from advanced users, never leads.",
  },
] as const;

export const MILESTONES = [
  {
    window: "Days 0-30",
    name: "Falsify",
    status: "planned" as const,
    items: [
      "Break 15 ESP32 projects on purpose",
      "Test bundle+LLM vs paste-into-chat fix rate",
      "Measure how many failures need eyes and hands",
    ],
  },
  {
    window: "Days 30-90",
    name: "Inspect",
    status: "planned" as const,
    items: [
      "CLI reads PlatformIO projects and serial output",
      "Five deterministic checks that beat the raw model",
      "Ten strangers run it on real broken builds",
    ],
  },
  {
    window: "Days 90-180",
    name: "Close the loop",
    status: "planned" as const,
    items: [
      "Inspect → modify → compile → flash → observe → retry",
      "Every fix verified by the device, or it does not count",
      "Kill it if nothing beats paste-into-chat by 30%",
    ],
  },
  {
    window: "Days 180-365",
    name: "Understand",
    status: "planned" as const,
    items: [
      "Project graph, hardware profiles, diagnostic history",
      "Schematic, datasheet, and image understanding",
      "Only if the loop earned it",
    ],
  },
];

export const KILL_CRITERIA = [
  "Fewer than 10 strangers use it on real projects, or nobody uses it twice.",
  "Structured context does not beat pasted logs by a clear margin on broken builds.",
  "Most real failures turn out to need eyes and hands, not analysis.",
  "No deterministic check catches anything the raw model misses.",
] as const;
