"use client";

import { motion } from "framer-motion";

export default function HeroSection({ onOpenChat }: { onOpenChat: () => void }) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col px-6 pt-24 pb-20 overflow-visible"
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#00D4FF 1px, transparent 1px), linear-gradient(90deg, #00D4FF 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00D4FF] rounded-full blur-[180px] opacity-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#7B2FFF] rounded-full blur-[160px] opacity-10 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto w-full pt-8">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00D4FF]/30 bg-[#00D4FF]/5 text-[#00D4FF] text-sm font-mono mb-8 self-start"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Open to Remote/WFO Opportunities · Any Timezone
        </motion.div>

        {/* The hook — one strong line, who I am */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl font-black tracking-tight text-white leading-[1.05] mb-8"
        >
          I'm Vishal Yadav — a{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] to-[#7B2FFF]">
            Senior Backend Engineer
          </span>{" "}
          who ships production Node.js, TypeScript &amp; AWS systems, not demos.
        </motion.h1>

        {/* One-liner */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
        >
          5+ years building{" "}
          <span className="text-white font-medium">production level backend solutions</span>,{" "}
          <span className="text-white font-medium">serverless architectures</span>, and{" "}
          <span className="text-white font-medium">LLM-powered backends</span> — most recently for{" "}
          <span className="text-[#00D4FF] font-semibold">Health and Safety Group UK</span>.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.78 }}
          className="flex flex-wrap gap-4 mb-14"
        >
          <button
            onClick={onOpenChat}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#7B2FFF] text-white font-semibold text-base hover:shadow-[0_0_40px_rgba(0,212,255,0.5)] transition-all duration-300 hover:scale-105"
          >
            🤖 Ask AI About Me
          </button>
          <a
            href="/data/Vishal_Yadav_Resume.pdf"
            download="Vishal_Yadav_Resume.pdf"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[#00D4FF]/30 text-[#00D4FF] font-semibold text-base hover:bg-[#00D4FF]/10 hover:shadow-[0_0_20px_rgba(0,212,255,0.2)] transition-all duration-300"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v8M4.5 7 7 9.5 9.5 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M1.5 11.5h11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            Download Resume
          </a>
          <a
            href="https://www.linkedin.com/in/vishalyadav0001/"
            target="_blank"
            rel="noreferrer"
            className="px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-base hover:bg-white/10 hover:border-white/40 transition-all duration-300"
          >
            View LinkedIn →
          </a>
          <a
            href="mailto:vishalyadav7171@gmail.com"
            className="px-8 py-4 rounded-full border border-white/15 text-white font-semibold text-base hover:bg-white/10 transition-all duration-300"
          >
            Hire Me
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="flex flex-wrap gap-10 pt-8 border-t border-white/5 w-full"
        >
          {[
            { value: "6+", label: "Years Experience" },
            { value: "Arm", label: "Holdings Client" },
            { value: "Node.js", label: "Production Systems" },
            { value: "AWS", label: "Serverless Expert" },
          ].map((stat) => (
            <div key={stat.label} className="text-left">
              <div className="text-2xl font-black text-[#00D4FF] font-mono">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator — normal flow, never overlaps content above it */}
      <motion.div
        className="relative z-10 mt-auto pt-16 flex flex-col items-center gap-2 text-gray-600 text-xs mx-auto"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="font-mono text-xs">the story starts below</span>
        <div className="w-px h-10 bg-gradient-to-b from-gray-600 to-transparent" />
      </motion.div>
    </section>
  );
}
