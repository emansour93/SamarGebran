"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";

const navItems = [
  { label: "Home", href: "home", icon: "home" },
  { label: "About Me", href: "about-me", icon: "user" },
  { label: "Services", href: "services", icon: "briefcase" },
  { label: "Projects", href: "projects", icon: "grid" },
  { label: "Testimonials", href: "testimonials", icon: "quote" },
  { label: "Contact Us", href: "contact-us", icon: "mail" },
];

function NavIcon({ type }: { type: string }) {
  const commonProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (type) {
    case "home":
      return (
        <svg {...commonProps}>
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 9.5V20h14V9.5" />
        </svg>
      );
    case "user":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c1.8-3.2 5-4.8 8-4.8s6.2 1.6 8 4.8" />
        </svg>
      );
    case "file":
      return (
        <svg {...commonProps}>
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
          <path d="M14 3v5h5" />
          <path d="M9 13h6M9 17h6" />
        </svg>
      );
    case "briefcase":
      return (
        <svg {...commonProps}>
          <rect x="3" y="7" width="18" height="12" rx="2" />
          <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" />
          <path d="M3 12h18" />
        </svg>
      );
    case "chart":
      return (
        <svg {...commonProps}>
          <path d="M4 18V8" />
          <path d="M10 18V4" />
          <path d="M16 18v-6" />
          <path d="M22 18V10" />
        </svg>
      );
    case "grid":
      return (
        <svg {...commonProps}>
          <rect x="3" y="3" width="6" height="6" rx="1" />
          <rect x="15" y="3" width="6" height="4" rx="1" />
          <rect x="3" y="15" width="6" height="6" rx="1" />
          <rect x="15" y="11" width="6" height="10" rx="1" />
        </svg>
      );
    case "quote":
      return (
        <svg {...commonProps}>
          <path d="M8 10c-1.7 0-3 1.3-3 3v3h4v-3H7a1 1 0 0 0-1-1v-2h2Zm9 0c-1.7 0-3 1.3-3 3v3h4v-3h-2a1 1 0 0 0-1-1v-2h2Z" />
        </svg>
      );
    case "book":
      return (
        <svg {...commonProps}>
          <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H20v14H6.5A2.5 2.5 0 0 0 4 20.5v-14Z" />
          <path d="M4 6.5V19" />
        </svg>
      );
    case "mail":
      return (
        <svg {...commonProps}>
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      );
    default:
      return null;
  }
}

const stats = [
  { value: "20+", label: "Years of Experience" },
  { value: "60+", label: "Projects Completed" },
  { value: "10+", label: "Countries" },
];

const resumeEntries = [
  {
    title: "BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY",
    place: "Cambridge University",
    period: "2010 - 2014",
    description:
      "Focused on software design, modern interface systems, and building user-centered digital experiences.",
  },
  {
    title: "MASTER OF SCIENCE IN INFORMATION TECHNOLOGY",
    place: "Cambridge University",
    period: "2014 - 2016",
    description:
      "Advanced design research methods, product strategy, and high-performance front-end architecture.",
  },
  {
    title: "PHD OF SCIENCE IN INFORMATION TECHNOLOGY",
    place: "Cambridge University",
    period: "2016 - 2018",
    description:
      "Explored digital innovation and strategic product thinking with a strong emphasis on usability.",
  },
];

