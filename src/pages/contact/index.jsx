import React, { useEffect, useRef, useState } from "react";
import { useAlert } from "react-alert";
import emailjs from "@emailjs/browser";
import Container from "../../components/container/Container";
import Footer from "../../components/footer";
import "./__contact.scss";

const Contact = () => {
  const alert = useAlert();
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    desc: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputs = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const form = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!state.firstName || !state.lastName || !state.email || !state.desc) {
      setError("Please fill up all fields!");
    } else {
      emailjs
        .sendForm(
          process.env.REACT_APP_SERVICE_ID,
          // process.env.REACT_APP_TEMPLATE_ID,
          "template_gbefyip",
          form.current,
          // process.env.REACT_APP_EMAILJS_ID
          "Uk7IKHOF9_YbXu_jY"
        )
        .then(
          (result) => {
            setLoading(false);
            alert.success("Your request has sent successfully.");
            setState({
              firstName: "",
              lastName: "",
              email: "",
              desc: "",
            });
          },
          (error) => {
            setLoading(false);
            alert.error("Something went wrong! Try again.");
          }
        );
    }
  };

  // useEffect(() => {
  //   if (success) {
  //     alert.success(success);
  //     setSuccess("");
  //     setState({
  //       firstName: "",
  //       lastName: "",
  //       email: "",
  //       desc: "",
  //     });
  //   }
  // }, [alert, success]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      setError("");
    }
  }, [alert, error]);
  return (
    <>
      <div className="signUpBanner"></div>
      <Container className="testPage">
        <span className="bgWhite mt-280">Contact</span>
      </Container>

      <Container>
        <form ref={form} className="contactForm" onSubmit={handleSubmit}>
          <div className="contactFormHeader">Contact Us</div>
          <div style={{ display: "flex" }}>
            <input
              onChange={handleInputs}
              value={state.firstName}
              name="firstName"
              style={{ marginRight: "8px" }}
              placeholder="First name..."
            />
            <input
              onChange={handleInputs}
              value={state.lastName}
              name="lastName"
              style={{ marginLeft: "8px" }}
              placeholder="Last name..."
            />
          </div>
          <div>
            <input
              name="email"
              onChange={handleInputs}
              value={state.email}
              placeholder="Email..."
            />
          </div>
          <div>
            <textarea
              onChange={handleInputs}
              value={state.desc}
              name="desc"
              placeholder="How can we help you? Write message..."
              cols={50}
              rows={8}
            />
          </div>
          <div>
            <input
              style={{
                cursor: "pointer",
                color: "#fff",
                background: "#05be71",
                border: "none",
                borderRadius: "10px",
              }}
              type="submit"
              value={loading ? "Loading..." : "Submit"}
              disabled={loading ? true : false}
            />
          </div>
        </form>
      </Container>
      <Footer />
    </>
  );
};

export default Contact;
