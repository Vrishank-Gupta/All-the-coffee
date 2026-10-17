import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./lib/auth";
import { ProgressProvider } from "./lib/progress";
import { RequireAuth } from "./components/auth/RequireAuth";
import Landing from "./pages/Landing";
import Overview from "./pages/Overview";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import RefundPolicy from "./pages/RefundPolicy";
import ChapterZero from "./pages/ChapterZero";
import ChapterOne from "./pages/ChapterOne";
import ChapterTwo from "./pages/ChapterTwo";
import ChapterThree from "./pages/ChapterThree";
import ChapterFour from "./pages/ChapterFour";
import ChapterFive from "./pages/ChapterFive";
import ChapterSix from "./pages/ChapterSix";
import ChapterSeven from "./pages/ChapterSeven";
import Profile from "./pages/Profile";

function Protected({ children }: { children: React.ReactNode }) {
  return <RequireAuth>{children}</RequireAuth>;
}

export default function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <BrowserRouter>
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
            <Route path="/chapter/0" element={<Protected><ChapterZero /></Protected>} />
            <Route path="/chapter/1" element={<Protected><ChapterOne /></Protected>} />
            <Route path="/chapter/2" element={<Protected><ChapterTwo /></Protected>} />
            <Route path="/chapter/3" element={<Protected><ChapterThree /></Protected>} />
            <Route path="/chapter/4" element={<Protected><ChapterFour /></Protected>} />
            <Route path="/chapter/5" element={<Protected><ChapterFive /></Protected>} />
            <Route path="/chapter/6" element={<Protected><ChapterSix /></Protected>} />
            <Route path="/chapter/7" element={<Protected><ChapterSeven /></Protected>} />
            <Route path="/profile" element={<Protected><Profile /></Protected>} />
          </Routes>
        </BrowserRouter>
      </ProgressProvider>
    </AuthProvider>
  );
}