const serviceItems = [
  {
    title: "Dry Needling",
    text: "Dry needling is a therapeutic technique using fine needles inserted into muscle trigger points.\nIt releases tension, reduces pain, and improves mobility.\nCommonly applied in sports medicine and physiotherapy. Distinct from acupuncture, as it targets musculoskeletal issues.",
  },
  {
    title: "Peripheral Reflexotherapy",
    text: "Peripheral Reflexotherapy is a manual therapy stimulating reflex zones in the body. \nGentle pressure influences the nervous system and circulation.\nIt reduces pain, restores balance, and supports rehabilitation. \nOften combined with physiotherapy to enhance recovery.",
  },
  {
    title: "Injury-Specific Training",
    text: "Exercise programs tailored to a particular injury.\nThey restore strength, mobility, and function in the affected area.\nMovements are progressive and designed to avoid aggravation.\nHelps clients return safely to daily activities or sports.",
  },
  {
    title: "Cranio-Sacral Therapy",
    text: "A gentle, hands-on treatment working with cerebrospinal fluid rhythms.\nLight touch releases restrictions in cranial and sacral areas.\nIt reduces stress, eases pain, and supports nervous system balance.\n\Often used for headaches, tension, and emotional well-being.",
  },
  {
    title: "Somatic Exercises",
    text: "Gentle movements that improve body awareness and release tension.\nThey retrain movement patterns to restore posture and flexibility./nUseful for stress relief, chronic pain, and rehabilitation.\nRegular practice helps clients move with ease and efficiency.",
  },
  {
    title: "Pilates",
    text: "Pilates is a structured exercise system focusing on controlled movements and breathing.\nIt strengthens core muscles, improves posture, and enhances flexibility.\nWidely used in rehabilitation, it supports recovery and prevents injuries.\nThe method emphasizes precision, alignment, and mind–body connection.",
  },
  {
    title: "Psychosomatics",
    text: "Psychosomatics studies how the mind and emotions affect physical health.\nIt explains how stress, anxiety, or unresolved feelings can lead to bodily symptoms.\nThe approach highlights the connection between psychological states and illness.\nTherapists use it to address both mental and physical aspects of recovery",
  },
  {
    title: "Corporate Wellness",
    text: "Corporate wellness focuses on improving employee health and well-being in the workplace.\nPrograms may include stress management, ergonomics, fitness, and nutrition workshops.\nThe goal is to boost productivity, reduce absenteeism, and create a healthier work culture.\nIt bridges professional performance with personal health, benefiting both employees and organizations.",
  },
  {
    title: "Education, Training, and Development",
    text: "Education, training, and development involve teaching skills and knowledge to individuals or groups.\nThey include designing courses, conducting workshops, and supervising practical experiences.\nThe goal is to enhance professional growth, performance, and lifelong learning.\nThis approach supports both personal advancement and organizational success.",
  },
  {
    title: "Hands-On Postural Alignment",
    text: "Hands-on postural alignment uses manual guidance to correct body positioning.\nIt helps clients achieve proper alignment of the spine, shoulders, and hips.\nThe technique reduces strain, improves balance, and prevents injury.\nOften integrated into rehabilitation and fitness programs for long-term posture health.",
  },
  {
    title: "Neuroplasticity",
    text: "Neuroplasticity refers to the brain’s ability to adapt and reorganize itself.\nIt allows new connections to form after injury, learning, or therapy.\nThis principle is used in rehabilitation to restore function and improve performance.\nPractices such as targeted exercise, mindfulness, and skill training enhance neuroplastic changes.",
  },
  {
    title: "Exercise and Rehab Program Design",
    text: "Exercise and rehab program design involves creating structured plans for recovery and performance.\nPrograms are tailored to individual needs, injuries, or health conditions.\nThey combine strength, mobility, and functional training to restore ability.\nThe approach ensures safe progression and long-term health improvement.",
  },
];

const skills = [
  { label: "Figma", value: 85 },
  { label: "Bootstrap", value: 90 },
  { label: "CSS", value: 85 },
  { label: "Flutter", value: 89 },
  { label: "Framer", value: 77 },
  { label: "HTML", value: 94 },
  { label: "WordPress", value: 82 },
  { label: "Next.js", value: 92 },
];

const projects = [
  { name: "Corporate Branding", area: "Brand Strategy" },
  { name: "Pocket FM Radio", area: "Audio Experience" },
  { name: "Crypto App UI Design", area: "Product Design" },
  { name: "Bank App Development", area: "Mobile Product" },
];

