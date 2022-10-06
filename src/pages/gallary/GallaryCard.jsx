import React from "react";
import ImageViewer from "../../components/imgViwer";
import ImageLoader from "./imageLoader/imageLoader";

const GallaryCard = ({ image, img, showImgView, setImg, setImageView }) => {
  return (
    <>
      {showImgView && (
        <div style={{ zIndex: "999999999999" }}>
          <ImageViewer setImageView={setImageView} img={img} />
        </div>
      )}

      <div
        onClick={() => {
          setImg(image);
          setImageView(!showImgView);
        }}
        className="gallaryCard"
      >
        <ImageLoader className="gallaryCard_img" src={image} />
      </div>
    </>
  );
};

export default GallaryCard;
