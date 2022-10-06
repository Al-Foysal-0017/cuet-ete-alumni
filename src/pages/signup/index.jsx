import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./__signUp.scss";
import Container from "../../components/container/Container";
import Title from "../../components/title";
import Footer from "../../components/footer";

const SignUp = () => {
  let navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName) {
      setError("First Name is Required!");
    }

    if (!lastName) {
      setError2("Last Name is Required!");
    }

    if (firstName && lastName) {
      navigate("/signup/set/otp/password", {
        state: { firstName, lastName },
      });
    }
  };
  return (
    <>
      <div className="signInBanner"></div>
      <Container className="signUpContainer">
        <form className="signIn__form" onSubmit={handleSubmit}>
          <Title className="signIn__form__title">Sign Up</Title>
          <div className="inputBox">
            <label>What is your name?</label>
          </div>
          <div className="inputBox" style={{ display: "flex" }}>
            {/* For First Name (First Name+Error) */}
            <div className="inputBox" style={{ marginRight: "8px" }}>
              <div className="inputBox">
                <input
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  placeholder="First Name..."
                />
              </div>
              <div className="inputBox">
                {error && (
                  <h5
                    style={{
                      color: "red",
                      padding: "2px 0 0 2px",
                    }}
                  >
                    {error}
                  </h5>
                )}
              </div>
            </div>
            {/* For Last Name (Last Name+Error) */}
            <div className="inputBox" style={{ marginLeft: "8px" }}>
              <div className="inputBox">
                <input
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  placeholder="Last Name..."
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
            </div>
          </div>
          <div className="swipPageBtnContainer">
            Already have a account?{" "}
            <Link className="swipPageBtn" to="/sign-in">
              Sign in
            </Link>
          </div>
          <div className="inputBox">
            <input
              style={{
                cursor: "pointer",
                background: "#05be71",
                border: "none",
                color: "#fff",
                width: "120px",
              }}
              type="submit"
              value="Next  >>"
            />
          </div>
        </form>
      </Container>
      <Footer />
    </>
  );
};

export default SignUp;
