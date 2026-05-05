"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import "react-vertical-timeline-component/style.min.css"

const Typewriter = dynamic(() => import("typewriter-effect"), { ssr: false })
const VerticalTimeline = dynamic(() => import("react-vertical-timeline-component").then(m => m.VerticalTimeline), { ssr: false })
const VerticalTimelineElement = dynamic(() => import("react-vertical-timeline-component").then(m => m.VerticalTimelineElement), { ssr: false })
const GitHubCalendar = dynamic(() => import("react-github-calendar").then(m => m.GitHubCalendar), { ssr: false })
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
import { Highlighter } from "@/components/ui/highlighter"
import CardSwap, { Card } from "@/components/CardSwap"
import AOS from "aos"
import "aos/dist/aos.css"
import { SiNextdotjs, SiExpress } from "react-icons/si"
import { projects, experiences, certificates, skills, type Skill } from "@/lib/data"

// Map iconKey strings from data to actual React icon components
const skillIconMap: Record<Skill["iconKey"], React.ReactNode> = {
  html5: <FaHtml5 />,
  css3: <FaCss3Alt />,
  js: <FaJs />,
  react: <FaReact />,
  nextjs: <SiNextdotjs />,
  nodejs: <FaNodeJs />,
  express: <SiExpress />,
}

const experienceIconMap: Record<string, React.ReactNode> = {
  code: <FaCode />,
  graduation: <FaGraduationCap />,
}

