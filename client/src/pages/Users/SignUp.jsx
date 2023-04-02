import React, { useState } from "react";
import "./SignUp.css";
import { MdOutlineAccountCircle } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineUnlock } from "react-icons/ai";
import { BsTelephoneFill } from "react-icons/bs";
import axios from "axios";

const SignUp = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  // function to signup user:
  const handleSubmit = async () => {
    console.log("asdfdasf");
    try {
      await axios
        .post("http://localhost:5000/api/user/", {
          username,
          email,
          password,
          phone,
        })
        .then((result) => {
          // toast.success("Nft created successfully");
          console.log("user register successfully", result);
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
    <div className="register">
      <div className="right-reg">
        <h3>Create Account</h3>
        <div
          className="signUpForm"
          // encType="multipart/form-data"
          // onSubmit={handleSubmit}
        >
          <div className="signUpName">
            <MdOutlineAccountCircle />

            <input
              type="text"
              placeholder="Name"
              required
              name="name"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="signUpEmail">
            <HiOutlineMail />
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="signUpPassword">
            <AiOutlineUnlock />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="signUpPassword">
            <BsTelephoneFill style={{ width: "22px" }} />
            <input
              type="tel"
              placeholder="Phone Number"
              required
              name="phoneNo"
              // pattern="[0-9]{3}-[0-9]{2}-[0-9]-{3}"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Register"
            className="signUpBtn"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
