import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import Container from "../../components/container/Container";
import Title from "../../components/title";
import { clearErrors, getAllUsers } from "../../store/actions/userAction";
import Footer from "../../components/footer";
import axios from "axios";
import { SET_TOKEN } from "../../store/types/userConstants";

const SetProfile = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { user, token } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [previous_working_position, setPrevWorkingPosition] = useState("");
  const [present_working_position, setPresentvWorkingPosition] = useState("");
  const [blood, setBlood] = useState("");
  // const [department, setDepartment] = useState("");
  const [batch, setBatch] = useState("");
  const [country, setCountry] = useState("");
  const [graduation_year, set_graduation_year] = useState("");
  const [facebook_link, setFacebookLink] = useState("");
  const [linkedin_link, setLinkedinLink] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [selectedFile, setSelectedFile] = useState("");
  const [tempFile, setTempFile] = useState(null);

  const onImageChange = (e) => {
    e.persist();
    const fileURL = e.target.files[0];
    setSelectedFile(fileURL);

    if (fileURL) {
      setTempFile(URL.createObjectURL(fileURL));
    }
  };

  const imagePickRef = React.useRef(null);

  const choseImage = () => {
    if (imagePickRef.current) {
      imagePickRef.current.click();
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);

    const myForm = {
      email: email || user?.email,
      previous_working_position:
        previous_working_position || user?.previous_working_position,
      present_working_position:
        present_working_position || user?.present_working_position,
      department: "ETE",
      batch: batch || user?.batch,
      graduation_year: graduation_year || user?.graduation_year,
      blood: blood || user?.blood,
      country: country || user?.country,
      avatar: selectedFile,
      facebook_link: facebook_link || user?.facebook_link,
      linkedin_link: linkedin_link || user?.linkedin_link,
    };
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.put(
        `${process.env.REACT_APP_API_URL}/profile/update`,
        myForm,
        config
      );
      localStorage.setItem("myToken", data.token);
      dispatch({ type: SET_TOKEN, payload: data.token });
      dispatch(getAllUsers());
      navigate("/profile");
      setLoading(false);
    } catch (error) {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  const canNotChange = () => {
    alert.error("You can not change your name, mobile number & student id");
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
      setError("");
    }
  }, [alert, dispatch, error]);

  return (
    <>
      <div className="signInBanner"></div>
      <Container className="signUp">
        <form onSubmit={handleClick} className="signUp__form">
          <Title className="signUp__form__title">Set Profile</Title>
          <div
            className="inputBox"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingBottom: "2rem",
            }}
          >
            <label>
              Be patience,{" "}
              <span style={{ fontWeight: "600", color: "#05be71" }}>
                {user?.firstName} {user?.lastName}
              </span>
              .
            </label>
            <label style={{ textAlign: "center" }}>
              It almost done.Please fill up these information.It might be help
              you and your cuet ete dept batchmate, junior or senior to create a
              strong bonding. By the way, if you are busy at present than you
              can skip it and set it later.
            </label>
          </div>
          <div
            className="signUp__input"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <input
              onChange={onImageChange}
              ref={imagePickRef}
              type="file"
              accept="images/*"
              hidden
            />
            <div className="imgContainer" style={{ marginBottom: "1.5rem" }}>
              {!tempFile && (
                <img
                  style={{
                    width: "140px",
                    height: "140px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                  onClick={choseImage}
                  alt=""
                  className="contactPicture"
                  src={user?.avatar?.url}
                />
              )}
              {tempFile && (
                <img
                  style={{
                    width: "140px",
                    height: "140px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                  onClick={choseImage}
                  alt=""
                  className="contactPicture"
                  src={tempFile}
                />
              )}
              <div
                style={{
                  fontSize: "12px",
                  background: "gray",
                  color: "#fff",
                  padding: "8px 0",
                  textAlign: "center",
                  cursor: "pointer",
                  borderRadius: "8px",
                  fontWeight: "600",
                }}
                className="imgIcon"
                onClick={choseImage}
              >
                Choose a photo
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              maxWidth: "800px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                maxWidth: "800px",
              }}
              onClick={canNotChange}
            >
              <label>First Name</label>
              <input
                style={{ marginRight: "8px" }}
                className="signUp__input"
                placeholder={user?.firstName}
                name="first_name"
                value={user?.firstName}
                disabled
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                maxWidth: "800px",
              }}
              onClick={canNotChange}
            >
              <label>Last Name</label>
              <input
                onClick={canNotChange}
                style={{ marginLeft: "8px" }}
                className="signUp__input"
                placeholder={user?.lastName}
                name="last_name"
                value={user?.lastName}
                disabled
              />
            </div>
          </div>
          <div onClick={canNotChange} className="inputBox">
            <label>Student ID</label>
            <input
              className="signUp__input"
              type="number"
              name="student_id"
              value={user?.student_id}
              disabled
            />
          </div>
          <div className="inputBox">
            <label>Email</label>
            <input
              className="signUp__input"
              type="text"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="inputBox">
            <label>Blood Group</label>
            <div>
              <select
                value={blood}
                onChange={(e) => {
                  setBlood(e.target.value);
                }}
              >
                <option selected hidden value="">
                  Select blood
                </option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
          </div>
          <div className="inputBox">
            <label>Department</label>
            <div>
              <select
                value={"ETE"}
                // onChange={(e) => {
                //   setDepartment(e.target.value);
                // }}
                disabled
              >
                <option value="ETE">ETE</option>
                <option value="EEE">EEE</option>
                <option value="CSE">CSE</option>
              </select>
            </div>
          </div>
          <div className="inputBox">
            <label>Batch</label>
            <div>
              <select
                value={batch}
                onChange={(e) => {
                  setBatch(e.target.value);
                }}
              >
                <option selected hidden value="">
                  Select batch
                </option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
              </select>
            </div>
          </div>
          <div className="inputBox">
            <label>Graduation Year</label>
            <div>
              <select
                value={graduation_year}
                onChange={(e) => {
                  set_graduation_year(e.target.value);
                }}
              >
                <option selected hidden value="">
                  Select Graduation Year
                </option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="Expected 2023">Expected 2023</option>
                <option value="Expected 2024">Expected 2024</option>
                <option value="Expected 2025">Expected 2025</option>
                <option value="Expected 2026">Expected 2026</option>
                <option value="Expected 2027">Expected 2027</option>
              </select>
            </div>
          </div>
          <div onClick={canNotChange} className="inputBox">
            <label>Mobile Number</label>
            <input
              className="signUp__input"
              type="text"
              placeholder="Mobile No."
              name="number"
              value={user?.number}
              disabled
            />
          </div>
          <div className="inputBox">
            <label>Present Working Position</label>
            <input
              className="signUp__input"
              type="text"
              placeholder="Describe Your Present Working Position"
              name="present_working_position"
              value={present_working_position}
              onChange={(e) => {
                setPresentvWorkingPosition(e.target.value);
              }}
            />
          </div>
          <div className="inputBox">
            <label>Previous Working Position</label>
            <input
              className="signUp__input"
              type="text"
              placeholder="Describe Your Previous Working Position"
              name="previous_working_position"
              value={previous_working_position}
              onChange={(e) => {
                setPrevWorkingPosition(e.target.value);
              }}
            />
          </div>
          <div className="inputBox">
            <label>Present Country</label>
            <div>
              <select
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
              >
                <option selected hidden value="">
                  Select present country
                </option>
                <option value="Australia">Australia</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Korea">Korea</option>
                <option value="Germany">Germany</option>
                <option value="USA">USA</option>
              </select>
            </div>
          </div>
          <div className="inputBox">
            <label>Facebook Link</label>
            <input
              className="signUp__input"
              type="text"
              placeholder="Facebook Link"
              name="facebook_link"
              value={facebook_link}
              onChange={(e) => {
                setFacebookLink(e.target.value);
              }}
            />
          </div>
          <div className="inputBox">
            <label>LinkedIn</label>
            <input
              className="signUp__input"
              type="text"
              placeholder="Linked In Link"
              name="text"
              value={linkedin_link}
              onChange={(e) => {
                setLinkedinLink(e.target.value);
              }}
            />
          </div>
          <div className="buttonContainerSetProfile">
            <Link className="widthSet" to="/profile">
              <input
                style={{
                  background: "tomato",
                  border: "1px solid tomato",
                  cursor: "pointer",
                  color: "#fff",
                  textAlign: "center",
                }}
                value="Skip, I want to set it later."
                className="signUp__input"
              />
            </Link>
            <input
              style={{
                background: "#05be71",
                border: "1px solid #05be71",
                cursor: "pointer",
                color: "#fff",
              }}
              value={loading ? "Loading..." : "Update"}
              className="signUp__input widthSet"
              type="submit"
            />
          </div>
        </form>
      </Container>
      <Footer />
    </>
  );
};

export default SetProfile;
