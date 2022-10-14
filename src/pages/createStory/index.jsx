import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "../../components/container/Container";
import Footer from "../../components/footer";
import Title from "../../components/title";
import { useAlert } from "react-alert";

const CreateStory = () => {
  let navigate = useNavigate();
  const alert = useAlert();
  const { user, token } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const userImg = user?.avatar?.url;

  const [createStory, setCreateStory] = useState({
    title: "",
    organized_by: "",
    desc: "",
    userName: user?.firstName + " " + user?.lastName,
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

  const { title, organized_by, desc, userName } = createStory;

  const handleClick = async (e) => {
    e.preventDefault();
    if (!title || !organized_by || !desc || !selectedFile) {
      alert.error("Please fill up all the fields and img.");
    }

    setLoading(true);
    const myForm = {
      title,
      organized_by,
      desc,
      userImg,
      userName,
      img: selectedFile,
      userId: user?._id,
    };

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      await axios.post(
        `${process.env.REACT_APP_API_URL}/create/story`,
        myForm,
        config
      );
      setLoading(false);
      navigate("/stories");
    } catch (error) {
      setLoading(false);
    }
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
            value={loading ? "Loading..." : "Create"}
            className="signUp__input"
            type="submit"
            disabled={loading ? true : false}
          />
        </form>
      </Container>
      <Footer />
    </>
  );
};

export default CreateStory;
