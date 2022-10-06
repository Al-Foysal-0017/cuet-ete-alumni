import React from "react";
import "./__commnetLoader.scss";

const CommentLoading = () => {
  return (
    <>
      <div className="commentLoaderContainer">
        <div className="commentLoaderCircle" />
        <div>
          <div className="commentLoader"></div>
          <div style={{ marginTop: "8px" }} className="commentLoader"></div>
        </div>
      </div>

      <div className="commentLoaderContainer">
        <div className="commentLoaderCircle" />
        <div>
          <div className="commentLoader"></div>
          <div style={{ marginTop: "8px" }} className="commentLoader"></div>
        </div>
      </div>

      <div className="commentLoaderContainer">
        <div className="commentLoaderCircle" />
        <div>
          <div className="commentLoader"></div>
          <div style={{ marginTop: "8px" }} className="commentLoader"></div>
        </div>
      </div>
    </>
  );
};

export default CommentLoading;
