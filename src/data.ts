// ─────────────────────────────────────────────────────────────
//  EDIT THIS FILE — it is the only place you need to touch to
//  make the portfolio yours. Everything marked TODO is a
//  placeholder: replace it with your real details before
//  you deploy.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Pouya Basiri",
  title: "Full-Stack Software Engineer",
  // Phrases the hero rotates through
  roles: [
    ".NET 10 Web API Engineer",
    "React & Next.js Developer",
    "Clean Architecture Advocate",
    "PostgreSQL & Docker Builder",
  ],
  summary:
    "I design and build scalable web platforms end to end — secure .NET APIs, polished React/Next.js frontends, and the DevOps glue that ships them reliably.",
  about: [
    "I am a full-stack engineer who enjoys turning messy business requirements into clean, maintainable systems. My day-to-day stack is ASP.NET Core on the backend and React / Next.js on the frontend, backed by PostgreSQL and containerised with Docker.",
    "I care about architecture that survives contact with real teams: layered design, CQRS where it earns its keep, authentication done properly, and tests that let you change things without fear.",
  ],
  // TODO: replace with your real contact details
  email: "you@example.com",
  github: "https://github.com/PouyaBasiri",
  linkedin: "", // TODO: e.g. "https://www.linkedin.com/in/your-handle" — leave empty to hide
  resumeUrl: "", // TODO: e.g. "/resume.pdf" (put the file in /public) — leave empty to hide
};

// TODO: replace with your real numbers — these are placeholders
export const stats = [
  { value: 5, suffix: "+", label: "Years building software" },
  { value: 12, suffix: "+", label: "Projects delivered" },
  { value: 2, suffix: "", label: "Core stacks: .NET & React" },
  { value: 99, suffix: "%", label: "Care about clean code" },
];

export const skillGroups = [
  {
    title: "Backend",
    items: ["C#", ".NET 10", "ASP.NET Core Web API", "gRPC / Protobuf", "JWT Auth", "MailKit", "Entity Framework"],
  },
  {
    title: "Frontend",
    items: ["React 19", "Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion", "shadcn/ui"],
  },
  {
    title: "Data & Architecture",
    items: ["PostgreSQL", "Clean Architecture", "CQRS", "DTO patterns", "SignalR"],
  },
  {
    title: "DevOps & Quality",
    items: ["Docker & Compose", "GitHub Actions CI", "Unit & integration tests", "Git"],
  },
];

// TODO: replace with your real work history
export const experience = [
  {
    role: "Senior Full-Stack Engineer",
    company: "Your Company",
    period: "2023 — Present",
    points: [
      "Lead design and delivery of .NET APIs and Next.js dashboards used by internal and external teams.",
      "Introduced Clean Architecture and CI pipelines, cutting regression bugs and review time.",
      "Mentor engineers on API design, testing and secure authentication flows.",
    ],
  },
  {
    role: "Full-Stack Developer",
    company: "Previous Company",
    period: "2020 — 2023",
    points: [
      "Built and maintained REST services and React frontends for customer-facing products.",
      "Modelled PostgreSQL schemas and tuned queries for reporting-heavy features.",
    ],
  },
];

export const projects = [
  {
    // Based on the real repo: github.com/PouyaBasiri/SurinRayan
    title: "SurinRayan — Admin Dashboard & Contact Management",
    featured: true,
    description:
      "A full-stack platform for managing customer support requests and administration. A .NET 10 Web API with JWT and claim-based authorization powers a Next.js 15 / React 19 admin panel with route guards, request filtering, and a database-backed reply system with optional email delivery.",
    tags: [".NET 10", "Next.js 15", "React 19", "PostgreSQL", "Docker", "Tailwind", "JWT"],
    highlights: ["Clean layered architecture", "Middleware route protection", "Dockerised one-command setup"],
    link: "https://github.com/PouyaBasiri/SurinRayan",
  },
  // TODO: replace or delete these two placeholder projects
  {
    title: "Your Next Project",
    featured: false,
    description: "Describe what it does, who it is for, and the measurable result it produced.",
    tags: ["React", "TypeScript"],
    highlights: [],
    link: "",
  },
  {
    title: "Another Project",
    featured: false,
    description: "Add a short, outcome-focused description. One or two sentences is plenty.",
    tags: [".NET", "PostgreSQL"],
    highlights: [],
    link: "",
  },
];

// TODO: replace with your real achievements, certifications, talks, awards…
export const achievements = [
  "Architected a production platform on .NET 10 + Next.js 15 with automated build & test pipelines.",
  "Implemented secure JWT authentication with server-side route guarding.",
  "Containerised full-stack apps so any teammate can run them with a single command.",
  "Add your certification, award or publication here.",
];

// Lines typed out in the hero "terminal"
export const terminalLines = [
  { prompt: "$", text: "whoami", out: "pouya.basiri — full-stack engineer" },
  { prompt: "$", text: "stack --list", out: ".NET 10 · React 19 · Next.js · PostgreSQL · Docker" },
  { prompt: "$", text: "status", out: "open to new opportunities ✔" },
];
