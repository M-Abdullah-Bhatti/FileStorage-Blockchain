import React from "react";
import "./SignUp.css";
import { MdOutlineAccountCircle } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineUnlock } from "react-icons/ai";
import { BsTelephoneFill } from "react-icons/bs";

const SignUp = () => {
  return (
    <div className="register">
      <div className="right-reg">
        <h3>Create Account</h3>
        <form
          className="signUpForm"
          // encType="multipart/form-data"
          // onSubmit={registerSubmit}
        >
          <div className="signUpName">
            <MdOutlineAccountCircle />

            <input
              type="text"
              placeholder="Name"
              required
              name="name"
              // value={name}
              // onChange={registerDataChange}
            />
          </div>

          <div className="signUpEmail">
            <HiOutlineMail />
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              // value={email}
              // onChange={registerDataChange}
            />
          </div>

          <div className="signUpPassword">
            <AiOutlineUnlock />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              // value={password}
              // onChange={registerDataChange}
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
              // value={phoneNo}
              // onChange={registerDataChange}
            />
          </div>

          <input type="submit" value="Register" className="signUpBtn" />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
