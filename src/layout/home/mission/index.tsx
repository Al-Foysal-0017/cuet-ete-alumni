import React from "react";
import IncubatorImg from "../../../assets/img/Incubator.jpg";
import BigButton from "../../../components/bigButton";
import Subtitle from "../../../components/subtitle";
import Title from "../../../components/title";
import ImageSetter from "./imageLoader/imageLoader";
import "./__mission.scss";

const Mission = () => {
  return (
    <div className="mission">
      <div className="mission__left">
        <ImageSetter src={IncubatorImg} className="" />
      </div>
      <div className="mission__right">
        <Title>Our Mission</Title>
        <Subtitle>
          Science and technology work for the world through the people who
          create it, innovate it, and deliver it. People work better and achieve
          more together. Science and technology work for the world through the
          people who create it, innovate it, and deliver it. People work better
          and achieve more together.
        </Subtitle>
        <BigButton name="Learn More" link="/our-mission" />
      </div>
    </div>
  );
};

export default Mission;
