import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Users/Login";
import SignUp from "./pages/Users/SignUp";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import FilesForSale from "./pages/FilesForSale/FilesForSale";
import Footer from "./components/Footer/Footer";
import UploadFile from "./pages/UploadFile/UploadFile";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/filesforsale" element={<FilesForSale />} />
        <Route path="/uploadfile" element={<UploadFile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
