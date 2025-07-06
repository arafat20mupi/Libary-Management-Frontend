
import HomeBookCarousel from "../components/Home/BookHeader";
import HeroSection from "../components/Home/hero-section";
import PopularGenres from "../components/Home/popular-genres";
import QuickStats from "../components/Home/quick-stats";
import RecentActivities from "../components/Home/recent-activities";

const Home = () => {

    return (
        <>
            <HeroSection />
            <HomeBookCarousel />
            <QuickStats />
            <RecentActivities />
            <PopularGenres />
        </>
    );
};

export default Home;