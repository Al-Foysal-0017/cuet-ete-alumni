import React, { useEffect, useState } from "react";
import Container from "../../components/container/Container";
import Title from "../../components/title";
import "./__signIn.scss";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../store/actions/userAction";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import Footer from "../../components/footer";
import Loader from "../../components/Loader/Loader";

const SignIn = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loginErrors, loading } = useSelector((state) => state.user);

  const [user, setUser] = useState({
    number: "",
    password: "",
  });

  const loginDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const { number, password } = user;

  const handleClick = async (e) => {
    e.preventDefault();

    const myForm = {
      number,
      password,
    };
    dispatch(login(myForm));
  };

  useEffect(() => {
    if (loginErrors) {
      alert.error(loginErrors);
      dispatch(clearErrors());
    }
  }, [dispatch, loginErrors, alert]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="signInBanner"></div>
          <Container className="signIn">
            <form onSubmit={handleClick} className="signIn__form">
              <Title className="signIn__form__title">Sign In</Title>
              {/* <input className="signIn__input" type="" placeholder="Email" /> */}
              <input
                className="signIn__input"
                type="number"
                placeholder="Mobile Number"
                name="number"
                value={number}
                onChange={loginDataChange}
              />
              <input
                className="signIn__input"
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={loginDataChange}
              />
              <div className="swipPageBtnContainer">
                New in this site, Need a new account?{" "}
                <Link className="swipPageBtn" to="/sign-up">
                  Sign up
                </Link>
              </div>
              <input
                style={{
                  background: "#05be71",
                  border: "1px solid #05be71",
                  cursor: "pointer",
                  color: "#fff",
                }}
                value={loading ? "Loading..." : "Submit"}
                className="signIn__input"
                type="submit"
              />
            </form>
          </Container>
          <Footer />
        </>
      )}
    </>
  );
};

export default SignIn;
