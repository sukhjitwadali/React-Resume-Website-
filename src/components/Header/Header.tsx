"use client"

import type React from "react"
import styles from "./Header.module.css"

interface PersonalInfo {
  name: string
  title: string
  email: string
  phone: string
  location: string
  linkedin: string
  github: string
}

interface HeaderProps {
  personalInfo: PersonalInfo
  isDarkMode: boolean
  toggleTheme: () => void
  activeSection: string
  setActiveSection: (section: string) => void
}

const Header: React.FC<HeaderProps> = ({ personalInfo, isDarkMode, toggleTheme, activeSection, setActiveSection }) => {
  const navItems = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ]

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.profile}>
          <h1 className={styles.name}>{personalInfo.name}</h1>
          <p className={styles.title}>{personalInfo.title}</p>
          <p className={styles.location}>{personalInfo.location}</p>
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`${styles.navButton} ${activeSection === item.id ? styles.active : ""}`}
              onClick={() => setActiveSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button className={styles.themeToggle} onClick={toggleTheme} title="Toggle theme">
          {isDarkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  )
}

export default Header
