import { BrowserRouter, Route, Routes } from "react-router-dom"
import ScrollToTop from "./components/ScrollToTop"
import HomePage from "./pages/HomePage"
import PlacesPage from "./pages/PlacesPage"
import PlaceDetailPage from "./pages/PlaceDetailPage"
import BookingPage from "./pages/BookingPage"
import BookingSuccessPage from "./pages/BookingSuccessPage"
import ExperiencesPage from "./pages/ExperiencesPage"
import BlogPage from "./pages/BlogPage"
import BlogDetailPage from "./pages/BlogDetailPage"
import ContactPage from "./pages/ContactPage"
import AccountPage from "./pages/AccountPage"
import AccountSettingsPage from "./pages/AccountSettingsPage"
import FavoritesPage from "./pages/FavoritesPage"
import ComparePage from "./pages/ComparePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import AdminLoginPage from "./pages/AdminLoginPage"
import AdminPage from "./pages/AdminPage"
import NotFoundPage from "./pages/NotFoundPage"
import AdminContactsPage from "./pages/AdminContactsPage"
import AdminDashboardPage from "./pages/AdminDashboardPage"
import AdminContentPage from "./pages/AdminContentPage"
import SiteFooter from "./components/SiteFooter"
import BackToTop from "./components/BackToTop"
import { ToastProvider } from "./components/ToastProvider"
import PaymentPage from "./pages/PaymentPage"
import InvoicePage from "./pages/InvoicePage"

function App() {
  return (
    <ToastProvider>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/places" element={<PlacesPage />} />
          <Route path="/places/:id" element={<PlaceDetailPage />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/booking-success/:id" element={<BookingSuccessPage />} />
          <Route path="/experiences" element={<ExperiencesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/settings" element={<AccountSettingsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/contacts" element={<AdminContactsPage />} />
          <Route path="/admin/content" element={<AdminContentPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/payment/:bookingId" element={<PaymentPage />} />
          <Route path="/invoice/:bookingId" element={<InvoicePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <SiteFooter />
      <BackToTop />
    </BrowserRouter>
  </ToastProvider>
  )
}

export default App