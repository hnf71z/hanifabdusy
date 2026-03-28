"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import "react-vertical-timeline-component/style.min.css"

const Typewriter = dynamic(() => import("typewriter-effect"), { ssr: false })
const VerticalTimeline = dynamic(() => import("react-vertical-timeline-component").then(m => m.VerticalTimeline), { ssr: false })
const VerticalTimelineElement = dynamic(() => import("react-vertical-timeline-component").then(m => m.VerticalTimelineElement), { ssr: false })
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaLinkedinIn,
  FaGithub,
  FaExternalLinkAlt,
  FaGraduationCap,
  FaCode,
  FaSun,
  FaMoon,
  FaEnvelope,
  FaBars,
  FaTimes,
} from "react-icons/fa"
import AOS from "aos"
import "aos/dist/aos.css"
import { SiNextdotjs, SiExpress } from "react-icons/si"

const skills = [
  { name: "HTML5", icon: <FaHtml5 />, color: "#E34F26" },
  { name: "CSS3", icon: <FaCss3Alt />, color: "#1572B6" },
  { name: "JavaScript", icon: <FaJs />, color: "#F7DF1E" },
  { name: "React", icon: <FaReact />, color: "#61DAFB" },
  { name: "Next.js", icon: <SiNextdotjs />, color: "currentColor" },
  { name: "Node.js", icon: <FaNodeJs />, color: "#339933" },
  { name: "Express", icon: <SiExpress />, color: "currentColor" },
]

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
    desc: "Modern personal portfolio with smooth animations, responsive design, and premium aesthetics.",
    tags: ["Next.js", "CSS3", "TypeScript"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  },
]

const experiences = [
  {
    title: "Frontend Developer",
    subtitle: "Self-Learning",
    description: "Building modern web applications using React, Next.js, and Node.js. Focused on creating pixel-perfect, responsive UI with exceptional user experience.",
    date: "2026 — Present",
    icon: <FaCode />,
    iconBg: "#2563eb",
  },
  {
    title: "Dicoding Asah",
    subtitle: "Web Development Learning Path",
    description: "Completed comprehensive web development courses covering front-end fundamentals, JavaScript programming, and building progressive web applications.",
    date: "2025",
    icon: <FaGraduationCap />,
    iconBg: "#1d4ed8",
  },
]

