import HeroSection from "@/components/core/home/HeroSection";
import styles from "./page.module.css";
import ProductCategories from "@/components/core/home/ProductCategories";
import StatsSection from "@/components/core/home/StatsSection";
import WhyChooseUs from "@/components/core/home/WhyChooseUs";
import OurProducts from "@/components/core/home/OurProducts";
import OurProjects from "@/components/core/home/OurProjects";
import InsightsSection from "@/components/core/home/InsightsSection";
// import Footer from "@/components/common/Footer/Footer";
// import ContactSection from "@/components/common/ContactSection/ContactSection";

export default function Home() {
    return (
        <div className={styles.page}>
            <HeroSection />
            <ProductCategories />
            <StatsSection />
            <WhyChooseUs />
            <OurProducts />
            <OurProjects />
            <InsightsSection />
            {/* <ContactSection />
            <Footer /> */}
        </div>
    );
}
