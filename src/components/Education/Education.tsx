import type React from "react"
import styles from "./Education.module.css"

interface EducationItem {
  id: number
  institution: string
  degree: string
  field: string
  duration: string
  location: string
  status?: string
  achievements?: string[]
}

const Education: React.FC = () => {
  const education: EducationItem[] = [
    {
      id: 1,
      institution: "Loyalist College",
      degree: "Postgraduate Certificate",
      field: "Computer Software & Database Development",
      duration: "Expected May 2025",
      location: "Toronto, Canada",
      status: "In Progress",
      achievements: [
        "Specializing in modern software development practices",
        "Focus on database design and optimization",
        "Advanced coursework in cloud technologies",
        "Collaborative software development projects",
      ],
    },
    {
      id: 2,
      institution: "Amritsar College of Engineering & Technology",
      degree: "Bachelor of Technology",
      field: "Computer Science Education",
      duration: "Completed Aug 2018",
      location: "India",
      achievements: [
        "Strong foundation in computer science fundamentals",
        "Coursework in algorithms and data structures",
        "Software engineering principles and practices",
        "Database management and system design",
      ],
    },
  ]

  return (
    <section className={styles.education}>
      <h2 className={styles.title}>Education</h2>
      <div className={styles.educationList}>
        {education.map((edu) => (
          <div key={edu.id} className={styles.educationItem}>
            <div className={styles.header}>
              <div className={styles.institutionInfo}>
                <h3 className={styles.institution}>{edu.institution}</h3>
                <p className={styles.location}>{edu.location}</p>
              </div>
              <div className={styles.durationInfo}>
                <span className={styles.duration}>{edu.duration}</span>
                {edu.status && <span className={styles.status}>{edu.status}</span>}
              </div>
            </div>
            <div className={styles.degreeInfo}>
              <h4 className={styles.degree}>
                {edu.degree} in {edu.field}
              </h4>
            </div>
            {edu.achievements && (
              <div className={styles.achievements}>
                <h5>Key Focus Areas:</h5>
                <ul>
                  {edu.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Education
