import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Background from "../components/Background";
import "../assets/styles/ian.css";
import { reset } from "../redux/actions/auth";
import Swal from "sweetalert2";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {
    document.title = `${process.env.REACT_APP_APP_NAME} - Reset Password`;
    window.scrollTo(0, 0);
  }, []);
  const { token } = useParams();
  const onSubmitted = (e) => {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    if (form.password === form.confirmPassword) {
      reset(token, form, setErrors).then((res) => {
        if (res === true) {
          Swal.fire({
            title: "Success",
            text: "you success to reset password, now you can login",
            icon: "success",
          });
          return navigate("/");
        }
      });
    } else {
      Swal.fire({
        title: "Oops...",
        text: "password and confirm password are different",
        icon: "error",
      });
    }

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
                <h1>Reset Password</h1>
                <div className="form-password">
                  <input
                    type={`${showPassword ? "text" : "password"}`}
                    className="input"
                    placeholder="  New Password"
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
                <div className="form-password">
                  <input
                    type={`${showConfirmPassword ? "text" : "password"}`}
                    className="input"
                    placeholder="  Confirm New Password"
                    onChange={(e) =>
                      setForm({ ...form, confirmPassword: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className="password"
                    onClick={() => {
                      setShowConfirmPassword(!showConfirmPassword);
                    }}
                  ></button>
                </div>
              </div>
              {errors.length > 0 && (
                <div
                  className="alert alert-danger mx-0"
                  style={{ maxWidth: "350px", marginLeft: "10px" }}
                >
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
                  Send
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
