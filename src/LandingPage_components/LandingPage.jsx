import LandingPage_Footer from "../LandingPage_components/LandingPage_Footer";
import LandingPage_Header from "../LandingPage_components/LandingPage_Header";
import LandingPage_MainContainer from "../LandingPage_components/LandingPage_MainContainer";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header and Main Content */}
      <div className="flex-grow">
        <LandingPage_Header />
        <LandingPage_MainContainer />
      </div>

      {/* Footer */}
      <LandingPage_Footer />
    </div>
  );
}
