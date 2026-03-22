"use client";
import Image from "next/image";
import styles from "./PeopleSection.module.css";

const team = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Lead Elevator Engineer",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "James Okonkwo",
    role: "Installation Specialist",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "After-Sales Manager",
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&q=80&fit=crop&crop=face",
  },
];

export default function PeopleSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* Left: Image collage */}
        <div className={styles.left}>
          <div className={styles.imageGrid}>
            {/* Large primary image */}
            <div className={styles.primaryImgWrapper}>
              <Image
                width={1000}
                height={1000}
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=900&q=85&fit=crop"
                alt="Team collaborating"
                className={styles.primaryImg}
              />
              <div className={styles.primaryImgOverlay} />
            </div>

            {/* Small secondary image */}
            <div className={styles.secondaryImgWrapper}>
              <Image
                width={1000}
                height={1000}
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=85&fit=crop"
                alt="Technician at work"
                className={styles.secondaryImg}
              />
            </div>

            {/* Floating card */}
            <div className={styles.floatingCard}>
              <div className={styles.floatingIcon}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path
                    d="M11 2C6.03 2 2 6.03 2 11s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z"
                    stroke="#b0742e"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M11 7v4l3 3"
                    stroke="#b0742e"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <p className={styles.floatingNum}>150+</p>
                <p className={styles.floatingText}>Expert Professionals</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Content */}
        <div className={styles.right}>
          <p className={styles.eyebrow}>Our Team</p>
          <h2 className={styles.heading}>
            It&apos;s All About <em className={styles.headingEm}>the People</em>
          </h2>
          <div className={styles.divider} />
          <p className={styles.body}>
            Behind every successful lift installation is a dedicated team of
            engineers, technicians, and support professionals. At Invent Elevator,
            our people are our strongest foundation.
          </p>
          <p className={styles.body}>
            From design and manufacturing to installation and after-sales service,
            our team works with passion, responsibility, and attention to detail.
            Their expertise ensures that every elevator system delivers long-term
            reliability, safety, and smooth performance.
          </p>
          <p className={styles.body}>
            We believe great technology is powered by great people — and that
            commitment reflects in every project we deliver.
          </p>

          {/* Team member cards */}
          <div className={styles.teamRow}>
            {team.map((member, i) => (
              <div
                key={member.id}
                className={styles.memberCard}
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <div className={styles.memberImgWrapper}>
                  <Image
                    width={1000}
                    height={1000}
                    src={member.img}
                    alt={member.name}
                    className={styles.memberImg}
                  />
                </div>
                <div className={styles.memberInfo}>
                  <p className={styles.memberName}>{member.name}</p>
                  <p className={styles.memberRole}>{member.role}</p>
                </div>
              </div>
            ))}
          </div>

          <a href="#about" className={styles.cta}>
            Meet the Full Team
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