export default function Home() {
  const [darkMode, setDarkMode] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  // Theme toggle effect
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

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 767) setMenuOpen(false)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    // Mouse Blob Follower
    const blob = document.getElementById("cursor-blob")
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY
      if (blob) {
        blob.style.transform = `translate(${x - 200}px, ${y - 200}px)`
      }
    }
    document.addEventListener("mousemove", handleMouseMove)

    // Parallax Effect
    const handleScroll = () => {
      const scroll = window.pageYOffset

      const parallaxTexts = document.querySelectorAll(".parallax-text")
      parallaxTexts.forEach((text) => {
        const speed = text.getAttribute("data-speed")
        if (speed) {
          ; (text as HTMLElement).style.transform = `translateX(${scroll * Number.parseFloat(speed) * 0.1}px)`
        }
      })

      const heroImg = document.getElementById("hero-img")
      if (heroImg) {
        heroImg.style.transform = `translate(-50%, calc(-50% + ${scroll * 0.2}px)) scale(${1 + scroll * 0.0005})`
      }

      const labels = document.querySelectorAll(".floating-label")
      labels.forEach((label, index) => {
        const direction = index % 2 === 0 ? 1 : -1
          ; (label as HTMLElement).style.transform = `translateY(${scroll * 0.1 * direction}px)`
      })
    }
    window.addEventListener("scroll", handleScroll)

    AOS.init({
      duration: 800,
      once: false,
      offset: 100,
    })

    // Reveal on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active")
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll(".reveal-text, .reveal-up").forEach((el) => observer.observe(el))

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (this: HTMLAnchorElement, e) {
        e.preventDefault()
        const href = this.getAttribute("href")
        if (href) {
          document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
        }
      })
    })

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div className="blob" id="cursor-blob"></div>

      <nav>
        <div className="logo">
          <Image src="/nfz-logo.png" alt="NFZ Logo" className="nav-logo-img" width={40} height={40} />
        </div>
        <ul className={`nav-links${menuOpen ? " nav-open" : ""}`}>
          <li><a href="#hero" onClick={() => setMenuOpen(false)}>Home</a></li>
          <li><a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a></li>
          <li><a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a></li>
          <li><a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a></li>
          <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
        </ul>
        <div className="nav-actions">
          <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)} aria-label="Toggle theme">
            <span className="toggle-bg"></span>
            <span className="toggle-knob">
              {darkMode ? <FaSun /> : <FaMoon />}
            </span>
          </button>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      <main>
        {/* HERO SECTION */}
        <section id="hero">
          <Image src="/rmbg-hanif.png" alt="Hanif Abdusy" className="hero-img" id="hero-img" width={800} height={800} priority />
          <div className="hero-title-container container">
            <span className="hero-name outline-text parallax-text" data-speed="-2">HANIF</span>
            <span className="hero-name outline-text parallax-text" data-speed="2" style={{ paddingLeft: "200px" }}>ABDUSY</span>
          </div>
        </section>

        {/* INTRO */}
        <section id="about">
          <div className="container">
            <div style={{ maxWidth: "800px" }}>
              <h2 style={{ fontSize: "3rem", fontFamily: "var(--syne)", marginBottom: "40px" }}>
                FRONTEND DEVELOPER WHO CRAFTS DIGITAL EXPERIENCES.
              </h2>
              <div className="reveal-up" style={{ fontSize: "1.5rem", fontWeight: 300, color: "#888", marginBottom: "40px", animationDelay: "0.2s", minHeight: "80px" }}>
                <Typewriter
                  options={{
                    delay: 40,
                  }}
                  onInit={(typewriter) => {
                    typewriter
                      .typeString("Passionate about building modern, responsive, and visually stunning web applications. Turning ideas into elegant digital solutions with clean code and creative design.")
                      .start()
                  }}
                />
              </div>
              <div data-aos="fade-up" data-aos-delay="400">
                <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="cv-btn">MY CV</a>
              </div>
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <div className="scrolling-marquee">
          <div className="marquee-inner">
            <span className="huge-type outline-text">FRONTEND — REACT — NEXT.JS — NODE.JS — CREATIVE — </span>
            <span className="huge-type outline-text">FRONTEND — REACT — NEXT.JS — NODE.JS — CREATIVE — </span>
          </div>
        </div>

        {/* SKILLS SECTION */}
        <section id="skills">
          <div className="container">
            <div className="section-heading">
              <span style={{ fontFamily: "var(--syne)", color: "var(--accent)", fontSize: "0.9rem", letterSpacing: "3px", textTransform: "uppercase" }}>WHAT I USE</span>
              <h2 style={{ fontSize: "3rem", fontFamily: "var(--syne)", marginTop: "12px" }}>TECH STACK</h2>
            </div>
            <div className="divider"></div>
            <div className="skills-scroller reveal-up">
              <div className="skills-track">
                {[...skills, ...skills].map((skill, index) => (
                  <div key={`${skill.name}-${index}`} className="skill-card">
                    <div className="skill-icon" style={{ color: skill.color }}>{skill.icon}</div>
                    <div className="skill-name">{skill.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="container">
          <div className="sticky-type">WORK</div>
          <div className="section-heading">
            <span style={{ fontFamily: "var(--syne)", color: "var(--accent)", fontSize: "0.9rem", letterSpacing: "3px", textTransform: "uppercase" }}>MY WORK</span>
            <h2 style={{ fontSize: "3rem", fontFamily: "var(--syne)", marginTop: "12px" }}>FEATURED PROJECTS</h2>
          </div>
          <div className="divider"></div>
          {projects.map((project, index) => (
            <div key={project.title} className="project-row" data-aos="fade-up" data-aos-duration="1000" style={index % 2 !== 0 ? { flexDirection: "row-reverse" } : undefined}>
              <div className="project-info">
                <span style={{ fontFamily: "var(--syne)", color: "var(--accent)" }}>
                  {String(index + 1).padStart(3, "0")} / PROJECT
                </span>
                <h3 className="huge-type" style={{ fontSize: "clamp(1.8rem, 8vw, 4rem)", margin: "20px 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", lineHeight: "1.2" }}>
                  {project.title.split(" ")[0].toUpperCase()}
                </h3>
                <p>{project.desc}</p>
                <div className="project-tags" data-aos="fade-up" data-aos-delay="100">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                </div>
                <div className="divider"></div>
                <div style={{ display: "flex", gap: "16px" }} data-aos="fade-up" data-aos-delay="200">
                  <a href="#" className="project-link-btn outline">
                    <FaExternalLinkAlt style={{ marginRight: 6 }} /> Live Demo
                  </a>
                  <a href="#" className="project-link-btn outline">
                    <FaGithub style={{ marginRight: 6 }} /> Source Code
                  </a>
                </div>
              </div>
              <div className="project-media">
                <img src={project.image} alt={project.title} className="project-image" loading="lazy" />
                <div className="floating-label huge-type outline-text" style={index % 2 !== 0 ? { fontSize: "clamp(4rem, 15vw, 8rem)", right: "auto", left: "-50px" } : { fontSize: "clamp(4rem, 15vw, 8rem)" }}>
                  {project.title.split(" ").pop()?.toUpperCase()}
                </div>
              </div>
            </div>
          ))}
          <div style={{ textAlign: "center", marginTop: "60px" }} data-aos="zoom-in" data-aos-delay="300">
            <a href="/projects" className="show-all-btn">Show All Projects</a>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="experience-section">
          <div className="container">
            <div className="section-heading">
              <span style={{ fontFamily: "var(--syne)", color: "var(--accent)", fontSize: "0.9rem", letterSpacing: "3px", textTransform: "uppercase" }}>MY JOURNEY</span>
              <h2 style={{ fontSize: "3rem", fontFamily: "var(--syne)", marginTop: "12px" }}>EXPERIENCE & EDUCATION</h2>
            </div>
            <VerticalTimeline lineColor="rgba(255,255,255,0.08)">
              {experiences.map((exp, index) => (
                <VerticalTimelineElement
                  key={index}
                  className="vertical-timeline-element"
                  contentStyle={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                    padding: "28px 32px",
                  }}
                  contentArrowStyle={{ borderRight: "7px solid rgba(255,255,255,0.08)" }}
                  date={exp.date}
                  dateClassName="timeline-date"
                  iconStyle={{
                    background: exp.iconBg,
                    color: "#fff",
                    boxShadow: "0 0 0 4px rgba(37,99,235,0.3), 0 4px 20px rgba(0,0,0,0.4)",
                  }}
                  icon={exp.icon}
                >
                  <h3 className="timeline-title">{exp.title}</h3>
                  <h4 className="timeline-subtitle">{exp.subtitle}</h4>
                  <p className="timeline-desc">{exp.description}</p>
                </VerticalTimelineElement>
              ))}
            </VerticalTimeline>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <footer id="contact">
          <div className="container">
            <div className="footer-cta-vertical">
              <span className="footer-cta-word">LET&apos;S</span>
              <span className="footer-cta-word footer-cta-outline">CONNECT</span>
            </div>
            <div className="divider"></div>
            <div className="contact-info-grid">
              <div className="contact-info-item">
                <FaEnvelope className="contact-icon" />
                <div>
                  <span className="contact-label">EMAIL</span>
                  <a href="mailto:hello@hanifabdusy.dev" className="contact-value">
                    hello@hanifabdusy.dev
                  </a>
                </div>
              </div>
              <div className="contact-info-item">
                <FaLinkedinIn className="contact-icon" />
                <div>
                  <span className="contact-label">LINKEDIN</span>
                  <a href="https://www.linkedin.com/in/hanif-abdusy" target="_blank" rel="noopener noreferrer" className="contact-value">
                    linkedin.com/in/hanif-abdusy
                  </a>
                </div>
              </div>
              <div className="contact-info-item">
                <FaGithub className="contact-icon" />
                <div>
                  <span className="contact-label">GITHUB</span>
                  <a href="https://github.com/hnf71z" target="_blank" rel="noopener noreferrer" className="contact-value">
                    github.com/hnf71z
                  </a>
                </div>
              </div>
            </div>
            <div className="divider"></div>
            <div className="footer-bottom">
              <div>© 2026 HANIF ABDUSY</div>
              <div>FRONTEND DEVELOPER</div>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
