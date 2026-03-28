"use client"

import { useEffect, useState } from "react"
import { FaExternalLinkAlt, FaArrowLeft } from "react-icons/fa"
import Image from "next/image"

const projects = [
  {
    title: "E-Commerce Platform",
    desc: "Full-stack e-commerce web app with product catalog, cart system, and payment integration.",
    tags: ["Next.js", "Node.js", "MongoDB"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Task Management App",
    desc: "Collaborative task management tool with drag-and-drop boards and real-time updates.",
    tags: ["React", "Express", "Socket.io"],
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Portfolio Website",
    desc: "Modern and animated personal portfolio displaying projects and experience.",
    tags: ["HTML", "CSS", "JavaScript"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Weather Dashboard",
    desc: "Real-time weather application pulling data from external APIs with 5-day forecast.",
    tags: ["React", "API", "TailwindCSS"],
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Financial Tracker",
    desc: "Dashboard to track incomes, expenses, and generate monthly reports visually.",
    tags: ["Vue.js", "Firebase", "Chart.js"],
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
  }
]

export default function Projects() {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    document.documentElement.classList.add("theme-transition")
    if (darkMode) {
      document.documentElement.classList.remove("light-mode")
    } else {
      document.documentElement.classList.add("light-mode")
    }
    const timeout = setTimeout(() => {
      document.documentElement.classList.remove("theme-transition")
    }, 600)
    return () => clearTimeout(timeout)
  }, [darkMode])

  return (
    <>
      <div className="blob" id="cursor-blob"></div>

      <nav>
        <div className="logo">
          <Image src="/nfz-logo.png" alt="NFZ Logo" className="nav-logo-img" width={40} height={40} />
        </div>
        <div className="nav-actions">
          <ul className="nav-links" style={{ position: "relative", left: "auto", transform: "none" }}>
            <li>
              <a href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textTransform: "none" }}>
                <FaArrowLeft /> Back to Home
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <main>
        <section id="all-projects" className="container" style={{ paddingTop: "120px", minHeight: "100vh" }}>
          <div className="section-heading">
            <h1 style={{ fontSize: "4rem", fontFamily: "var(--syne)", marginBottom: "40px" }}>ALL PROJECTS</h1>
          </div>
          <div className="divider" style={{ marginBottom: "60px" }}></div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "40px" }}>
            {projects.map((project, index) => (
              <div key={project.title} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <div style={{ height: "200px", overflow: "hidden", position: "relative" }}>
                  <Image src={project.image} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }} width={800} height={600} />
                </div>
                <div style={{ padding: "24px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <h3 style={{ fontSize: "1.5rem", fontFamily: "var(--syne)", marginBottom: "12px", color: "var(--fg)" }}>
                    {project.title}
                  </h3>
                  <p style={{ color: "var(--fg)", opacity: 0.7, fontSize: "0.9rem", marginBottom: "20px", flexGrow: 1 }}>
                    {project.desc}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
                    {project.tags.map(tag => (
                      <span key={tag} className="project-tag" style={{ fontSize: "0.7rem", padding: "4px 10px" }}>{tag}</span>
                    ))}
                  </div>
                  <a href={`/projects/${project.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`} className="project-link-btn outline" style={{ justifyContent: "center", width: "100%" }}>
                    Selengkapnya
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
