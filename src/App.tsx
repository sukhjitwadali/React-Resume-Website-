"use client"

import type React from "react"
import { useState } from "react"
import Header from "./components/Header/Header"
import About from "./components/About/About"
import Experience from "./components/Experience/Experience"
import Projects from "./components/Projects/Projects"
import Education from "./components/Education/Education"
import Skills from "./components/Skills/Skills"
import Contact from "./components/Contact/Contact"
import styles from "./App.module.css"

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeSection, setActiveSection] = useState("about")

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const personalInfo = {
    name: "Sukhjit Singh",
    title: "Software Developer",
    email: "sukhwadali1@gmail.com",
    phone: "519-731-0613",
    location: "Toronto, ON",
    linkedin: "linkedin.com/in/sukhjit-wadali",
    github: "github.com/sukhjitwadali",
  }

  const aboutData = {
    summary:
      "Results-driven software developer with 5 years of experience delivering scalable enterprise applications using Python, Django, and AWS. Proven ability to optimize performance, mentor teams, and streamline full SDLC projects. Seeking a co-op role to contribute technical expertise and accelerate enterprise software delivery.",
    image: "/placeholder.svg?height=200&width=200",
  }

  return (
    <div className={`${styles.app} ${isDarkMode ? styles.darkMode : styles.lightMode}`}>
      <Header
        personalInfo={personalInfo}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main className={styles.main}>
        {activeSection === "about" && <About data={aboutData} />}
        {activeSection === "experience" && <Experience />}
        {activeSection === "projects" && <Projects />}
        {activeSection === "education" && <Education />}
        {activeSection === "skills" && <Skills />}
        {activeSection === "contact" && <Contact personalInfo={personalInfo} />}
      </main>
    </div>
  )
}

export default App
