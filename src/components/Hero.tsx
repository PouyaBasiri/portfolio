import { motion } from "framer-motion";
import { ArrowRight, Code2, ShieldCheck, Sparkles } from "lucide-react";
import NeuralBackground from "./NeuralBackground";
import { RotatingText, Terminal } from "./Typing";
import { GithubIcon } from "./Icons";
import { profile, terminalLines } from "../data";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-slate-800 bg-slate-950 pb-20 pt-32 lg:pb-28 lg:pt-40">
      {/* animated layers */}
      <div className="grid-bg absolute inset-0" />
      <div className="animate-floaty absolute -left-24 top-10 h-96 w-96 rounded-full bg-blue-600/25 blur-[110px]" />
      <div
        className="animate-floaty absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-indigo-600/25 blur-[110px]"
        style={{ animationDelay: "-4s" }}
      />
      <div className="absolute inset-0 opacity-70">
        <NeuralBackground />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/10 via-slate-950/30 to-slate-950" />

      <div className="relative z-20 mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <motion.div
            {...fade(0)}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3.5 py-1.5 text-xs font-semibold text-blue-300 ring-1 ring-inset ring-blue-500/30 backdrop-blur-md"
          >
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            Available for new opportunities
          </motion.div>

          <motion.h1
            {...fade(0.1)}
            className="text-4xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-6xl"
          >
            Hi, I&apos;m <span className="gradient-text">{profile.name}</span>
          </motion.h1>

          <motion.p {...fade(0.2)} className="mt-4 text-xl font-semibold text-slate-100 sm:text-2xl">
            {profile.title}
          </motion.p>

          <motion.p {...fade(0.25)} className="mt-3 h-8 text-lg">
            <RotatingText phrases={profile.roles} />
          </motion.p>

          <motion.p {...fade(0.3)} className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
            {profile.summary}
          </motion.p>

          <motion.div {...fade(0.4)} className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-500"
            >
              View my work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20"
            >
              <GithubIcon className="h-4 w-4" />
              GitHub
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 text-xs font-medium text-slate-300"
          >
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-blue-400" />
              Secure, JWT-based architectures
            </div>
            <div className="flex items-center gap-1.5">
              <Code2 className="h-4 w-4 text-blue-400" />
              Built on Clean Architecture
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          {/* spinning gradient ring behind the terminal */}
          <div className="animate-spin-slow absolute -inset-1 rounded-3xl bg-[conic-gradient(from_0deg,#3b82f6,#6366f1,#22d3ee,#3b82f6)] opacity-30 blur-xl" />
          <div className="relative">
            <Terminal lines={terminalLines} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
