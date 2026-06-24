import { Routes, Route } from "react-router-dom";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { Home } from "./pages/home";
import { SchedulePickup } from "./pages/schedule-pickup";

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schedule-pickup" element={<SchedulePickup />} />
      </Routes>
      <Footer />
    </div>
  );
}
