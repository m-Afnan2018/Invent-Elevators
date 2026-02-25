import HeroSection from '@/components/core/about/HeroSection';
import styles from './page.module.css'
// import ModernLiving from "@/components/core/about/ModernLiving";
// import People from "@/components/core/about/People";
// import ProductsCarousel from "@/components/core/about/ProductsCarousel";
// import Spirit from "@/components/core/about/Spirit";
import GlobalPresenceSection from '@/components/core/about/GlobalPresenceSection';
import HeritageSection from '@/components/core/about/HeritageSection';
import EngineeredSection from '@/components/core/about/EngineeredSection';
import SpiritSection from '@/components/core/about/SpiritSection';
import PeopleSection from '@/components/core/about/PeopleSection';
import ProductsSection from '@/components/core/about/ProductsSection';

export default function About() {
    return (
        <div className={styles.page}>
            <HeroSection />
            <GlobalPresenceSection/>
            <HeritageSection/>
            <EngineeredSection/>
            <SpiritSection/>
            <PeopleSection/>
            <ProductsSection/>
        </div>
    );
}