import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navigation from "../../components/adminNabSidebar/Navigation";
import Container from "../../components/container/Container";
import Title from "../../components/title";
import { getAllEvents } from "../../store/actions/eventAction";
import { useAlert } from "react-alert";

const CreateEvent = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { token } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);

  const [createStory, setCreateStory] = useState({
    date: "",
    month: "",
    year: "",
    particular_date: "",
    media: "",
    organized_by: "",
    title: "",
    desc: "",
  });

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
  const createStoryDataChange = (e) => {
    setCreateStory({ ...createStory, [e.target.name]: e.target.value });
  };

  const {
    date,
    month,
    year,
    particular_date,
    media,
    organized_by,
    title,
    desc,
  } = createStory;

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);

    const myForm = {
      date,
      month,
      year,
      particular_date,
      media,
      organized_by,
      title,
      desc,
      img: selectedFile,
    };

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/create/event`,
        myForm,
        config
      );
      dispatch(getAllEvents());
      setLoading(false);
      navigate("/admin/all-events");
    } catch (error) {
      alert.error("Something went wrong.");
      setLoading(false);
    }
  };
  return (
    <Navigation>
      <div className="adminDashboard">
        <div style={{ marginTop: "12rem" }} />
        <Container className="signUp">
          <form onSubmit={handleClick} className="signUp__form">
            <Title className="signUp__form__title">Create Event</Title>
            {/* <div
              className="signUp__input"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <ImagePicker
                initialImage={initialImage}
                setImageSrc={setImageSrc}
              />
              <div
                style={{ fontSize: "12px", paddingTop: "5px" }}
                className="signUp__input__P"
              >
                Thumbnail Image
              </div>
            </div> */}
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
              <div className="imgContainer">
                {!tempFile && (
                  <div
                    style={{
                      width: "200px",
                      height: "140px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      cursor: "pointer",
                      border: "1px solid gray",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={choseImage}
                  >
                    Choose img
                  </div>
                )}
                {tempFile && (
                  <img
                    style={{
                      width: "200px",
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
                    marginTop: "8px",
                  }}
                  className="imgIcon"
                  onClick={choseImage}
                >
                  Choose img
                </div>
              </div>
            </div>
            <div className="inputBox">
              <label>Title</label>
              <input
                className="signUp__input"
                placeholder="Title..."
                name="title"
                value={title}
                onChange={createStoryDataChange}
              />
            </div>
            <div className="inputBox">
              <label>Organized By</label>
              <input
                className="signUp__input"
                type="text"
                placeholder="Ex- CUET Computer Club"
                name="organized_by"
                value={organized_by}
                onChange={createStoryDataChange}
              />
            </div>
            <div className="inputBox">
              <label>Media</label>
              <input
                className="signUp__input"
                placeholder="Ex- Zoom"
                name="media"
                value={media}
                onChange={createStoryDataChange}
              />
            </div>
            <div className="inputBox">
              <label>Date</label>
              <input
                className="signUp__input"
                placeholder="Ex- 27"
                name="date"
                value={date}
                onChange={createStoryDataChange}
              />
            </div>
            <div className="inputBox">
              <label>Month</label>
              <input
                className="signUp__input"
                placeholder="Ex- January"
                name="month"
                value={month}
                onChange={createStoryDataChange}
              />
            </div>
            <div className="inputBox">
              <label>Year</label>
              <input
                className="signUp__input"
                placeholder="Ex- 2022"
                name="year"
                value={year}
                onChange={createStoryDataChange}
              />
            </div>
            <div className="inputBox">
              <label>Particular Date</label>
              <input
                className="signUp__input"
                placeholder="Ex- 20 January 2022"
                name="particular_date"
                value={particular_date}
                onChange={createStoryDataChange}
              />
            </div>
            <div className="inputBox">
              <label>Description</label>
              <textarea
                placeholder="Description of your story..."
                value={desc}
                name="desc"
                onChange={createStoryDataChange}
                cols={150}
                rows={8}
              />
            </div>
            <input
              style={{
                background: "#05be71",
                border: "1px solid #05be71",
                cursor: "pointer",
                color: "#fff",
              }}
              value={loading ? "Loading..." : "Create"}
              className="signUp__input"
              type="submit"
              disabled={loading ? true : false}
            />
          </form>
        </Container>
      </div>
    </Navigation>
  );
};

export default CreateEvent;
