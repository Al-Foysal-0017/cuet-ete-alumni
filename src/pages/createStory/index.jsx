import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "../../components/container/Container";
import Footer from "../../components/footer";
import ImagePicker from "../../components/imagePicker";
import Title from "../../components/title";
import { storyCreate } from "../../store/actions/storyAction";

const CreateStory = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { loading } = useSelector((state) => state.stories);
  const { user } = useSelector((state) => state.user);
  const userImg = user?.avatar;

  const [initialImage, setImageSrc] = useState("");
  const [loaderImg, setLoaderImg] = useState(false);

  const [createStory, setCreateStory] = useState({
    title: "",
    organized_by: "",
    desc: "",
    userName: user?.firstName + " " + user?.lastName,
  });

  const createStoryDataChange = (e) => {
    setCreateStory({ ...createStory, [e.target.name]: e.target.value });
  };

  const imageUpload = async () => {
    setLoaderImg(true);
    const data = new FormData();
    data.append("file", initialImage);
    data.append("upload_preset", process.env.REACT_APP_PRESET_STORIES);
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

  const { title, organized_by, desc, userName } = createStory;

  const handleClick = async (e) => {
    e.preventDefault();

    const img = await imageUpload();

    const myForm = {
      title,
      organized_by,
      desc,
      userImg,
      userName,
      img,
      userId: user?._id,
    };
    dispatch(storyCreate(myForm));
    navigate("/stories");
  };

  return (
    <>
      <div className="signInBanner"></div>
      <Container className="signUp">
        <form onSubmit={handleClick} className="signUp__form">
          <Title className="signUp__form__title">Create Story</Title>
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
            <label>Subtitle</label>
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
      <Footer />
    </>
  );
};

export default CreateStory;
