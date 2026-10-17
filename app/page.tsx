"use client";

import { useEffect, useMemo, useState } from "react";
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
    title: "UI/UX Design",
    text: "Thoughtful interfaces shaped around clarity, conversion, and a polished customer journey.",
  },
  {
    title: "App Development",
    text: "Modern mobile and web product experiences built for performance, usability, and growth.",
  },
  {
    title: "Web Development",
    text: "Conversion-focused websites and product pages designed to look premium and perform fast.",
  },
  {
    title: "SEO & Marketing",
    text: "Content strategy and digital positioning that help brands stand out and attract qualified traffic.",
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

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState<string | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

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
              Dedicated to designing meaningful experiences in movement,
              wellness, and personal development. My work combines creativity,
              knowledge, and a client-centered approach to develop programs that
              inspire growth, support well-being, and create lasting positive
              impact.
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
              Samar designs and delivers therapeutic, fitness, and wellness
              programs that integrate evidence‑based methods to support
              recovery, performance, and overall health. Her work spans
              injury‑specific training, exercise and rehabilitation program
              design, and techniques such as dry needling, cranio‑sacral
              therapy, somatic exercises, and Pilates. She also applies
              approaches like psychosomatics, neuroplasticity, and postural
              alignment to enhance mind–body balance. Beyond clinical practice,
              Samar facilitates education, training, and corporate wellness
              initiatives, helping individuals and organizations achieve
              sustainable well‑being. Her focus is on structured,
              client‑centered solutions that restore function, prevent injury,
              and promote long‑term vitality
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
            <h2>Bringing your vision to life with Precision and Passion</h2>
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
            <h2>Elevate your brand to new heights with our expertise</h2>
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
            <form className={styles.contactForm}>
              <div className={styles.formRow}>
                <input type="text" placeholder="Your Name" />
                <input type="email" placeholder="Your Email" />
              </div>
              <div className={styles.formRow}>
                <input type="tel" placeholder="Your Phone Number" />
                <input type="text" placeholder="Subject" />
              </div>
              <textarea placeholder="Tell us about your project" rows={5} />
              <button type="submit" className={styles.primaryButton}>
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
