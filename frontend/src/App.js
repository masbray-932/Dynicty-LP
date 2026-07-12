import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/sonner";
import LandingPage from "@/pages/LandingPage";
import ContactPage from "@/pages/ContactPage";
import PrivacyPage from "@/pages/PrivacyPage";
import TermsPage from "@/pages/TermsPage";
import NotFoundPage from "@/pages/NotFoundPage";

function App() {
  useEffect(() => {
    // Force dark theme as brand default.
    document.documentElement.classList.add("dark");
    document.documentElement.style.backgroundColor = "hsl(234 50% 4%)";
  }, []);

  return (
    <HelmetProvider>
      <div className="App min-h-screen bg-[hsl(var(--dyn-bg-0))] text-white">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/kontak" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          richColors
          theme="dark"
          toastOptions={{
            style: {
              background: "rgba(15, 18, 51, 0.95)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#F5F7FF",
            },
          }}
        />
      </div>
    </HelmetProvider>
  );
}

export default App;
