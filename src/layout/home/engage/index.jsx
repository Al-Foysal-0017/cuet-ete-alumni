import React from "react";
import TSCImg from "../../../assets/img/TSC.JPG";
import BigButton from "../../../components/bigButton";
import Subtitle from "../../../components/subtitle";
import Title from "../../../components/title";
import ImageSetter from "./imageLoader/imageLoader";
import "./__engage.scss";

const Enagage = () => {
  return (
    <div className="enagage">
      <div className="enagage__left">
        <Title>Engage</Title>
        <Subtitle>
          Science and technology work for the world through the people who
          create it, innovate it, and deliver it. People work better and achieve
          more together.
        </Subtitle>
        <BigButton name="Learn More" link="/engage" />
      </div>
      <div className="enagage__right">
        <ImageSetter src={TSCImg} className="" />
      </div>
    </div>
  );
};

export default Enagage;
