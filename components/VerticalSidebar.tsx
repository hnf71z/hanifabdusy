"use client"

import { useState, useEffect } from "react"
import { FaHome, FaCode, FaExternalLinkAlt, FaGraduationCap, FaEnvelope, FaSun, FaMoon } from "react-icons/fa"

interface NavItem {
  id: string
  icon: React.ReactNode
  label: string
  href: string
}

const navItems: NavItem[] = [
  { id: "home", icon: <FaHome />, label: "Home", href: "#hero" },
  { id: "skills", icon: <FaCode />, label: "Skills", href: "#skills" },
  { id: "projects", icon: <FaExternalLinkAlt />, label: "Projects", href: "#projects" },
  { id: "experience", icon: <FaGraduationCap />, label: "Experience", href: "#experience" },
  { id: "contact", icon: <FaEnvelope />, label: "Contact", href: "#contact" },
]

interface VerticalSidebarProps {
  darkMode: boolean
  setDarkMode: (value: boolean) => void
}

export default function VerticalSidebar({ darkMode, setDarkMode }: VerticalSidebarProps) {
  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className="vertical-sidebar">
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className="sidebar-item"
            data-tooltip={item.label}
          >
            {item.icon}
          </a>
        ))}
      </nav>
      
      <button
        className="sidebar-theme-toggle"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        data-tooltip={darkMode ? "Light Mode" : "Dark Mode"}
      >
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>
    </div>
  )
}