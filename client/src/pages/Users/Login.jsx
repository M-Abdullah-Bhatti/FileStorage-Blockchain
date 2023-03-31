import React from "react";
import "./Login.css";
import { MdOutlineAccountCircle } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineUnlock } from "react-icons/ai";
import { BsTelephoneFill } from "react-icons/bs";

const Login = () => {
  return (
    <div className="login">
      <div className="left-login">
        <h3>Sign in to In-Build</h3>

        <form
          className="loginForm"
          // onSubmit={loginSubmit}
        >
          <div className="loginEmail">
            <HiOutlineMail />
            <input
              type="email"
              placeholder="Email"
              required
              //   value={loginEmail}
              //   onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>
          <div className="loginPassword">
            <AiOutlineUnlock />
            <input
              type="password"
              placeholder="Password"
              required
              //   value={loginPassword}
              //   onChange={(e) => setLoginPassword(e.target.value)}
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
          <input type="submit" value="Login" className="loginBtn" />
        </form>
      </div>
    </div>
  );
};

export default Login;
