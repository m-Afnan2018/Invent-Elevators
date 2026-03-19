import Navbar from "@/components/common/Navbar/Navbar";
import ContactSection from "@/components/common/ContactSection/ContactSection";
import Footer from "@/components/common/Footer/Footer";
import styles from "./layout.module.css";

export const metadata = {
  title: "Invent Elevator",
  description:
    "Discover premium elevator categories, projects, and service support built for homes, hospitals, and high-rise developments.",
};

export default function MainLayout({ children }) {
  return (
    <div className={styles.publicSiteShell}>
      <Navbar />
      <div className={styles.pageContent}>{children}</div>
      <ContactSection />
      <Footer />
    </div>
  );
}
