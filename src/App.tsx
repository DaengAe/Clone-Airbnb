import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HeaderAndSearchBarWrapper from "./components/header/HeaderAndSearchBarWrapper";
import Footer from "./components/footer/Footer";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import HostPage from "./pages/HostPage";
import RegisterPropertyPage from "./pages/RegisterPropertyPage";
import HostRegistrationPage from "./pages/HostRegistrationPage";
import HelpPage from "./pages/HelpPage";
import PropertyListPage from "./pages/PropertyListPage";
import OtherPopularPropertiesPage from "./pages/OtherPopularPropertiesPage";
import RecentlyAddedPropertiesPage from "./pages/RecentlyAddedPropertiesPage";
import HostApplicationStatusPage from "./pages/HostApplicationStatusPage";
import AdminHostRequestsPage from "./pages/AdminHostRequestsPage";
import "./App.css";

function App() {
  return (
    <Router>
      <HeaderAndSearchBarWrapper />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/property/:id" element={<PropertyDetailPage />} />
          <Route path="/host" element={<HostPage />} />
          <Route path="/register-property" element={<RegisterPropertyPage />} />
          <Route path="/host-registration" element={<HostRegistrationPage />} />
          <Route path="/host-application-status" element={<HostApplicationStatusPage />} />
          <Route path="/admin/host-requests" element={<AdminHostRequestsPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/properties/:location" element={<PropertyListPage />} />
          <Route
            path="/other-popular-properties"
            element={<OtherPopularPropertiesPage />}
          />
          <Route
            path="/recently-added-properties"
            element={<RecentlyAddedPropertiesPage />}
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
