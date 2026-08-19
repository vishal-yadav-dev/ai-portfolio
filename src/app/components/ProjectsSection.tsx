"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import StoryMarker from "./StoryMarker";

interface Project {
  title: string;
  subtitle: string;
  description: string;
  link?: string;
  tags: string[];
  color: string;
  badge: string;
  metrics: string[];
  cta?: string;
  featured?: boolean;
  story?: string;
}

const PROJECTS: Project[] = [
  {
    title: "Coders Desk (कोडर की मेज़)",
    subtitle: "Personal Project · 2026",
    story: "The itch: practicing DSA in a sterile code editor felt like a chore, not a craft.",
    description:
      "An ambient coding-practice site — a developer's desk that shifts with the real time of day, with a live multi-language IDE (JavaScript, Python, Java, C++, Go via the Piston API) for solving DSA and interview problems, and a switchable music playlist. Built with Next.js, TypeScript & Tailwind.",
    link: "https://codersdesk.vercel.app",
    tags: ["Next.js", "TypeScript", "Tailwind", "Piston API"],
    color: "#22D3EE",
    badge: "Live · Personal",
    metrics: ["Time-aware ambient UI", "Multi-language code runner", "DSA practice + music"],
    cta: "Wanna code live with music? Let's go to our Coders Desk",
    featured: true,
  },
  {
    title: "AI Portfolio + RAG Chatbot",
    subtitle: "Personal Project · 2026–Present",
    story: "The proof: instead of just listing GenAI skills, I built one — this very site.",
    description:
      "Built from scratch in my spare time — a GenAI-powered portfolio with a live RAG chatbot that answers real-time questions about me. Pinecone for vector storage, LangChain for orchestration, OpenAI + Gemini for multi-model responses. Deployed on Vercel.",
    // link: "https://vishal-portfolio-neon.vercel.app/",
    tags: ["Pinecone", "LangChain", "OpenAI", "Gemini", "Next.js", "RAG", "Vercel"],
    color: "#00D4FF",
    badge: "Live · Personal",
    metrics: ["Multi-model (OpenAI + Gemini)", "Pinecone vector DB", "Real-time RAG"],
    featured: true,
  },
  {
    title: "Enterprise RAG System — Arm Holdings",
    subtitle: "Innovify · Arm's holding · 2025",
    description:
      "Designed and shipped a production RAG pipeline for Arm's enterprise knowledge base. Document chunking strategy, embedding generation, vector similarity search via Azure OpenAI, and Node.js APIs orchestrating the full retrieval → LLM response flow on AWS serverless infrastructure.",
    link: "https://www.arm.com/",
    tags: ["Azure OpenAI", "RAG", "AWS Lambda", "Node.js", "TypeScript", "S3", "RDS"],
    color: "#7B2FFF",
    badge: "Production · Enterprise",
    metrics: ["Arm's holding client", "AWS serverless infra", "Azure OpenAI integration"],
  },

  {
    title: "AI Prediction Scoring Microservice",
    subtitle: "Innovify · Arm's holding · 2025",
    description:
      "GPT-powered scoring microservice integrated into Arm's automated decision workflows. Not a prototype — a live system making automated decisions in production via serverless AWS architecture.",
    link: "https://notchup.com/",
    tags: ["GPT-4", "AWS Lambda", "API Gateway", "Node.js", "TypeScript", "Microservices"],
    color: "#A855F7",
    badge: "Production · AI",
    metrics: ["Live decision automation", "Serverless AWS", "GPT-4 integration"],
  },
  {
    title: "Healthcare Booking Platform — Lunajoy",
    subtitle: "Kratin Software · 2024",
    description:
      "End-to-end backend for Lunajoy Health's doctor + patient appointment booking. AWS Lambda + RDS + PostgreSQL under HIPAA compliance. Stripe tokenization boosted payment completion by 20%, AWS optimization cut data retrieval by 25%.",
    link: "https://hellolunajoy.com/",
    tags: ["AWS Lambda", "PostgreSQL", "Stripe", "HIPAA", "Node.js", "RDS"],
    color: "#0EA5E9",
    badge: "Production · Healthcare",
    metrics: ["30% efficiency gain", "25% faster retrieval", "+20% payment success"],
  },
  {
    title: "SmileADay",
    subtitle: "Mckinsol Consulting · 2020–2023",
    link: "https://smileaday.org",
    description:
      "A PHP-based web application that simplifies secure online payments by seamlessly integrating both PayPal and Stripe payment gateways.",
    tags: ["PHP", "Stripe", "PayPal", "Backend APIs"],
    color: "#F59E0B",
    badge: "Production",
    metrics: ["Stripe integration", "PayPal integration"],
  },
  {
    title: "TimesOfPeople HR Portal",
    subtitle: "In-House Enterprise Solution",
    link: "https://hr.timesofpeople.com/login",
    description:
      "Comprehensive in-house HR management portal. Engineered the backend to handle complex employee details,attendanceTracking, timesheet tracking, agile project and sprint management, dynamic appraisal workflows, and seamless invoice reimbursements.",
    tags: ["Node.js", "JavaScript", "PostgreSQL", "Enterprise HR"],
    color: "#EC4899",
    badge: "Production · HR",
    metrics: ["Timesheets & Sprints", "Automated Appraisals", "Invoice Workflows"],
  },
  {
    title: "GXP Article Processing System — Under Armour",
    subtitle: "Mckinsol Consulting · Client: GXP / Under Armour · 2020–2023",
    description:
      "Built a high-throughput system that pulled thousands of purchase order files from an SFTP server, processed them concurrently using Node.js Worker Threads to maximize CPU utilisation, stored structured article data in MongoDB, and served a custom UI for warehouse staff to search, select, and verify article details before printing hang tags for Under Armour products. Deployed and hosted on SAP BTP Cloud.",
    tags: ["Node.js", "Worker Threads", "MongoDB", "SFTP", "SAP BTP", "Under Armour", "Express.js"],
    color: "#FF6B6B",
    badge: "Production · Enterprise",
    metrics: ["Thousands of PO files processed", "Worker Threads concurrency", "SAP BTP deployment"],
  },
  {
    title: "HOVR NFT Marketplace",
    subtitle: "Mobiloitte Technology · 2023–2024",
    description:
      "Full-stack NFT marketplace backend with Web3 blockchain integration. Users can mint, list, buy and trade NFTs. Built smart contract interaction APIs in Node.js, integrated Stripe for fiat payments alongside crypto, and implemented real-time ownership and transaction sync.",
    tags: ["Node.js", "Web3", "Blockchain", "NFT", "Stripe", "Smart Contracts", "TypeScript"],
    color: "#FFB347",
    badge: "Production · Web3",
    metrics: ["Full NFT lifecycle APIs", "Web3 + Stripe payments", "Real-time blockchain sync"],
  },
  {
    title: "SpotYourDeal — E-commerce Platform",
    subtitle: "Mckinsol Consulting · spotyourdeal.com · 2020–2023",
    description:
      "Backend for a full e-commerce platform. Built product catalogue management, inventory tracking, order lifecycle APIs, and integrated Razorpay payment gateway for seamless checkout. Deployed on DigitalOcean with PostgreSQL and Node.js.",
    link: "https://spotyourdeal.com",
    tags: ["Node.js", "PostgreSQL", "Razorpay", "DigitalOcean", "REST APIs", "E-commerce"],
    color: "#1D9E75",
    badge: "Production · E-commerce",
    metrics: ["Full e-commerce backend", "Razorpay integration", "DigitalOcean deployment"],
  },
];

