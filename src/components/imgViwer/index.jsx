import React from "react";
import { ImCross } from "react-icons/im";
import "./__imgViwer.scss";

const ImageViewer = ({ img, setImageView }) => {
  return (
    <div className="imageViewer">
      <div className="cancelOut">
        <ImCross
          onClick={() => {
            setImageView(false);
          }}
          size={26}
        />
      </div>
      <div className="imageViewerContainer">
        <img className="imageViewerImg" src={img} alt="" />
      </div>
    </div>
  );
};

export default ImageViewer;
