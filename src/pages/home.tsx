import { HeroSection } from "../components/hero-section";
import { DashboardSection } from "../components/dashboard-section";
import { TrainingSection } from "../components/training-section";
import { FacilitiesSection } from "../components/facilities-section";
import { CommunitySection } from "../components/community-section";
import { ReportSection } from "../components/report-section";

export function Home() {
  return (
    <main>
      <HeroSection />
      <DashboardSection />
      <TrainingSection />
      <FacilitiesSection />
      <CommunitySection />
      <ReportSection />
    </main>
  );
}
