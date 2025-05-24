import type React from "react"
import styles from "./Experience.module.css"

interface ExperienceItem {
  id: number
  company: string
  position: string
  duration: string
  description: string[]
  technologies: string[]
}

const Experience: React.FC = () => {
  const experiences: ExperienceItem[] = [
    {
      id: 1,
      company: "MantraLabs",
      position: "Technical Lead",
      duration: "Jun 2023 – Dec 2023",
      description: [
        "Directed 7-member team to deliver 3 client projects 15% ahead of schedule, boosting customer satisfaction",
        "Developed a web-based application using AWS Lambda (Python) and MySQL queries to streamline client operations",
        "Resolved 95% of critical production issues within 24 hours via weekly code reviews and rapid triage",
        "Implemented agile methodologies and improved team collaboration processes",
      ],
      technologies: ["Python", "AWS Lambda", "MySQL", "Team Leadership", "Agile"],
    },
    {
      id: 2,
      company: "MantraLabs",
      position: "Senior Software Developer",
      duration: "Apr 2022 – May 2023",
      description: [
        "Engineered scalable backend handling 100k+ daily API requests, improving response time by 30%",
        "Designed APIs using Django REST framework to support mobile and web applications, enhancing cross-platform functionality",
        "Deployed applications on AWS EC2 and resolved complex backend issues, ensuring robust system performance",
        "Mentored 5 junior developers, reducing onboarding time by 25% and elevating code quality",
      ],
      technologies: ["Django", "Django REST Framework", "AWS EC2", "Python", "API Development"],
    },
  ]

  return (
    <section className={styles.experience}>
      <h2 className={styles.title}>Work Experience</h2>
      <div className={styles.timeline}>
        {experiences.map((exp) => (
          <div key={exp.id} className={styles.experienceItem}>
            <div className={styles.timelineDot}></div>
            <div className={styles.content}>
              <h3 className={styles.position}>{exp.position}</h3>
              <h4 className={styles.company}>{exp.company}</h4>
              <p className={styles.duration}>{exp.duration}</p>
              <ul className={styles.description}>
                {exp.description.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <div className={styles.technologies}>
                {exp.technologies.map((tech, index) => (
                  <span key={index} className={styles.tech}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Experience
