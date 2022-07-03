import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Background from "../components/Background";
import "../assets/styles/ian.css";
import { register } from "../redux/actions/auth";
import Swal from "sweetalert2";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    document.title = `${process.env.REACT_APP_APP_NAME} - Register`;
    window.scrollTo(0, 0);
  }, []);
  const onSubmitted = (e) => {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    register(form, setErrors).then((res) => {
      if (res === true) {
        Swal.fire({
          title: "Success",
          text: "you success to register, now check your email to acctivate your account",
          icon: "success",
        });
        return navigate("/");
      }
    });
    setIsLoading(false);
  };
  return (
    <>
      <div className="ian">
        <div className="background">
          <Background />
          <div className="jumbotron">
            <div className="form-title">
              <div className="icon"></div>
              <div className="text">Ankasa</div>
            </div>
            <form onSubmit={(e) => onSubmitted(e)}>
              <div className="form-input">
                <h1>Register</h1>
                <input
                  type="text"
                  className="input"
                  placeholder="  Full Name"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                  type="email"
                  className="input"
                  placeholder="  Email"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <div className="form-password">
                  <input
                    type={`${showPassword ? "text" : "password"}`}
                    className="input"
                    placeholder="  Password"
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className="password"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  ></button>
                </div>
              </div>
              {errors.length > 0 && (
                <div className="alert alert-danger mx-50" style={{maxWidth: '350px',marginLeft: '10px'}}>
                  <ul className="m-0">
                    {errors.map((error, index) => (
                      <li key={index}>{error.msg}</li>
                    ))}
                  </ul>
                </div>
              )}
              {isLoading ? (
                <button
                  className="btn btn-success btn-lg ms-2"
                  type="button"
                  disabled
                >
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>{" "}
                  Loading...
                </button>
              ) : (
                <button type="submit" className="button">
                  Sign Up
                </button>
              )}
            </form>
            <label className="check">
              <input type="checkbox" className="checkbox" />
              <div className="text">Accept terms and condition</div>
            </label>
            <div className="line"></div>
            <div className="text">Already have an account?</div>
            <input
              type="button"
              className="button2"
              value="Sign In"
              onClick={() => navigate("/login")}
            />
          </div>
        </div>
      </div>
    </>
  );
}
