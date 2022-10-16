import React, { useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./__signUp.scss";
import Container from "../../components/container/Container";
import Title from "../../components/title";
import { useAlert } from "react-alert";
import Footer from "../../components/footer";

const OtpPassword = () => {
  const alert = useAlert();
  const location = useLocation();
  let navigate = useNavigate();
  const [student_id, setStudent_id] = useState("");
  const [errorID, setErrorID] = useState("");
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [error2, setError2] = useState("");
  const [loading, setLoading] = useState(false);

  if (!location.state.firstName || !location.state.lastName) {
    navigate("/sign-up");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!student_id) {
      setErrorID("CUET student id is Required!");
    }

    if (number.split("")?.length !== 11) {
      setError("Invalid Mobile Number!");
    }

    if (number?.length === 11) {
      setError("");
    }

    if (number.split("")?.length === 0) {
      setError("Please enter a mobile number");
    }

    if (password.split("")?.length < 6) {
      setError2("Password must be 6chractar long!");
    }

    if (password?.length >= 6) {
      setError2("");
    }

    if (!errorID && number?.length === 11 && password?.length >= 6) {
      setLoading(true);
      const config = { headers: { "Content-Type": "application/json" } };

      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/signup`,
          {
            number,
            firstName: location.state.firstName,
            lastName: location.state.lastName,
            student_id,
            password,
          },
          config
        );

        navigate("/signup/otp/verify", {
          state: {
            firstName: location.state.firstName,
            lastName: location.state.lastName,
            student_id,
            password,
            number,
          },
        });
      } catch (error) {
        alert.error(
          error.response.data.message || "Something went wrong. Try again."
        );
      }
      setLoading(false);
    }
  };
  return (
    <>
      <div className="signInBanner"></div>
      <Container className="signUpContainer">
        <form className="signIn__form" onSubmit={handleSubmit}>
          <Title className="signIn__form__title">Sign Up</Title>
          <div className="inputBox">
            <label>Enter your CUET ID:</label>
            <input
              value={student_id}
              onChange={(e) => {
                setStudent_id(e.target.value);
              }}
              type="number"
              placeholder="Ex-1208015"
            />
          </div>
          <div className="inputBox">
            {errorID && (
              <h5
                style={{
                  color: "red",
                  padding: "2px 0 1rem 2px",
                }}
              >
                {errorID}
              </h5>
            )}
          </div>
          <div className="inputBox">
            <label>Enter mobile number:</label>
            <input
              value={number}
              onChange={(e) => {
                setNumber(e.target.value);
              }}
              type="number"
              placeholder="Ex-01XXXXXXXXX"
            />
          </div>
          <div className="inputBox">
            {error && (
              <h5
                style={{
                  color: "red",
                  padding: "2px 0 1rem 2px",
                }}
              >
                {error}
              </h5>
            )}
          </div>
          <div className="inputBox">
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Set Password"
            />
          </div>
          <div className="inputBox">
            {error2 && (
              <h5
                style={{
                  color: "red",
                  padding: "2px 0 1rem 2px",
                }}
              >
                {error2}
              </h5>
            )}
          </div>
          <div className="inputBox">
            <Link to="/sign-up">
              <input
                style={{
                  cursor: "pointer",
                  background: "#05be71",
                  border: "none",
                  color: "#fff",
                  width: "120px",
                }}
                type="submit"
                value="<<   Prev"
              />
            </Link>
            <span style={{ padding: "0 8px" }} />
            <input
              style={{
                cursor: "pointer",
                background: "#05be71",
                border: "none",
                color: "#fff",
                width: "120px",
              }}
              type="submit"
              value={loading ? "Loading..." : "Next  >>"}
            />
          </div>
        </form>
      </Container>
      <Footer />
    </>
  );
};

export default OtpPassword;
