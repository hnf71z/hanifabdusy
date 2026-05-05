"use client"

import { useEffect, useState, use } from "react"
import { FaArrowLeft, FaExternalLinkAlt, FaGithub } from "react-icons/fa"
import Image from "next/image"
import { getProjectBySlug, projects } from "@/lib/data"

export default function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") !== "light"
    }
    return true
  })

  useEffect(() => {
    document.documentElement.classList.add("theme-transition")
    if (darkMode) {
      document.documentElement.classList.remove("light-mode")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.add("light-mode")
      localStorage.setItem("theme", "light")
    }
    const timeout = setTimeout(() => {
      document.documentElement.classList.remove("theme-transition")
    }, 600)
    return () => clearTimeout(timeout)
  }, [darkMode])

  const project = getProjectBySlug(slug)

  if (!project) {
    return (
      <main>
        <section className="container" style={{ paddingTop: "120px", minHeight: "100vh", textAlign: "center" }}>
          <h1 style={{ fontSize: "3rem", fontFamily: "var(--syne)", marginBottom: "20px" }}>Project Not Found</h1>
          <p style={{ opacity: 0.7, marginBottom: "40px" }}>The project you&apos;re looking for doesn&apos;t exist.</p>
          <a href="/projects" className="project-link-btn outline" style={{ display: "inline-flex" }}>
            <FaArrowLeft style={{ marginRight: 8 }} /> Back to Projects
          </a>
        </section>
      </main>
    )
  }

  return (
    <>
      <div className="blob" id="cursor-blob"></div>

      <nav>
        <div className="nav-actions">
          <ul className="nav-links" style={{ position: "relative", left: "auto", transform: "none" }}>
            <li>
              <a href="/projects" style={{ display: "flex", alignItems: "center", gap: "8px", textTransform: "none" }}>
                <FaArrowLeft /> Back to Projects
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <main>
        <section className="container" style={{ paddingTop: "120px", minHeight: "100vh", paddingBottom: "100px" }}>
          <div className="section-heading">
            <h1 style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", fontFamily: "var(--syne)", marginBottom: "20px" }}>
              {project.title.toUpperCase()}
            </h1>
            <p style={{ fontSize: "1.2rem", opacity: 0.8, maxWidth: "800px" }}>
              {project.desc}
            </p>
          </div>
          
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", margin: "30px 0 50px" }}>
            {project.tags.map((tag) => (
              <span key={tag} className="project-tag" style={{ border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.05)", padding: "8px 16px", borderRadius: "100px", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px" }}>
                {tag}
              </span>
            ))}
          </div>

          <div style={{ width: "100%", height: "auto", borderRadius: "24px", overflow: "hidden", marginBottom: "60px", boxShadow: "0 20px 40px rgba(0,0,0,0.3)", position: "relative" }}>
            <Image src={project.image} alt={project.title} style={{ width: "100%", height: "auto", display: "block" }} width={1200} height={800} priority />
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "60px" }}>
            <div style={{ flex: "1 1 400px" }}>
              <h3 style={{ fontSize: "2rem", fontFamily: "var(--syne)", marginBottom: "20px" }}>About the Project</h3>
              <p style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "var(--fg)", opacity: 0.8 }}>
                {project.content}
              </p>
            </div>
            <div style={{ flex: "1 1 300px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", padding: "40px", borderRadius: "24px", alignSelf: "flex-start" }}>
              <h3 style={{ fontSize: "1.5rem", fontFamily: "var(--syne)", marginBottom: "30px" }}>Project Links</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <a href={project.link} className="project-link-btn outline" style={{ justifyContent: "center", padding: "16px 24px" }}>
                  <FaExternalLinkAlt style={{ marginRight: 10 }} /> Live Demo Visit
                </a>
                <a href={project.github} className="project-link-btn outline" style={{ justifyContent: "center", padding: "16px 24px" }}>
                  <FaGithub style={{ marginRight: 10 }} /> View Source Code
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

