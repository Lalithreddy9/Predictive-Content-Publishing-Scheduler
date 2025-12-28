import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import CalendarPage from "./pages/Calendar";
import AIScheduler from "./pages/AIScheduler";



export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/ai-scheduler" element={<AIScheduler />} />
          

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
