import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Users/Login";
import SignUp from "./pages/Users/SignUp";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import FilesForSale from "./pages/FilesForSale/FilesForSale";
import Footer from "./components/Footer/Footer";
import UploadFile from "./pages/UploadFile/UploadFile";
import useAuthentication from "./customHooks/useAuthentication";

function App() {
  const { isLoggedIn, handleLogin, handleLogout } = useAuthentication();
  return (
    <div className="App">
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <ToastContainer position="top-center" autoClose={3000} />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/filesforsale" element={<FilesForSale />} />
        <Route path="/uploadfile" element={<UploadFile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          exact
          path="/signup"
          // element={<SignUp handleSignup={handleLogin} />}
          element={<SignUp />}
        />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
