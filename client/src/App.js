import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Menu from "./componets/nav/menu";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";






export default function App() {

  return (
    <BrowserRouter>      
      <Menu />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


      </Routes>

    </BrowserRouter>

    
  );
}