export default function Home() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") !== "light"
    }
    return true
  })
  const [mounted, setMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [navVisible, setNavVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Theme toggle effect
  useEffect(() => {
    setMounted(true)
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

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 767) setMenuOpen(false)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Navigation scroll hide/show
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setNavVisible(false)
      } else {
        setNavVisible(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

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

      <nav className={!navVisible ? "nav-hidden" : ""}>
        <ul className={`nav-links${menuOpen ? " nav-open" : ""}`}>
          <li><a href="#hero" onClick={() => setMenuOpen(false)}>Home</a></li>
          <li><a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a></li>
          <li><a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a></li>
          <li><a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a></li>
          <li><a href="#contact" onClick={() => setMenuOpen(false)} className="contact-btn">Contact</a></li>
        </ul>
        <div className="nav-actions">
          <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)} aria-label="Toggle theme">
            <span className="toggle-bg"></span>
            <span className="toggle-knob">
              {mounted ? (darkMode ? <FaSun /> : <FaMoon />) : <FaSun />}
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
              <div className="reveal-up" style={{ fontSize: "1.5rem", fontWeight: 300, color: "var(--fg)", opacity: 0.9, marginBottom: "40px", animationDelay: "0.2s", minHeight: "80px", lineHeight: "1.6" }}>
                Passionate about building <Highlighter isView={true} color="rgba(37, 99, 235, 0.2)">modern, responsive</Highlighter>, and visually stunning web applications. 
                Turning ideas into elegant digital solutions with <Highlighter isView={true} color="rgba(16, 185, 129, 0.2)">clean code</Highlighter> and <Highlighter isView={true} color="rgba(139, 92, 246, 0.2)">creative design</Highlighter>.
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
              <span style={{ fontFamily: "var(--syne)", fontSize: "0.9rem", letterSpacing: "3px", textTransform: "uppercase" }} className="section-label">WHAT I USE</span>
              <h2 style={{ fontSize: "3rem", fontFamily: "var(--syne)", marginTop: "12px" }}>TECH STACK</h2>
            </div>
            <div className="divider"></div>
            <div className="skills-scroller reveal-up">
              <div className="skills-track">
                {[...skills, ...skills].map((skill, index) => (
                  <div key={`${skill.name}-${index}`} className="skill-card">
                    <div className="skill-icon" style={{ color: skill.color }}>{skillIconMap[skill.iconKey]}</div>
                    <div className="skill-name">{skill.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* GITHUB ACTIVITY */}
        <section id="github" className="github-section">
          <div className="container">
            <h3 className="github-title">@hnf71z on GitHub</h3>
            <div className="github-calendar-wrapper" data-aos="fade-up">
              <GitHubCalendar
                username="hnf71z"
                colorScheme={darkMode ? "dark" : "light"}
                blockSize={15}
                blockMargin={5}
                blockRadius={3}
                fontSize={14}
              />
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="container">
          <div className="sticky-type">WORK</div>
          <div className="section-heading">
            <span style={{ fontFamily: "var(--syne)", fontSize: "0.9rem", letterSpacing: "3px", textTransform: "uppercase" }} className="section-label">MY WORK</span>
            <h2 style={{ fontSize: "3rem", fontFamily: "var(--syne)", marginTop: "12px" }}>FEATURED PROJECTS</h2>
          </div>
          <div className="divider"></div>
          <div className="cardswap-wrapper">
            <CardSwap
              width={800}
              height={500}
              cardDistance={60}
              verticalDistance={70}
              delay={2000}
              pauseOnHover={true}
              easing="elastic"
            >
              {projects.slice(0, 3).map((project, index) => (
                <Card key={project.title} customClass="project-card">
                  <div className="project-card-content">
                    <div className="project-image">
                      <img src={project.image} alt={project.title} />
                    </div>
                    <div className="project-info">
                      <span className="project-number">
                        {String(index + 1).padStart(3, "0")} / PROJECT
                      </span>
                      <h3 className="project-title">{project.title}</h3>
                      <p className="project-desc">{project.desc}</p>
                      <div className="project-tags">
                        {project.tags.map((tag) => (
                          <span key={tag} className="project-tag">{tag}</span>
                        ))}
                      </div>
                      <div className="project-links">
                        <a href="#" className="project-link-btn">
                          <FaExternalLinkAlt /> Live Demo
                        </a>
                        <a href="#" className="project-link-btn">
                          <FaGithub /> Source
                        </a>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </CardSwap>
          </div>
          <div style={{ textAlign: "center", marginTop: "60px" }} data-aos="zoom-in" data-aos-delay="300">
            <a href="/projects" className="show-all-btn">Show All Projects</a>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="experience-section">
          <div className="container">
            <div className="section-heading">
              <span style={{ fontFamily: "var(--syne)", fontSize: "0.9rem", letterSpacing: "3px", textTransform: "uppercase" }} className="section-label">MY JOURNEY</span>
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
                  icon={experienceIconMap[exp.iconType]}
                >
                  <h3 className="timeline-title">{exp.title}</h3>
                  <h4 className="timeline-subtitle">{exp.subtitle}</h4>
                  <p className="timeline-desc">{exp.description}</p>
                </VerticalTimelineElement>
              ))}
            </VerticalTimeline>
          </div>
        </section>

        {/* CERTIFICATES SECTION */}
        <section id="certificates" className="container" style={{ paddingTop: "60px", paddingBottom: "100px" }}>
          <div className="section-heading">
            <span style={{ fontFamily: "var(--syne)", fontSize: "0.9rem", letterSpacing: "3px", textTransform: "uppercase" }} className="section-label">ACHIEVEMENTS</span>
            <h2 style={{ fontSize: "3rem", fontFamily: "var(--syne)", marginTop: "12px" }}>CERTIFICATES</h2>
          </div>
          <div className="divider" style={{ marginBottom: "60px" }}></div>

          <div className="certificates-grid">
            {certificates.map((cert, index) => (
              <div key={index} className="cert-card" data-aos="fade-up" data-aos-delay={index * 80}>
                <h3 className="cert-title">{cert.title}</h3>
                <div className="cert-credential">
                  <span className="cert-credential-label">CREDENTIAL ID</span>
                  <span className="cert-credential-id">{cert.credentialId}</span>
                </div>
                <a href={cert.link} target="_blank" rel="noopener noreferrer" className="cert-link">
                  View Certificate <FaExternalLinkAlt />
                </a>
              </div>
            ))}
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