export default function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10px" });
  const [selected, setSelected] = useState<Project | null>(null);

  const featured = PROJECTS.filter((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <section id="projects" ref={ref} className="relative py-20 px-6 max-w-6xl mx-auto overflow-visible">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <StoryMarker label="What I Build" />
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
          Things I&apos;ve{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] to-[#7B2FFF]">
            actually shipped.
          </span>
        </h2>
        <p className="text-gray-500 mb-16 text-lg max-w-2xl">
          Years of production work for other companies. Off the clock, the same instincts
          go into building for myself.
        </p>

        {/* Featured story beats — heading pinned via CSS sticky while details scroll past */}
        <div className="space-y-24 mb-24">
          {featured.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
              className="md:grid md:grid-cols-[320px_1fr] md:gap-12"
            >
              {/* Pinned column — stays in view while the story scrolls past on desktop */}
              <div
                onClick={() => setSelected(project)}
                className="md:sticky md:top-28 md:self-start mb-6 md:mb-0 cursor-pointer group/pin"
              >
                <span
                  className="inline-block text-xs font-mono px-2.5 py-1 rounded-full border mb-4"
                  style={{
                    color: project.color,
                    borderColor: `${project.color}40`,
                    background: `${project.color}10`,
                  }}
                >
                  {project.badge}
                </span>
                <h3 className="text-white font-black text-3xl md:text-4xl leading-tight mb-2 group-hover/pin:text-[#00D4FF] transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-gray-600 font-mono mb-3">{project.subtitle}</p>
                <span className="text-xs font-mono text-gray-600 group-hover/pin:text-white transition-colors">
                  View details →
                </span>
              </div>

              {/* Scrolling column */}
              <div className="p-8 md:p-10 rounded-3xl border border-white/10 bg-white/[0.03]">
                {project.story && (
                  <p className="font-mono text-sm mb-4" style={{ color: project.color }}>
                    {project.story}
                  </p>
                )}

                <p className="text-gray-400 text-base leading-relaxed mb-6 max-w-2xl">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {project.metrics.map((m) => (
                    <span
                      key={m}
                      className="text-xs px-2 py-0.5 rounded font-medium"
                      style={{ color: project.color, background: `${project.color}15` }}
                    >
                      ✓ {m}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-5 border-t border-white/5 mb-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded font-mono border border-white/10 bg-white/5 text-gray-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {project.cta && project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="group/cta mt-4 flex items-center justify-between gap-2 rounded-xl px-4 py-3 text-sm font-medium border transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      color: project.color,
                      borderColor: `${project.color}40`,
                      background: `${project.color}0D`,
                    }}
                  >
                    <span>{project.cta}</span>
                    <span className="transition-transform duration-300 group-hover/cta:translate-x-1">↗</span>
                  </a>
                )}
                {!project.cta && project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-4 text-sm font-medium hover:underline"
                    style={{ color: project.color }}
                  >
                    View live ↗
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rest of the shipped work — lighter, denser grid */}
        <p className="text-gray-600 text-xs font-mono uppercase tracking-widest mb-6">
          More production work
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {rest.map((project, i) => (
            <motion.div
              key={project.title}
              onClick={() => setSelected(project)}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.06 }}
              className="group relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04] transition-all duration-300 flex flex-col h-auto overflow-visible cursor-pointer"
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-6 right-6 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: project.color }}
              />

              <div className="flex items-start justify-between mb-4">
                <span
                  className="text-xs font-mono px-2.5 py-1 rounded-full border"
                  style={{
                    color: project.color,
                    borderColor: `${project.color}40`,
                    background: `${project.color}10`,
                  }}
                >
                  {project.badge}
                </span>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-gray-600 hover:text-white transition-colors text-sm"
                  >
                    Live ↗
                  </a>
                )}
              </div>

              <h3 className="text-white font-bold text-xl mb-1">{project.title}</h3>
              <p className="text-xs text-gray-600 font-mono mb-4">{project.subtitle}</p>
              <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">{project.description}</p>

              {/* Metrics */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.metrics.map((m) => (
                  <span
                    key={m}
                    className="text-xs px-2 py-0.5 rounded font-medium"
                    style={{ color: project.color, background: `${project.color}15` }}
                  >
                    ✓ {m}
                  </span>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded font-mono border border-white/10 bg-white/5 text-gray-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Interactive project popup */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#0A0F16] p-8 md:p-10"
            >
              <button
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute top-6 right-6 w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-colors"
              >
                ✕
              </button>

              <span
                className="inline-block text-xs font-mono px-2.5 py-1 rounded-full border mb-4"
                style={{
                  color: selected.color,
                  borderColor: `${selected.color}40`,
                  background: `${selected.color}10`,
                }}
              >
                {selected.badge}
              </span>

              <h3 className="text-white font-black text-3xl mb-1 pr-10">{selected.title}</h3>
              <p className="text-xs text-gray-600 font-mono mb-6">{selected.subtitle}</p>

              {selected.story && (
                <p className="font-mono text-sm mb-4" style={{ color: selected.color }}>
                  {selected.story}
                </p>
              )}

              <p className="text-gray-400 text-base leading-relaxed mb-6">{selected.description}</p>

              <div className="flex flex-wrap gap-2 mb-5">
                {selected.metrics.map((m) => (
                  <span
                    key={m}
                    className="text-xs px-2 py-0.5 rounded font-medium"
                    style={{ color: selected.color, background: `${selected.color}15` }}
                  >
                    ✓ {m}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 pt-5 border-t border-white/5 mb-6">
                {selected.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded font-mono border border-white/10 bg-white/5 text-gray-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {selected.link && (
                <a
                  href={selected.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
                  style={{ background: selected.color, color: "#050A0F" }}
                >
                  Visit Live Site ↗
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
