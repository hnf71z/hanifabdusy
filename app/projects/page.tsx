"use client"

import { FaArrowLeft } from "react-icons/fa"
import Image from "next/image"
import { projects } from "@/lib/data"

export default function Projects() {
  return (
    <>
      <div className="blob" id="cursor-blob"></div>

      <main>
        <section id="all-projects" className="container" style={{ paddingTop: "120px", minHeight: "100vh" }}>
          <div className="section-heading" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px", flexWrap: "wrap", gap: "20px" }}>
            <h1 style={{ fontSize: "4rem", fontFamily: "var(--syne)", margin: 0 }}>ALL PROJECTS</h1>
            <a href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textTransform: "none", padding: "10px 20px", border: "1px solid var(--fg)", borderRadius: "30px", fontSize: "1rem", color: "var(--fg)", textDecoration: "none", opacity: 0.8 }} className="project-link-btn">
              <FaArrowLeft /> Back to Home
            </a>
          </div>
          <div className="divider" style={{ marginBottom: "60px" }}></div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "40px" }}>
            {projects.map((project, index) => (
              <div key={project.slug} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <div style={{ height: "200px", overflow: "hidden", position: "relative" }}>
                  <Image src={project.image} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }} width={800} height={600} priority={index < 4} />
                </div>
                <div style={{ padding: "24px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <h3 style={{ fontSize: "1.5rem", fontFamily: "var(--syne)", marginBottom: "12px", color: "var(--fg)" }}>
                    {project.title}
                  </h3>
                  <p className="project-grid-desc" style={{ color: "var(--fg)", opacity: 0.7, fontSize: "0.9rem", marginBottom: "20px", flexGrow: 1 }}>
                    {project.desc}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
                    {project.tags.map(tag => (
                      <span key={tag} className="project-tag" style={{ fontSize: "0.7rem", padding: "4px 10px" }}>{tag}</span>
                    ))}
                  </div>
                  <a href={`/projects/${project.slug}`} className="project-link-btn outline" style={{ justifyContent: "center", width: "100%" }}>
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
