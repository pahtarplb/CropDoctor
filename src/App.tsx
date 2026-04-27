import { HashRouter, Routes, Route, Navigate } from "react-router-dom"
import Splash from "./pages/Splash"
import Language from "./pages/Language"
import Login from "./pages/Login"
import ProfileSetup from "./pages/ProfileSetup"
import Home from "./pages/Home"
import BookScan from "./pages/BookScan"
import BookingConfirmed from "./pages/BookingConfirmed"
import MyScans from "./pages/MyScans"
import ScanDetail from "./pages/ScanDetail"
import ScanResults from "./pages/ScanResults"
import IssueDetail from "./pages/IssueDetail"
import LeafScan from "./pages/LeafScan"
import LeafResult from "./pages/LeafResult"
import Help from "./pages/Help"
import Notifications from "./pages/Notifications"
import CarbonCredits from "./pages/CarbonCredits"
import Marketplace from "./pages/Marketplace"
import YieldPrediction from "./pages/YieldPrediction"

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/language" element={<Language />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/book-scan" element={<BookScan />} />
          <Route path="/booking-confirmed" element={<BookingConfirmed />} />
          <Route path="/my-scans" element={<MyScans />} />
          <Route path="/scan-detail/:id" element={<ScanDetail />} />
          <Route path="/scan-results/:id" element={<ScanResults />} />
          <Route path="/issue-detail/:scanId/:issueId" element={<IssueDetail />} />
          <Route path="/leaf-scan" element={<LeafScan />} />
          <Route path="/leaf-result/:id" element={<LeafResult />} />
          <Route path="/help" element={<Help />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/carbon-credits" element={<CarbonCredits />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/yield-prediction" element={<YieldPrediction />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App
