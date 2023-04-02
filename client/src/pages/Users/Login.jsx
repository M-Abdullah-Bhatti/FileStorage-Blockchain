import React, { useState } from "react";
import "./Login.css";
import { MdOutlineAccountCircle } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineUnlock } from "react-icons/ai";
import { BsTelephoneFill } from "react-icons/bs";
import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // function to login user:
  const handleSubmit = async () => {
    console.log("asdfdasf");
    try {
      await axios
        .post("http://localhost:5000/api/user/login", {
          email,
          password,
        })
        .then((result) => {
          // toast.success("Nft created successfully");
          console.log("user login successfully", result.data.token);
          Cookies.set("token", result.data.token);
          // setTimeout(() => {
          //   window.location.reload(true);
          // }, "2000");
        })
        .catch((error) => alert(error.message));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="login">
      <div className="left-login">
        <h3>Sign in to In-Build</h3>

        <div
          className="loginForm"
          // onSubmit={loginSubmit}
        >
          <div className="loginEmail">
            <HiOutlineMail />
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="loginPassword">
            <AiOutlineUnlock />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* <Link
            style={{
              color: "#47ac4a",
              display: "flex",
              float: "right",
              paddingTop: "15px",
            }}
            to="/password/forgot"
          >
            Forget Password ?
          </Link> */}
          <input
            type="submit"
            value="Login"
            className="loginBtn"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
