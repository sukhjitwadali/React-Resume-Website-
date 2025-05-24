"use client"

import type React from "react"
import { useState } from "react"
import styles from "./Contact.module.css"

interface PersonalInfo {
  name: string
  title: string
  email: string
  phone: string
  location: string
  linkedin: string
  github: string
}

interface ContactProps {
  personalInfo: PersonalInfo
}

const Contact: React.FC<ContactProps> = ({ personalInfo }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <section className={styles.contact}>
      <h2 className={styles.title}>Contact Me</h2>
      <div className={styles.contactContent}>
        <div className={styles.contactInfo}>
          <h3>Get In Touch</h3>
          <p className={styles.intro}>
            I'm actively seeking co-op opportunities and would love to discuss how I can contribute to your team.
          </p>
          <div className={styles.infoItem}>
            <strong>Email:</strong> {personalInfo.email}
          </div>
          <div className={styles.infoItem}>
            <strong>Phone:</strong> {personalInfo.phone}
          </div>
          <div className={styles.infoItem}>
            <strong>Location:</strong> {personalInfo.location}
          </div>
          <div className={styles.socialLinks}>
            <a
              href={`https://${personalInfo.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              LinkedIn
            </a>
            <a
              href={`https://${personalInfo.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              GitHub
            </a>
          </div>
          <div className={styles.availability}>
            <h4>Availability</h4>
            <p>
              Available for co-op positions starting immediately. Open to full-time opportunities after graduation in
              May 2025.
            </p>
          </div>
        </div>

        <form className={styles.contactForm} onSubmit={handleSubmit}>
          <h3>Send a Message</h3>
          {isSubmitted && <div className={styles.successMessage}>Thank you! Your message has been sent.</div>}
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Tell me about the opportunity or ask any questions..."
              required
            ></textarea>
          </div>
          <button type="submit" className={styles.submitButton}>
            Send Message
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact
