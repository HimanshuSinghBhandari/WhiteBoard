import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from "./pages/Home";
import Header from "./components/Navbar/Header";
import Footer from './components/Navbar/footer';
import Login from "./pages/Login";
import GuestView from './pages/GestView';
import Signup from "./pages/Signup";
import FAQPage from './pages/faq-page';
import HowItWorksPage from './components/Navbar/how-its-work';
import Whiteboard from './pages/WhiteBoard';
import UpdatesPage from './components/Navbar/update';
import ContactPage from './components/Navbar/contact-us';

function App() {
  const location = useLocation();
  const hideNavAndFooter = location.pathname === "/whiteboard";
  const backgroundColor = location.pathname === "/whiteboard" ? 'bg-white' : 'bg-zinc-800';
  return (
    <div className={backgroundColor}>
       {!hideNavAndFooter && <Header />}
      <Routes>
        <Route path="/" element={<GuestView/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/faqs" element={<FAQPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/updates" element={<UpdatesPage />} />
        <Route path="/whiteboard" element={<Whiteboard />} />
      </Routes>
       {!hideNavAndFooter && <Footer />}
    </div>
  );
}

export default App;
