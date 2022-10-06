import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navigation from "../../components/adminNabSidebar/Navigation";
import Container from "../../components/container/Container";
import ImagePicker from "../../components/imagePicker";
import Title from "../../components/title";
import { eventCreate } from "../../store/actions/eventAction";

const CreateEvent = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { loading } = useSelector((state) => state.stories);

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
    data.append("upload_preset", "mystore");
    data.append("cloud_name", "dxfttihmd");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dxfttihmd/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const resImage = await res.json();
    // console.log("RETURN URL:>>>", resImage.url);
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
    console.log("CREATEEVENT:>>>", myForm);
    dispatch(eventCreate(myForm));
    navigate("/admin/all-events");
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
                placeholder="Subtitle..."
                name="organized_by"
                value={organized_by}
                onChange={createStoryDataChange}
              />
            </div>
            <div className="inputBox">
              <label>Media</label>
              <input
                className="signUp__input"
                placeholder="Media..."
                name="media"
                value={media}
                onChange={createStoryDataChange}
              />
            </div>
            <div className="inputBox">
              <label>Date</label>
              <input
                className="signUp__input"
                placeholder="Date..."
                name="date"
                value={date}
                onChange={createStoryDataChange}
              />
            </div>
            <div className="inputBox">
              <label>Month</label>
              <input
                className="signUp__input"
                placeholder="Month..."
                name="month"
                value={month}
                onChange={createStoryDataChange}
              />
            </div>
            <div className="inputBox">
              <label>Year</label>
              <input
                className="signUp__input"
                placeholder="Year..."
                name="year"
                value={year}
                onChange={createStoryDataChange}
              />
            </div>
            <div className="inputBox">
              <label>Particular Date</label>
              <input
                className="signUp__input"
                placeholder="Particular Date..."
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
              value={loading || loaderImg ? "Loading..." : "Create"}
              className="signUp__input"
              type="submit"
            />
          </form>
        </Container>
      </div>
      {/* )} */}
    </Navigation>
  );
};

export default CreateEvent;
