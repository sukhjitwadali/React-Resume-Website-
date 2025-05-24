import type React from "react"
import styles from "./Skills.module.css"

interface SkillCategory {
  category: string
  skills: string[]
}

const Skills: React.FC = () => {
  const skillCategories: SkillCategory[] = [
    {
      category: "Programming Languages",
      skills: ["Python", "JavaScript", "SQL", "HTML5", "CSS", "Bash"],
    },
    {
      category: "Frameworks & Libraries",
      skills: ["Django", "Django REST Framework", "Flask", "React.js"],
    },
    {
      category: "Cloud & Infrastructure",
      skills: ["AWS (EC2, Lambda, RDS, VPC)", "Docker", "Nginx", "Unix"],
    },
    {
      category: "Databases",
      skills: ["MySQL", "PostgreSQL", "Database Design", "Query Optimization"],
    },
    {
      category: "Development Tools",
      skills: ["Git", "Jira", "Firebase", "API Development", "REST APIs"],
    },
    {
      category: "Soft Skills",
      skills: ["Team Leadership", "Client Communication", "Agile Collaboration", "Problem Solving", "Mentoring"],
    },
  ]

  return (
    <section className={styles.skills}>
      <h2 className={styles.title}>Technical Skills</h2>
      <div className={styles.skillsGrid}>
        {skillCategories.map((category, index) => (
          <div key={index} className={styles.skillCategory}>
            <h3 className={styles.categoryTitle}>{category.category}</h3>
            <div className={styles.skillsList}>
              {category.skills.map((skill, skillIndex) => (
                <span key={skillIndex} className={styles.skill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
