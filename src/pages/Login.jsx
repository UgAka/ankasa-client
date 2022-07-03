import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Background from "../components/Background";
import "../assets/styles/ian.css";
import { login } from "../redux/actions/auth";
import Swal from "sweetalert2";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    document.title = `${process.env.REACT_APP_APP_NAME} - Login`;
    window.scrollTo(0, 0);
  }, []);
  const onSubmitted = (e) => {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    login(form, setErrors).then((res) => {
      if (res === true) {
        Swal.fire({
          title: "Success",
          text: "Login Success",
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
                <h1>Login</h1>
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
                <div className="alert alert-danger mx-0" style={{maxWidth: '350px',marginLeft: '10px'}}>
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
                  Sign In
                </button>
              )}
            </form>
            <div className="text">Did you forgot your password?</div>
            <Link to="/reset">Tap here for reset</Link>
            <div className="line"></div>
            <div className="text">Did you don't have account?</div>
            <input
              type="button"
              className="button2"
              value="Register"
              onClick={() => navigate("/register")}
            />
            <div className="line"></div>
            <div className="text">or sign in with</div>
            <div className="form-login">
              <input type="button" className="google" />
              <input type="button" className="facebook" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
