"use client"

import { useEffect, useState } from "react"
import { FaArrowLeft, FaExternalLinkAlt, FaGithub } from "react-icons/fa"
import Image from "next/image"

// Mock data mapping (In a real app, you would fetch this from an API or CMS based on the slug)
const projectsData: Record<string, any> = {
  "e-commerce-platform": {
    title: "E-Commerce Platform",
    desc: "Full-stack e-commerce web app with product catalog, cart system, and payment integration. Built to be responsive and highly performant.",
    tags: ["Next.js", "Node.js", "MongoDB", "Stripe"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200",
    content: "This project aims to simplify online shopping with a clean and intuitive user interface. It features a complete shopping cart system, user authentication, and fully working Stripe payment integration.",
    link: "#",
    github: "#"
  },
  "task-management-app": {
    title: "Task Management App",
    desc: "Collaborative task management tool with drag-and-drop boards and real-time updates.",
    tags: ["React", "Express", "Socket.io"],
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&q=80&w=1200",
    content: "Developed a real-time collaborative workspace where users can track their tasks using a drag-and-drop Kanban board interface.",
    link: "#",
    github: "#"
  },
  "portfolio-website": {
    title: "Portfolio Website",
    desc: "Modern and animated personal portfolio displaying projects and experience.",
    tags: ["HTML", "CSS", "JavaScript"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200",
    content: "A creatively designed personal portfolio using highly optimized vanilla CSS and smooth animations to provide a unique user experience.",
    link: "#",
    github: "#"
  },
  "default": {
    title: "Project Detail",
    desc: "Detailed view for the selected project showcasing the technologies used and its core features.",
    tags: ["Development", "Design"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200",
    content: "This represents the detail view of an amazing project built with modern web technologies.",
    link: "#",
    github: "#"
  }
}

export default function ProjectDetail({ params }: { params: { slug: string } }) {
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

  const project = projectsData[params.slug] || projectsData["default"]

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
            {project.tags.map((tag: string) => (
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
