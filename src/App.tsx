import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Engagement from "./pages/Engagement";
import Community from "./pages/Community";
import AIChat from "./pages/AIChat";
import Lesson from "./pages/Lesson";
import EditLesson from "./pages/EditLesson";
import Lessons from "./pages/Lessons";
import { Toaster } from "@/components/ui/sonner";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/engagement" element={<Engagement />} />
        <Route path="/community" element={<Community />} />
        <Route path="/ai-chat" element={<AIChat />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/lesson/:id" element={<Lesson />} />
        <Route path="/lesson/:id/edit" element={<EditLesson />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;