"use client"

import type React from "react"
import { useState } from "react"
import styles from "./Projects.module.css"

interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  image: string
  achievements: string[]
  role: string
  featured: boolean
}

const Projects: React.FC = () => {
  const [showAll, setShowAll] = useState(false)

  const projects: Project[] = [
    {
      id: 1,
      title: "ConnectToClinic",
      description:
        "AI-driven healthcare platform that revolutionized medical consultations and appointment booking systems.",
      technologies: ["Python", "Django", "AI/ML", "AWS", "MySQL", "REST APIs"],
      image: "/placeholder.svg?height=200&width=300",
      achievements: [
        "Supporting 31k+ doctors and 900k+ consultations",
        "Increased booking efficiency by 40%",
        "Improved provider decision-making speed by 25%",
        "Integrated comprehensive dashboards for healthcare providers",
      ],
      role: "Tech Lead",
      featured: true,
    },
    {
      id: 2,
      title: "SBIG Insurance App",
      description: "Scalable insurance application handling claims processing and provider network management.",
      technologies: ["Django REST Framework", "Python", "MySQL", "AWS", "API Optimization"],
      image: "/placeholder.svg?height=200&width=300",
      achievements: [
        "Built scalable app with 16k+ hospitals & 7k+ garages",
        "Processing 10k+ claims per month",
        "Optimized REST APIs, boosting data retrieval speed by 35%",
        "Developed comprehensive claims management system",
      ],
      role: "Tech Lead",
      featured: true,
    },
    {
      id: 3,
      title: "Enterprise Web Application",
      description: "Web-based application using serverless architecture to streamline client operations.",
      technologies: ["AWS Lambda", "Python", "MySQL", "Serverless Architecture"],
      image: "/placeholder.svg?height=200&width=300",
      achievements: [
        "Streamlined client operations with automated workflows",
        "Implemented serverless architecture for cost optimization",
        "Reduced operational overhead by 40%",
        "Enhanced system scalability and reliability",
      ],
      role: "Technical Lead",
      featured: false,
    },
  ]

  const displayedProjects = showAll ? projects : projects.filter((p) => p.featured)

  return (
    <section className={styles.projects}>
      <h2 className={styles.title}>Key Projects</h2>
      <div className={styles.projectGrid}>
        {displayedProjects.map((project) => (
          <div key={project.id} className={styles.projectCard}>
            <img src={project.image || "/placeholder.svg"} alt={project.title} className={styles.projectImage} />
            <div className={styles.projectContent}>
              <div className={styles.projectHeader}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <span className={styles.role}>{project.role}</span>
              </div>
              <p className={styles.projectDescription}>{project.description}</p>
              <div className={styles.achievements}>
                <h4>Key Achievements:</h4>
                <ul>
                  {project.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.technologies}>
                {project.technologies.map((tech, index) => (
                  <span key={index} className={styles.tech}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.toggleContainer}>
        <button className={styles.toggleButton} onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Featured Projects" : "Show All Projects"}
        </button>
      </div>
    </section>
  )
}

export default Projects
