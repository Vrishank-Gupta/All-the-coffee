import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./lib/auth";
import { ProgressProvider } from "./lib/progress";
import { RequireAuth } from "./components/auth/RequireAuth";
import { VisitTracker } from "./components/layout/VisitTracker";
import Landing from "./pages/Landing";
import Overview from "./pages/Overview";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import RefundPolicy from "./pages/RefundPolicy";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";
import Tools from "./pages/Tools";
import CtcTool from "./pages/tools/CtcTool";
import WhatsAppTool from "./pages/tools/WhatsAppTool";
import OfferLettersTool from "./pages/tools/OfferLettersTool";
import InvoiceTool from "./pages/tools/InvoiceTool";
import ContractTool from "./pages/tools/ContractTool";
import ChapterZero from "./pages/ChapterZero";
import ChapterOne from "./pages/ChapterOne";
import ChapterTwo from "./pages/ChapterTwo";
import ChapterThree from "./pages/ChapterThree";
import ChapterFour from "./pages/ChapterFour";
import ChapterFive from "./pages/ChapterFive";
import ChapterSix from "./pages/ChapterSix";
import ChapterSeven from "./pages/ChapterSeven";
import ChapterEight from "./pages/ChapterEight";
import ChapterNine from "./pages/ChapterNine";
import ChapterTen from "./pages/ChapterTen";
import ChapterEleven from "./pages/ChapterEleven";
import Profile from "./pages/Profile";
import Certificate from "./pages/Certificate";
import CertificateView from "./pages/CertificateView";
import AdminStats from "./pages/AdminStats";

function Protected({ children }: { children: React.ReactNode }) {
  return <RequireAuth>{children}</RequireAuth>;
}

export default function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <BrowserRouter>
          <VisitTracker />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/tools/ctc-calculator" element={<CtcTool />} />
            <Route path="/tools/whatsapp-follow-ups" element={<WhatsAppTool />} />
            <Route path="/tools/offer-letters" element={<OfferLettersTool />} />
            <Route path="/tools/invoice-reader" element={<InvoiceTool />} />
            <Route path="/tools/contract-check" element={<ContractTool />} />
            <Route path="/chapter/0" element={<ChapterZero />} />
            <Route path="/chapter/1" element={<ChapterOne />} />
            <Route path="/chapter/2" element={<Protected><ChapterTwo /></Protected>} />
            <Route path="/chapter/3" element={<Protected><ChapterThree /></Protected>} />
            <Route path="/chapter/4" element={<Protected><ChapterFour /></Protected>} />
            <Route path="/chapter/5" element={<Protected><ChapterFive /></Protected>} />
            <Route path="/chapter/6" element={<Protected><ChapterSix /></Protected>} />
            <Route path="/chapter/7" element={<Protected><ChapterSeven /></Protected>} />
            <Route path="/chapter/8" element={<Protected><ChapterEight /></Protected>} />
            <Route path="/chapter/9" element={<Protected><ChapterNine /></Protected>} />
            <Route path="/chapter/10" element={<Protected><ChapterTen /></Protected>} />
            <Route path="/chapter/11" element={<Protected><ChapterEleven /></Protected>} />
            <Route path="/profile" element={<Protected><Profile /></Protected>} />
            <Route path="/certificate" element={<Protected><Certificate /></Protected>} />
            <Route path="/certificate/:userId" element={<CertificateView />} />
            <Route path="/admin" element={<Protected><AdminStats /></Protected>} />
          </Routes>
        </BrowserRouter>
      </ProgressProvider>
    </AuthProvider>
  );
}
