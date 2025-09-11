import { Header } from "./components/header";
import { HeroSection } from "./components/hero-section";
import { DashboardSection } from "./components/dashboard-section";
import { TrainingSection } from "./components/training-section";
import { FacilitiesSection } from "./components/facilities-section";
import { CommunitySection } from "./components/community-section";
import { ReportSection } from "./components/report-section";
import { Footer } from "./components/footer";

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <DashboardSection />
        <TrainingSection />
        <FacilitiesSection />
        <CommunitySection />
        <ReportSection />
      </main>
      <Footer />
    </div>
  );
}