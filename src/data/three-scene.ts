export interface FloatingArtifactSpec {
  kind: "cube" | "octa" | "icosa" | "torus" | "knot" | "dodeca";
  label?: string;
  primaryHex: string;
  accentHex: string;
  x: number;
  y: number;
  z: number;
  scale: number;
  rotSpeedX: number;
  rotSpeedY: number;
}

export const PAGE_3D_ARTIFACTS: ReadonlyArray<FloatingArtifactSpec> = [
  { kind: "icosa", primaryHex: "#F59E0B", accentHex: "#FEF08A", x: 5.5, y: -2.2, z: -2.9, scale: 0.84, rotSpeedX: 0.28, rotSpeedY: -0.4 },
  { kind: "torus", primaryHex: "#DC2626", accentHex: "#FDBA74", x: -5.2, y: -6.0, z: -2.6, scale: 0.78, rotSpeedX: 0.45, rotSpeedY: 0.3 },
  { kind: "cube", label: "PY", primaryHex: "#EAB308", accentHex: "#FFFBEB", x: 5.3, y: -9.8, z: -2.2, scale: 0.7, rotSpeedX: -0.32, rotSpeedY: 0.5 },
  { kind: "octa", primaryHex: "#F97316", accentHex: "#FDE047", x: -5.5, y: -13.6, z: -2.8, scale: 0.82, rotSpeedX: 0.38, rotSpeedY: -0.42 },
  { kind: "knot", primaryHex: "#EA580C", accentHex: "#FEF08A", x: 5.4, y: -17.5, z: -3.1, scale: 0.62, rotSpeedX: 0.5, rotSpeedY: 0.36 },
  { kind: "cube", label: "RS", primaryHex: "#C2410C", accentHex: "#FED7AA", x: -5.2, y: -21.4, z: -2.2, scale: 0.72, rotSpeedX: -0.4, rotSpeedY: 0.44 },
  { kind: "dodeca", primaryHex: "#EF4444", accentHex: "#FDE047", x: 5.4, y: -25.2, z: -2.7, scale: 0.8, rotSpeedX: 0.3, rotSpeedY: -0.48 },
  { kind: "cube", label: "GO", primaryHex: "#D97706", accentHex: "#FEF9C3", x: -5.5, y: -29.0, z: -2.4, scale: 0.7, rotSpeedX: 0.42, rotSpeedY: 0.35 },
  { kind: "torus", primaryHex: "#F59E0B", accentHex: "#FFEDD5", x: 5.2, y: -33.0, z: -2.9, scale: 0.82, rotSpeedX: -0.36, rotSpeedY: 0.45 },
  { kind: "cube", label: "JSX", primaryHex: "#F97316", accentHex: "#FEF08A", x: -5.3, y: -37.0, z: -2.2, scale: 0.72, rotSpeedX: 0.34, rotSpeedY: -0.5 },
  { kind: "icosa", primaryHex: "#DC2626", accentHex: "#FDE68A", x: 5.5, y: -41.0, z: -3.0, scale: 0.86, rotSpeedX: 0.4, rotSpeedY: 0.32 },
  { kind: "cube", label: "SQL", primaryHex: "#B91C1C", accentHex: "#FDE047", x: -5.4, y: -45.0, z: -2.3, scale: 0.7, rotSpeedX: -0.44, rotSpeedY: 0.38 },
  { kind: "knot", primaryHex: "#EAB308", accentHex: "#FFEDD5", x: 5.3, y: -49.0, z: -3.1, scale: 0.6, rotSpeedX: 0.48, rotSpeedY: -0.36 },
  { kind: "octa", primaryHex: "#EA580C", accentHex: "#FACC15", x: -5.5, y: -53.0, z: -2.6, scale: 0.82, rotSpeedX: 0.33, rotSpeedY: 0.46 },
  { kind: "cube", label: "GIT", primaryHex: "#DC2626", accentHex: "#FEF08A", x: 5.4, y: -57.0, z: -2.2, scale: 0.72, rotSpeedX: -0.38, rotSpeedY: 0.42 },
  { kind: "dodeca", primaryHex: "#F59E0B", accentHex: "#FED7AA", x: -5.2, y: -61.0, z: -2.8, scale: 0.78, rotSpeedX: 0.41, rotSpeedY: -0.35 },
];

export interface MarqueeKeycapSpec {
  code: string;
  label: string;
  sub: string;
  tone: "yellow" | "amber" | "orange" | "red";
}

export const MARQUEE_ROW_ONE: ReadonlyArray<MarqueeKeycapSpec> = [
  { code: "TS", label: "TypeScript AST", sub: "Strict Types", tone: "orange" },
  { code: "JSX", label: "React Architecture", sub: "Hook Lifecycles", tone: "amber" },
  { code: "PY", label: "Python Services", sub: "AsyncIO & Pytest", tone: "yellow" },
  { code: "NODE", label: "Node.js Runtime", sub: "Idempotent APIs", tone: "red" },
  { code: "GO", label: "Go Concurrency", sub: "Worker Channels", tone: "amber" },
  { code: "RS", label: "Rust Safety", sub: "Ownership & Cargo", tone: "orange" },
  { code: "SQL", label: "SQL Indexing", sub: "Query Plans", tone: "red" },
  { code: "JAVA", label: "Java & Spring", sub: "DI Boundaries", tone: "yellow" },
];

export const MARQUEE_ROW_TWO: ReadonlyArray<MarqueeKeycapSpec> = [
  { code: "AST", label: "Static Repo Parse", sub: "File Citations", tone: "yellow" },
  { code: "VIVA", label: "Adaptive Code Viva", sub: "Trade-Off Defense", tone: "red" },
  { code: "SHA", label: "Commit Lineage", sub: "Non-Authorship Guard", tone: "orange" },
  { code: "TEST", label: "Test Depth Signal", sub: "Edge Assertions", tone: "amber" },
  { code: "API", label: "OpenAPI Contracts", sub: "Schema Validation", tone: "orange" },
  { code: "DIFF", label: "Boilerplate Split", sub: "Custom vs Starter", tone: "red" },
  { code: "FAIR", label: "Zero Auto-Reject", sub: "Human Oversight", tone: "yellow" },
  { code: "CARD", label: "Skill Proof Card", sub: "Candidate Controlled", tone: "amber" },
];
