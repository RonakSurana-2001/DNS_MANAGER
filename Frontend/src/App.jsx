import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import MainDnsPage from "./Pages/MainDnsPage";
import MainRecordsPage from "./Pages/MainRecordsPage";
import Navbar from "./Pages/Navbar";

function MainLayout() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== '/' && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dnsEntry" element={<MainDnsPage />} />
        <Route path="/dnsRecords" element={<MainRecordsPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

export default App;
