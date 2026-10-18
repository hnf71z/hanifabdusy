export interface Project {
  slug: string
  title: string
  desc: string
  tags: string[]
  image: string
  images: string[]
  video?: string
  pdf?: string
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

export const projects: Project[] = [
  {
    slug: "ai-learning-insight",
    title: "AI Learning Insight",
    desc: "AI Learning Insight Dicoding is an IT learning platform with learning pattern prediction features to help improve users’ learning quality.",
    tags: ["React.js", "Express", "Supabase", "AI Prediction"],
    image: "/ai-insight/ai-learning-insight-landingpage.webp",
    images: [
      "/ai-insight/ai-learning-insight-landingpage.webp",
      "/ai-insight/ai-insight-02.webp",
      "/ai-insight/ai-insight-03.webp",
      "/ai-insight/ai-insight-04.webp",
    ],
    video: "QR11StxPU4Q",
    pdf: "/pdf/ai-learning-insight-guide-book.pdf",
    content:
      "An intelligent IT learning platform powered by AI algorithms that analyze learning patterns and provide personalized recommendations. Features progress tracking, adaptive learning paths, and data-driven insights to help students optimize their learning journey.",
    link: "https://ai-learning-insight-dicoding.vercel.app/",
    github: "#",
  },
  {
    slug: "si-ami-polines",
    title: "SI-AMI Polines",
    desc: "Collaborative task management tool with drag-and-drop boards and real-time updates.",
    tags: ["Laravel", "MySQL", "Flowbite", "Tailwind CSS"],
    image: "/siami/login-page-siami.webp",
    images: [
      "/siami/login-page-siami.webp",
      "/siami/dashboard-admin-01.webp",
      "/siami/periode-audit-02.webp",
      "/siami/daftar-tilik-03.webp",
    ],
    video: "OVdSFwrzB8k",
    pdf: "/pdf/siami-guide-book.pdf",
    content:
      "A comprehensive audit management system for Semarang State Polytechnic that streamlines internal audit processes. Features include real-time audit tracking, audit plan management, audit item (tilik) handling, and an intuitive admin dashboard for efficient collaboration.",
    link: "#",
    github: "#",
  },
  {
    slug: "polivent",
    title: "POLIVENT",
    desc: "Event management platform for campus communities with registration, scheduling, and notification features.",
    tags: ["Flutter", "Laravel", "MySQL"],
    image: "/polivent/pbl-polivent-image.webp",
    images: [
      "/polivent/pbl-polivent-image.webp",
    ],
    video: "W_PYCl4RyPk",
    pdf: "/pdf/polivent-guide-book.pdf",
    content:
      "A campus event management platform enabling students and organizations to create, manage, and coordinate events seamlessly. Includes event registration, activity scheduling, participant notifications, and a dual-platform solution (Flutter mobile + Laravel backend) for accessibility.",
    link: "#",
    github: "#",
  },
  {
    slug: "teman-coffe",
    title: "Teman Coffe",
    desc: "TemanCoffee is a modern coffee shop website with an interactive interface, online ordering, and an admin dashboard.",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "Supabase"],
    image: "/temancoffe/temancoffe-hero.webp",
    images: [
      "/temancoffe/temancoffe-hero.webp",
      "/temancoffe/temancoffe-menu.webp",
      "/temancoffe/temancoffe-chat.webp",
      "/temancoffe/temancoffe-login.webp",
      "/temancoffe/temancoffe-dashboard.webp",
      "/temancoffe/temancoffe-manajemenproduk.webp",
      "/temancoffe/temancoffe-detailpesanan.webp"
    ],
    content:
      "TemanCoffee is a modern coffee shop website that integrates an interactive user interface, an online ordering system, and an admin dashboard. Customers can easily browse the menu and place orders, while administrators can manage products, monitor orders, and analyze sales data efficiently.",
    link: "https://temancoffe.vercel.app/",
    github: "#",
  },
  {
    slug: "rapier-absensi",
    title: "Rapier Absensi",
    desc: "IoT-based employee attendance and workforce management system with real-time RFID tracking.",
    tags: ["SvelteKit", "Express.js", "PostgreSQL", "IoT RFID"],
    image: "/rapier-absensi/rapier-login.webp",
    images: [
      "/rapier-absensi/rapier-login.webp",
      "/rapier-absensi/iot-rapier.webp",
      "/rapier-absensi/rapier-dashboard.webp",
      "/rapier-absensi/rapier-dashboard-karyawan.webp",
      "/rapier-absensi/rapier-rekap-harian.webp",
      "/rapier-absensi/rapier-laporan-absensi.webp",
      "/rapier-absensi/rapier-ringkasan-laporan.webp",
      "/rapier-absensi/rapier-detail-keterlambatan.webp",
      "/rapier-absensi/rapier-manajemen-tugas.webp",
    ],
    content:
      "Rapier Absensi is an end-to-end IoT-powered employee attendance and workforce management platform. Integrated with physical RFID card hardware (ESP32 / RC522), it enables instant contactless check-ins and check-outs synchronized in real time via Socket.IO. The platform features role-based access for Admins, HR officers, and Employees, providing interactive dashboards, automated late-arrival calculations, shift and task management, daily recap logs, and downloadable periodic attendance reports in Excel and PDF formats.",
    link: "#",
    github: "#",
  },
  {
    slug: "iot-forecasting-weather-with-flutter",
    title: "IOT Forecasting Weather With Flutter",
    desc: "IoT-based weather forecasting application built with Flutter, providing real-time weather data visualization and prediction.",
    tags: ["Flutter", "IoT", "Firebase", "AI Prediction"],
    image: "/iot-weather-prediction/iot-page.webp",
    images: [
      "/iot-weather-prediction/iot-page.webp",
    ],
    video: "EncEIESbwjg",
    pdf: "/pdf/artikel-tubes-iot.pdf",
    content:
      "An IoT-powered weather forecasting app built with Flutter that integrates hardware sensors with machine learning algorithms. Features real-time sensor data collection, interactive charts, historical analysis, and accurate weather predictions through intelligent AI processing.",
    link: "#",
    github: "#",
  },
  {
    slug: "delima-website",
    title: "Delima Website",
    desc: "Modern organizational website featuring scroll-driven animations, glassmorphism, and responsive design.",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "ShadCN UI"],
    image: "/delima/delima-umkm.webp",
    images: [
      "/delima/delima-umkm.webp",
      "/delima/delima-02.webp",
      "/delima/delima-04.webp",
      "/delima/delima-05.webp",
      "/delima/delima-06.webp",
      "/delima/delima-07.webp",
    ],
    content:
      "A modern organizational website featuring smooth scroll-driven animations, glassmorphism design patterns, and fully responsive layouts. Built with Next.js and Tailwind CSS, showcasing advanced CSS techniques and premium UX across all devices.",
    link: "https://delimafnb.vercel.app/",
    github: "#",
  },
  {
    slug: "personal-notes",
    title: "Personal Notes",
    desc: "A clean and minimalist note-taking web application with archive, search, and theme support.",
    tags: ["React", "CSS3", "LocalStorage"],
    image: "/personal-notes/personal-notes.webp",
    images: [
      "/personal-notes/personal-notes.webp",
      "/personal-notes/catatan-aktif.webp",
      "/personal-notes/input-catatan.webp",
      "/personal-notes/arsip-catatan.webp",
    ],
    content:
      "A minimalist note-taking app with local storage support. Create, archive, search, and delete notes seamlessly with a clean, intuitive interface and offline accessibility.",
    link: "https://personal-note-app-sepia.vercel.app/login",
    github: "#",
  },
  {
    slug: "bensco",
    title: "BENSCO",
    desc: "Warehouse Management System (WMS) for PT. Bensco to efficiently manage spare parts inventory from receiving to dispatch.",
    tags: ["WMS", "Inventory Management", "Dashboard", "Web Application"],
    image: "/bensco/bensco-dashboard.webp",
    images: [
      "/bensco/bensco-login.webp",
      "/bensco/bensco-dashboard.webp",
      "/bensco/bensco-tambahpo.webp",
      "/bensco/bensco-listpo.webp",
      "/bensco/bensco-orderproduk.webp",
      "/bensco/bensco-akses.webp",
      "/bensco/bensco-process.webp",
    ],
    content:
      "The Warehouse Management System (WMS) at PT. Bensco is designed to efficiently manage spare parts inventory, covering the complete lifecycle from goods receiving and storage to picking and dispatch. The system enables spare parts categorization based on specific types or operational requirements, significantly accelerating item retrieval and streamlining material handling processes.",
    link: "#",
    github: "#",
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export const experiences: Experience[] = [
  {
    title: "Frontend Developer Intern",
    subtitle: "PT. Rapier Technology",
    description:
      "Building modern web applications using React, Next.js, and Node.js. Focused on creating pixel-perfect, responsive UI with exceptional user experience.",
    date: "August 2026 — December 2026",
    iconType: "code",
    iconBg: "#2563eb",
  },
  {
    title: "Web Developer",
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

export const certificates: Certificate[] = [
  {
    title: "Becoming a React Web Developer Expert",
    credentialId: "QLZ9929VMZ5D",
    link: "https://www.dicoding.com/certificates/QLZ9929VMZ5D",
  },
  {
    title: "Basic Web Programming",
    credentialId: "RVZKG6K6OXD5",
    link: "https://www.dicoding.com/certificates/RVZKG6K6OXD5",
  },
  {
    title: "Fundamentals of Web Applications with React",
    credentialId: "EYX4KVO26PDL",
    link: "https://www.dicoding.com/certificates/EYX4KVO26PDL",
  },
  {
    title: "Building Front-End Web for Beginners",
    credentialId: "1RXYQ603QZVM",
    link: "https://www.dicoding.com/certificates/1RXYQ603QZVM",
  },
  {
    title: "Basic JavaScript Programming",
    credentialId: "N9ZO2DJRRPG5",
    link: "https://www.dicoding.com/certificates/N9ZO2DJRRPG5",
  },
  {
    title: "Building Web Applications with React",
    credentialId: "MEPJ2J5OLP3V",
    link: "https://www.dicoding.com/certificates/MEPJ2J5OLP3V",
  },
]

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