const testimonials = [
  {
    quote:
      "Sam brings clarity and craft to every project. The process feels thoughtful, fast, and unbelievably polished.",
    name: "Dan Sawyer",
    role: "Manager",
  },
  {
    quote:
      "From branding to front-end execution, the work elevated our presence and improved the quality of every customer touchpoint.",
    name: "Olivia Carter",
    role: "Founder",
  },
  {
    quote:
      "From branding to front-end execution, the work elevated our presence and improved the quality of every customer touchpoint.",
    name: "Oliver Carter",
    role: "Founder",
  },
  {
    quote:
      "From branding to front-end execution, the work elevated our presence and improved the quality of every customer touchpoint.",
    name: "Carter Oliver",
    role: "Founder",
  },
];

const posts = [
  {
    date: "20 Dec",
    title: "Become a Frontend Developer in 5 Simple Steps",
    category: "Web Development",
  },
  {
    date: "18 Dec",
    title: "11 Best Logo Design Online & Offline Courses",
    category: "Graphic Design",
  },
  {
    date: "8 Dec",
    title: "12 Best Branding Design Online and Offline Courses",
    category: "Graphic Design",
  },
];

const initialFormState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState<string | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 900px)");

    const handleChange = () => setIsMobile(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const testimonialGroups = useMemo(() => {
    if (isMobile) {
      return testimonials.map((testimonial) => [testimonial]);
    }

    const groups: (typeof testimonials)[] = [];
    for (let index = 0; index < testimonials.length; index += 2) {
      groups.push(testimonials.slice(index, index + 2));
    }

    return groups;
  }, [isMobile]);

  const showPreviousTestimonial = () => {
    setTestimonialIndex((prev) =>
      prev === 0 ? testimonialGroups.length - 1 : prev - 1,
    );
  };

  const showNextTestimonial = () => {
    setTestimonialIndex((prev) =>
      prev === testimonialGroups.length - 1 ? 0 : prev + 1,
    );
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitStatus("loading");
    setSubmitMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Failed to send the message.");
      }

      setSubmitStatus("success");
      setSubmitMessage("Your message has been sent successfully.");
      setFormData(initialFormState);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong.";
      setSubmitStatus("error");
      setSubmitMessage(message);
    }
  };

  return (
    <div className={styles.page}>
      <aside
        className={`${styles.sidebar} ${menuOpen ? styles.sidebarOpen : styles.sidebarClosed}`}
      >
        <div className={styles.sidebarInner}>
          <button
            type="button"
            className={styles.burgerButton}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>
          <div
            className={`${styles.menuContent} ${menuOpen ? styles.menuOpen : styles.menuClosed}`}
          >
            <nav className={styles.nav} aria-label="Main navigation">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  className={styles.navLink}
                  href={`#${item.href}`}
                  title={item.label}
                  aria-label={item.label}
                >
                  <NavIcon type={item.icon} />
                </a>
              ))}
            </nav>
          </div>
        </div>
      </aside>

      <main className={styles.main}>
        <section className={styles.hero} id="home">
          <div className={styles.heroContent}>
            <p className={styles.kicker}>
              Hello From <span>Samar Gebran</span>
            </p>
            <p className={styles.introText}>
              University Instructor -Corporate Wellness Consultant - Expert in
              Sports Therapy & Rehabilitation - Pilates Trainer - Educator
            </p>
          </div>

          <div
            className={styles.heroVisual}
            aria-label="Profile image placeholder"
          >
            <div className={styles.avatarFrame}></div>
          </div>
        </section>

        <section className={styles.aboutSection} id="about-me">
          <div className={styles.sectionIntro}>
            <p>ABOUT ME</p>
            <h2>Transforming Health Through Movement, Therapy, and Wellness</h2>
          </div>
          <div className={styles.aboutGrid}>
            <p>
              Dedicated to designing meaningful experiences in movement,
              wellness, and personal development. My work combines creativity,
              knowledge, and a client-centered approach to develop programs that
              inspire growth, support well-being, and create lasting positive
              impact.
            </p>
            <div className={styles.statsGrid}>
              {stats.map((stat) => (
                <div key={stat.label} className={styles.statItem}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.servicesSection} id="services">
          <div className={styles.sectionIntro}>
            <p>MY SERVICES</p>
            <h2>Comprehensive Solutions for Your Health and Wellness Goals</h2>
          </div>
          <div className={styles.servicesGrid}>
            {serviceItems.map((service) => {
              const isOpen = activeService === service.title;

              return (
                <article
                  key={service.title}
                  className={`${styles.serviceCard} ${isOpen ? styles.serviceCardOpen : ""}`}
                >
                  <button
                    type="button"
                    className={styles.serviceHeader}
                    aria-expanded={isOpen}
                    aria-controls={`${service.title}-content`}
                    onClick={() =>
                      setActiveService((current) =>
                        current === service.title ? null : service.title,
                      )
                    }
                  >
                    <span className={styles.serviceIcon}>✦</span>
                    <h3>{service.title}</h3>
                  </button>

                  <div
                    id={`${service.title}-content`}
                    className={styles.serviceBody}
                    aria-hidden={!isOpen}
                  >
                    <div className={styles.serviceBodyInner}>
                      <p>{service.text}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className={styles.portfolioSection} id="projects">
          <div className={styles.sectionIntro}>
            <p>PORTFOLIO</p>
            <h2>Showcasing Our Work and Impact</h2>
          </div>
          <div className={styles.portfolioGrid}>
            {projects.map((project) => (
              <article key={project.name} className={styles.projectCard}>
                <div className={styles.projectImage} aria-hidden="true" />
                <div className={styles.projectMeta}>
                  <span>{project.area}</span>
                  <strong>{project.name}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.testimonialsSection} id="testimonials">
          <div className={styles.sectionIntro}>
            <p>TESTIMONIALS</p>
            <h2>Trusted By Hundred Clients</h2>
          </div>

          <div className={styles.testimonialsCarousel}>
            <button
              type="button"
              className={styles.carouselButton}
              aria-label="Previous testimonial"
              onClick={showPreviousTestimonial}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className={styles.testimonialsViewport}>
              <div
                className={styles.testimonialsTrack}
                style={{ transform: `translateX(-${testimonialIndex * 100}%)` }}
              >
                {testimonialGroups.map((group, groupIndex) => (
                  <div
                    key={`group-${groupIndex}`}
                    className={styles.testimonialSlide}
                  >
                    <div className={styles.testimonialGroup}>
                      {group.map((item) => (
                        <article
                          key={item.name}
                          className={styles.testimonialCard}
                        >
                          <div className={styles.quoteMark}>“</div>
                          <p>{item.quote}</p>
                          <div className={styles.person}>
                            <div className={styles.personAvatar}>
                              {item.name.charAt(0)}
                            </div>
                            <div>
                              <strong>{item.name}</strong>
                              <span>{item.role}</span>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              className={styles.carouselButton}
              aria-label="Next testimonial"
              onClick={showNextTestimonial}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          <div
            className={styles.carouselDots}
            aria-label="Select testimonial slide"
          >
            {testimonialGroups.map((group, index) => (
              <button
                key={`dot-${index}`}
                type="button"
                className={`${styles.carouselDot} ${index === testimonialIndex ? styles.carouselDotActive : ""}`}
                aria-label={`Show testimonial group ${index + 1}`}
                aria-pressed={index === testimonialIndex}
                onClick={() => setTestimonialIndex(index)}
              />
            ))}
          </div>
        </section>

        <section className={styles.contactSection} id="contact-us">
          <div className={styles.contactWrap}>
            <div className={styles.sectionIntro}>
              <p>CONTACT US</p>
              <h2>Let’s Work Together!</h2>
            </div>
            <form className={styles.contactForm} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles.formRow}>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <textarea
                name="message"
                placeholder="Tell us about your project"
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                required
              />
              <button
                type="submit"
                className={styles.primaryButton}
                disabled={submitStatus === "loading"}
              >
                {submitStatus === "loading" ? "Sending..." : "Send Message"}
              </button>
              {submitMessage ? (
                <p
                  className={`${styles.formStatus} ${submitStatus === "success" ? styles.formStatusSuccess : styles.formStatusError}`}
                >
                  {submitMessage}
                </p>
              ) : null}
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
