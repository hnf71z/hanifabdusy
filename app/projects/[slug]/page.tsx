"use client"

import { useEffect, useState, use, useCallback } from "react"
import { FaArrowLeft, FaExternalLinkAlt, FaGithub } from "react-icons/fa"
import Image from "next/image"
import { getProjectBySlug } from "@/lib/data"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"

export default function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") !== "light"
    }
    return true
  })

  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slideCount, setSlideCount] = useState(0)

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

  // Carousel slide tracking
  const onSelect = useCallback(() => {
    if (!carouselApi) return
    setCurrentSlide(carouselApi.selectedScrollSnap())
  }, [carouselApi])

  useEffect(() => {
    if (!carouselApi) return
    setSlideCount(carouselApi.scrollSnapList().length)
    setCurrentSlide(carouselApi.selectedScrollSnap())
    carouselApi.on("select", onSelect)
    return () => {
      carouselApi.off("select", onSelect)
    }
  }, [carouselApi, onSelect])

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

          {/* Project Image Carousel */}
          <div className="project-carousel-wrapper">
            {/* Left arrow — outside the card */}
            {project.images.length > 1 && (
              <button
                className="project-carousel-prev"
                onClick={() => carouselApi?.scrollPrev()}
                aria-label="Previous slide"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
            )}

            {/* Carousel */}
            <div className="project-carousel-inner">
              <Carousel
                setApi={setCarouselApi}
                opts={{ loop: true }}
                className="project-carousel"
              >
                <CarouselContent>
                  {project.video && (
                    <CarouselItem>
                      <div className="project-carousel-slide">
                        <iframe
                          src={`https://www.youtube.com/embed/${project.video}?rel=0`}
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                          className="project-carousel-img"
                          style={{ width: "100%", height: "100%", border: "none" }}
                        />
                      </div>
                    </CarouselItem>
                  )}
                  {project.images.map((img, index) => (
                    <CarouselItem key={index}>
                      <div className="project-carousel-slide">
                        <Image
                          src={img}
                          alt={`${project.title} - Screenshot ${index + 1}`}
                          width={1200}
                          height={800}
                          priority={index === 0 && !project.video}
                          className="project-carousel-img"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
              
              {/* Slide counter diletakkan di dalam container gambar agar bisa absolute di kiri bawah */}
              {project.images.length > 1 && (
                <div className="project-carousel-counter">
                  {currentSlide + 1} / {slideCount}
                </div>
              )}
            </div>

            {/* Right arrow — outside the card */}
            {project.images.length > 1 && (
              <button
                className="project-carousel-next"
                onClick={() => carouselApi?.scrollNext()}
                aria-label="Next slide"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            )}
          </div>

          {/* Bottom controls: dots */}
          {project.images.length > 1 && (
            <div className="project-carousel-controls">
              <div className="project-carousel-dots">
                {project.images.map((_, index) => (
                  <button
                    key={index}
                    className={`project-carousel-dot${currentSlide === index ? " active" : ""}`}
                    onClick={() => carouselApi?.scrollTo(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          )}

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


