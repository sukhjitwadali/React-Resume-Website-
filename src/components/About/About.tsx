import type React from "react"
import styles from "./About.module.css"

interface AboutData {
  summary: string
  image: string
}

interface AboutProps {
  data: AboutData
}

const About: React.FC<AboutProps> = ({ data }) => {
  return (
    <section className={styles.about}>
      <h2 className={styles.title}>Professional Summary</h2>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <img src={data.image || "/placeholder.svg"} alt="Sukhjit Singh Profile" className={styles.profileImage} />
        </div>
        <div className={styles.text}>
          <p className={styles.summary}>{data.summary}</p>
          <div className={styles.highlights}>
            <h3>Key Achievements</h3>
            <ul>
              <li>Led 7-member team to deliver 3 client projects 15% ahead of schedule</li>
              <li>Engineered scalable backend handling 100k+ daily API requests</li>
              <li>Developed AI-driven healthcare platform supporting 31k+ doctors</li>
              <li>Mentored 5 junior developers, reducing onboarding time by 25%</li>
              <li>Resolved 95% of critical production issues within 24 hours</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
