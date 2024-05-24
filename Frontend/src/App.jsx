import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import MainDnsPage from "./Pages/MainDnsPage";
import MainRecordsPage from "./Pages/MainRecordsPage";
import Navbar from "./Pages/Navbar";
import  { Toaster } from 'react-hot-toast';
import RegisterPage from "./Pages/RegisterPage";
import {useSelector} from "react-redux"

function MainLayout() {

  const location = useLocation();

  const isLogin=useSelector((state)=>state.isLogin)
  
  return (
    <>
    <Toaster />
      {location.pathname !== '/' && location.pathname !== '/register' && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dnsEntry" element={isLogin?<MainDnsPage />:<LoginPage />} />
        <Route path="/dnsRecords/hostedzone/:id" element={isLogin?<MainRecordsPage />:<LoginPage/>} />
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
