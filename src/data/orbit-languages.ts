export interface OrbitLanguageSpec {
  symbol: string;
  name: string;
  primaryHex: string;
  accentHex: string;
  orbitRadius: number;
  orbitAngle: number;
  yOffset: number;
  speed: number;
}

export const ORBIT_LANGUAGE_NODES: ReadonlyArray<OrbitLanguageSpec> = [
  {
    symbol: "TS",
    name: "TypeScript",
    primaryHex: "#EA580C",
    accentHex: "#FDE047",
    orbitRadius: 2.65,
    orbitAngle: 0,
    yOffset: 0.52,
    speed: 0.42,
  },
  {
    symbol: "JSX",
    name: "React",
    primaryHex: "#F59E0B",
    accentHex: "#FEF08A",
    orbitRadius: 2.75,
    orbitAngle: Math.PI * 0.25,
    yOffset: -0.46,
    speed: 0.42,
  },
  {
    symbol: "PY",
    name: "Python",
    primaryHex: "#EAB308",
    accentHex: "#FFFBEB",
    orbitRadius: 2.58,
    orbitAngle: Math.PI * 0.5,
    yOffset: 0.58,
    speed: 0.42,
  },
  {
    symbol: "NODE",
    name: "Node.js",
    primaryHex: "#DC2626",
    accentHex: "#FDBA74",
    orbitRadius: 2.78,
    orbitAngle: Math.PI * 0.75,
    yOffset: -0.38,
    speed: 0.42,
  },
  {
    symbol: "GO",
    name: "Go",
    primaryHex: "#D97706",
    accentHex: "#FDE68A",
    orbitRadius: 2.62,
    orbitAngle: Math.PI,
    yOffset: 0.46,
    speed: 0.42,
  },
  {
    symbol: "RS",
    name: "Rust",
    primaryHex: "#C2410C",
    accentHex: "#FED7AA",
    orbitRadius: 2.72,
    orbitAngle: Math.PI * 1.25,
    yOffset: -0.52,
    speed: 0.42,
  },
  {
    symbol: "SQL",
    name: "SQL Data",
    primaryHex: "#EF4444",
    accentHex: "#FEF08A",
    orbitRadius: 2.58,
    orbitAngle: Math.PI * 1.5,
    yOffset: 0.42,
    speed: 0.42,
  },
  {
    symbol: "GIT",
    name: "Git AST",
    primaryHex: "#B91C1C",
    accentHex: "#FCD34D",
    orbitRadius: 2.74,
    orbitAngle: Math.PI * 1.75,
    yOffset: -0.44,
    speed: 0.42,
  },
];
