
// =============================================================================
// Centralized data definitions for the portfolio.
// Import from here instead of duplicating data across pages.
// =============================================================================

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface Project {
  slug: string
  title: string
  desc: string
  tags: string[]
  image: string
  images: string[]
  content: string
  link: string
  github: string
}

export interface Experience {
  title: string
  subtitle: string
  description: string
  date: string
  iconType: "code" | "graduation"
  iconBg: string
}

export interface Certificate {
  title: string
  credentialId: string
  link: string
}

// -----------------------------------------------------------------------------
// Projects
// -----------------------------------------------------------------------------

export const projects: Project[] = [
  {
    slug: "ai-learning-insight",
    title: "AI Learning Insight",
    desc: "Full-stack e-commerce web app with product catalog, cart system, and payment integration. Built to be responsive and highly performant.",
    tags: ["React.js", "Express", "Supabase", "AI/ML"],
    image: "/ai-learning-insight-landingpage.webp",
    images: [
      "/ai-learning-insight-landingpage.webp",
      "/ai-learning-insight.webp",
    ],
    content:
      "This project aims to simplify online shopping with a clean and intuitive user interface. It features a complete shopping cart system, user authentication, and fully working Stripe payment integration.",
    link: "https://ai-learning-insight-dicoding.vercel.app/",
    github: "#",
  },
  {
    slug: "si-ami-polines",
    title: "SI-AMI Polines",
    desc: "Collaborative task management tool with drag-and-drop boards and real-time updates.",
    tags: ["React", "Express", "Socket.io"],
    image: "/login-page-siami.webp",
    images: [
      "/login-page-siami.webp",
      "/dashboard-admin-01.webp",
      "/periode-audit-02.webp",
      "/daftar-tilik-03.webp",
    ],
    content:
      "Developed a real-time collaborative workspace where users can track their tasks using a drag-and-drop Kanban board interface.",
    link: "#",
    github: "#",
  },
  {
    slug: "iot-forecasting-weather-with-flutter",
    title: "IOT Forecasting Weather With Flutter",
    desc: "IoT-based weather forecasting application built with Flutter, providing real-time weather data visualization and prediction.",
    tags: ["Flutter", "IoT", "Firebase"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    ],
    content:
      "An IoT-driven weather forecasting app that collects sensor data and presents it through a beautiful Flutter interface with charts and real-time updates.",
    link: "#",
    github: "#",
  },
  {
    slug: "polivent",
    title: "POLIVENT",
    desc: "Event management platform for campus communities with registration, scheduling, and notification features.",
    tags: ["Flutter", "Laravel", "MySQL"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    ],
    content:
      "POLIVENT is a campus event management platform that enables students and organizations to create, manage, and participate in events with a seamless digital experience.",
    link: "#",
    github: "#",
  },
  {
    slug: "delima-website",
    title: "Delima Website",
    desc: "Modern organizational website featuring scroll-driven animations, glassmorphism, and responsive design.",
    tags: ["Next.js", "CSS3", "TypeScript"],
    image: "/delima-umkm.webp",
    images: [
      "/delima-umkm.webp",
      "/delima-02.webp",
      "/delima-03.webp",
      "/delima-04.webp",
      "/delima-05.webp",
      "/delima-06.webp",
      "/delima-07.webp",
    ],
    content:
      "A creatively designed organizational website using highly optimized CSS, smooth scroll-driven animations, and a premium glassmorphism aesthetic.",
    link: "#",
    github: "#",
  },
  {
    slug: "personal-notes",
    title: "Personal Notes",
    desc: "A clean and minimalist note-taking web application with archive, search, and theme support.",
    tags: ["React", "CSS3", "LocalStorage"],
    image: "/personal-notes.webp",
    images: [
      "/personal-notes.webp",
      "/catatan-aktif.webp",
      "/input-catatan.webp",
      "/arsip-catatan.webp",
    ],
    content:
      "Personal Notes is a lightweight note-taking app that supports creating, archiving, searching, and deleting notes — all stored locally in the browser.",
    link: "#",
    github: "#",
  },
]

// -----------------------------------------------------------------------------
// Helper: find a project by its slug
// -----------------------------------------------------------------------------

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

// -----------------------------------------------------------------------------
// Experiences
// -----------------------------------------------------------------------------

export const experiences: Experience[] = [
  {
    title: "Frontend Developer",
    subtitle: "Self-Learning",
    description:
      "Building modern web applications using React, Next.js, and Node.js. Focused on creating pixel-perfect, responsive UI with exceptional user experience.",
    date: "2026 — Present",
    iconType: "code",
    iconBg: "#2563eb",
  },
  {
    title: "Dicoding Asah",
    subtitle: "Web Development Learning Path",
    description:
      "Completed comprehensive web development courses covering front-end fundamentals, JavaScript programming, and building progressive web applications.",
    date: "2025",
    iconType: "graduation",
    iconBg: "#1d4ed8",
  },
  {
    title: "UKM Polytechnic Computer Club",
    subtitle: "Workshop Division",
    description:
      "Responsible for supervising and managing departments within the Workshop Division (Software, Network, Multimedia), coordinating training programs organized by UKM PCC, and developing the hard skills of members and management of UKM PCC.",
    date: "2024 - 2025",
    iconType: "graduation",
    iconBg: "#1d4ed8",
  },
  {
    title: "Semarang State Polytechnic",
    subtitle: "Computer Engineering Technology",
    description:
      "Completed comprehensive web development courses covering front-end fundamentals, JavaScript programming, and building progressive web applications.",
    date: "2023 - Present",
    iconType: "graduation",
    iconBg: "#1d4ed8",
  },
]

// -----------------------------------------------------------------------------
// Certificates
// -----------------------------------------------------------------------------

export const certificates: Certificate[] = [
  {
    title: "Front-End Web Development",
    credentialId: "DICODING/FE-2025/001",
    link: "#",
  },
  {
    title: "JavaScript Fundamentals",
    credentialId: "DICODING/JS-2024/042",
    link: "#",
  },
  {
    title: "React Web Apps",
    credentialId: "DICODING/REACT-2025/017",
    link: "#",
  },
  {
    title: "Responsive Web Design",
    credentialId: "FCC/RWD-2024/A1B2C3",
    link: "#",
  },
  {
    title: "Back-End Development",
    credentialId: "DICODING/BE-2025/089",
    link: "#",
  },
  {
    title: "Version Control with Git",
    credentialId: "COURSERA/GIT-2024/X9Y8Z7",
    link: "#",
  },
]

// -----------------------------------------------------------------------------
// Skills (raw data only — icons are JSX and resolved in the component)
// -----------------------------------------------------------------------------

export interface Skill {
  name: string
  color: string
  iconKey: "html5" | "css3" | "js" | "react" | "nextjs" | "nodejs" | "express"
}

export const skills: Skill[] = [
  { name: "HTML5", color: "#E34F26", iconKey: "html5" },
  { name: "CSS3", color: "#1572B6", iconKey: "css3" },
  { name: "JavaScript", color: "#F7DF1E", iconKey: "js" },
  { name: "React", color: "#61DAFB", iconKey: "react" },
  { name: "Next.js", color: "currentColor", iconKey: "nextjs" },
  { name: "Node.js", color: "#339933", iconKey: "nodejs" },
  { name: "Express", color: "currentColor", iconKey: "express" },
]
