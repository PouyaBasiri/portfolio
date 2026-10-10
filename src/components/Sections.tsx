import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  Database,
  Download,
  Layout,
  Mail,
  Server,
  Trophy,
  Wrench,
} from "lucide-react";
import { Counter, Reveal, SectionHeading } from "./Reveal";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { achievements, experience, profile, projects, skillGroups, stats } from "../data";

const groupIcons = [Server, Layout, Database, Wrench];

export function About() {
  return (
    <section id="about" className="relative border-b border-slate-800 bg-slate-950 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading eyebrow="About" title="Engineering with a focus on clarity" />
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal className="space-y-5 text-base leading-8 text-slate-300">
            {profile.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/20"
              >
                <Download className="h-4 w-4" /> Download résumé
              </a>
            )}
          </Reveal>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="glass h-full rounded-2xl p-6">
                  <div className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-4xl font-extrabold text-transparent">
                    <Counter to={s.value} suffix={s.suffix} />
                  </div>
                  <p className="mt-2 text-sm text-slate-400">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" className="border-b border-slate-800 bg-slate-900/40 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading eyebrow="Skills" title="The toolkit I build with" />
        <div className="grid gap-6 sm:grid-cols-2">
          {skillGroups.map((g, i) => {
            const Icon = groupIcons[i % groupIcons.length];
            return (
              <Reveal key={g.title} delay={i * 0.08}>
                <div className="glass group relative h-full overflow-hidden rounded-2xl p-6 transition-colors hover:border-blue-500/40">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/30">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-lg font-bold text-white">{g.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {g.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-slate-800/80 px-3 py-1 text-xs font-medium text-slate-200 ring-1 ring-white/10 transition-colors group-hover:ring-blue-500/30"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" className="border-b border-slate-800 bg-slate-950 py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <SectionHeading eyebrow="Experience" title="Where I've made an impact" />
        <div className="relative space-y-10 border-l border-blue-500/30 pl-8">
          {experience.map((e, i) => (
            <Reveal key={e.role + e.company} delay={i * 0.1}>
              <div className="relative">
                <span className="absolute -left-[41px] top-1 grid h-5 w-5 place-items-center rounded-full bg-slate-950 ring-2 ring-blue-500">
                  <Briefcase className="h-2.5 w-2.5 text-blue-400" />
                </span>
                <p className="font-mono text-xs text-blue-400">{e.period}</p>
                <h3 className="mt-1 text-xl font-bold text-white">{e.role}</h3>
                <p className="text-sm font-medium text-slate-400">{e.company}</p>
                <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-300">
                  {e.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span className="mt-3 h-1 w-1 shrink-0 rounded-full bg-blue-400" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Projects() {
  return (
    <section id="projects" className="border-b border-slate-800 bg-slate-900/40 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading eyebrow="Projects" title="Selected work" />
        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className={p.featured ? "lg:col-span-2" : ""}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="relative h-full rounded-2xl bg-gradient-to-br from-blue-500/40 via-slate-700/30 to-indigo-500/40 p-px"
              >
                <div className="relative h-full overflow-hidden rounded-2xl bg-slate-950 p-7">
                  {/* shimmer sweep */}
                  <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="animate-shimmer absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-blue-400/[0.06] to-transparent" />
                  </div>

                  <div className="relative">
                    {p.featured && (
                      <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300 ring-1 ring-blue-500/30">
                        <Trophy className="h-3 w-3" /> Featured project
                      </span>
                    )}
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl font-bold text-white">{p.title}</h3>
                      {p.link && (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Open ${p.title}`}
                          className="rounded-lg p-2 text-slate-300 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-white"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">{p.description}</p>

                    {p.highlights.length > 0 && (
                      <ul className="mt-4 grid gap-2 text-sm text-slate-300 sm:grid-cols-3">
                        {p.highlights.map((h) => (
                          <li key={h} className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-md bg-slate-800/80 px-2.5 py-1 font-mono text-[11px] text-slate-300 ring-1 ring-white/10"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Achievements() {
  return (
    <section className="border-b border-slate-800 bg-slate-950 py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <SectionHeading eyebrow="Achievements" title="Highlights along the way" />
        <div className="grid gap-4">
          {achievements.map((a, i) => (
            <Reveal key={a} delay={i * 0.07}>
              <div className="glass flex items-start gap-4 rounded-2xl p-5">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <p className="text-sm leading-7 text-slate-200">{a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-slate-900/40 py-20 lg:py-28">
      <div className="animate-floaty absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-600/20 blur-[110px]" />
      <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-8">
        <Reveal>
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-blue-400">Contact</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Let&apos;s build something <span className="gradient-text">great</span> together
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-slate-300">
            Have a project, a role, or just want to talk architecture? My inbox is open.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-500"
            >
              <Mail className="h-4 w-4" />
              {profile.email}
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20"
            >
              <GithubIcon className="h-4 w-4" /> GitHub
            </a>
            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20"
              >
                <LinkedinIcon className="h-4 w-4" /> LinkedIn
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 text-xs text-slate-500 sm:flex-row lg:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <p>Built with React, Tailwind CSS &amp; Framer Motion</p>
      </div>
    </footer>
  );
}
