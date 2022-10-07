import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navigation from "../../components/adminNabSidebar/Navigation";
import Container from "../../components/container/Container";
import ImagePicker from "../../components/imagePicker";
import Title from "../../components/title";
import { getAllEvents } from "../../store/actions/eventAction";
import { useAlert } from "react-alert";

const CreateEvent = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { token } = useSelector((state) => state.user);
  const [loader, setLoader] = useState(false);

  const [initialImage, setImageSrc] = useState("");
  const [loaderImg, setLoaderImg] = useState(false);

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

  const createStoryDataChange = (e) => {
    setCreateStory({ ...createStory, [e.target.name]: e.target.value });
  };

  const imageUpload = async () => {
    setLoaderImg(true);
    const data = new FormData();
    data.append("file", initialImage);
    data.append("upload_preset", process.env.REACT_APP_PRESET_EVENTS);
    data.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );
    const resImage = await res.json();
    setLoaderImg(false);
    return resImage.url;
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
    setLoader(true);

    const img = await imageUpload();

    const myForm = {
      date,
      month,
      year,
      particular_date,
      media,
      organized_by,
      title,
      desc,
      img,
    };
    // console.log("CREATEEVENT:>>>", myForm);
    // dispatch(eventCreate(myForm));

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/create/event`,
        myForm,
        config
      );
      dispatch(getAllEvents());
      setLoader(false);
      navigate("/admin/all-events");
    } catch (error) {
      console.log(error.response);
      setLoader(false);
      alert.error("Something went wrong.");
    }
  };
  return (
    <Navigation>
      <div className="adminDashboard">
        <div style={{ marginTop: "12rem" }} />
        <Container className="signUp">
          <form onSubmit={handleClick} className="signUp__form">
            <Title className="signUp__form__title">Create Event</Title>
            <div
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
              value={loader || loaderImg ? "Loading..." : "Create"}
              className="signUp__input"
              type="submit"
            />
          </form>
        </Container>
      </div>
    </Navigation>
  );
};

export default CreateEvent;
