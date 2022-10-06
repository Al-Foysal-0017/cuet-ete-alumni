import React from "react";
import SmallLoader from "../components/smLoader";

const VideoSetter = ({ video, className }) => {
  const [isVideoLoaded, setIsVideoLoaded] = React.useState(false);
  const src = video;
  const myclassName = className;
  const onLoadedData = () => {
    setIsVideoLoaded(true);
  };
  return (
    <>
      {isVideoLoaded ? "" : <SmallLoader />}

      <video
        autoPlay
        loop
        muted
        playsInline
        src={src}
        onLoadedData={onLoadedData}
        className={myclassName}
      />
    </>
  );
};

export default VideoSetter;
