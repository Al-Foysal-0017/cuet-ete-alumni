import React from "react";
import GallaryCard from "./GallaryCard";
import cardImg1 from "../../assets/img/TSC.JPG";
import cardImg2 from "../../assets/img/TasniaApu.JPG";
import cardImg3 from "../../assets/img/GolCottor.JPG";
import cardImg4 from "../../assets/img/bg1.jpg";
import cardImg5 from "../../assets/img/bg2.jpg";
import cardImg6 from "../../assets/img/bg3.jpg";
import cardImg7 from "../../assets/img/hero1.jpg";
import cardImg8 from "../../assets/img/hero2.jpg";
import Title from "../../components/title";

const Gallary = () => {
  const [showImgView, setImageView] = React.useState(false);
  const [img, setImg] = React.useState("");
  const images = [
    {
      img: cardImg1,
    },
    {
      img: cardImg2,
    },
    {
      img: cardImg3,
    },
    {
      img: cardImg4,
    },
    {
      img: cardImg5,
    },
    {
      img: cardImg6,
    },
    {
      img: cardImg7,
    },
    {
      img: cardImg8,
    },
    {
      img: cardImg1,
    },
    {
      img: cardImg2,
    },
    {
      img: cardImg3,
    },
    {
      img: cardImg4,
    },
    {
      img: cardImg5,
    },
    {
      img: cardImg6,
    },
    {
      img: cardImg7,
    },
    {
      img: cardImg8,
    },
    {
      img: cardImg1,
    },
    {
      img: cardImg2,
    },
    {
      img: cardImg3,
    },
    {
      img: cardImg4,
    },
    {
      img: cardImg5,
    },
    {
      img: cardImg6,
    },
    {
      img: cardImg7,
    },
    {
      img: cardImg8,
    },
    {
      img: cardImg1,
    },
    {
      img: cardImg2,
    },
    {
      img: cardImg3,
    },
    {
      img: cardImg4,
    },
    {
      img: cardImg5,
    },
    {
      img: cardImg6,
    },
    {
      img: cardImg7,
    },
    {
      img: cardImg8,
    },
  ];
  return (
    <div className="gallary" style={{ background: "#fff" }}>
      <Title className="gallary__title" style={{ color: "#000" }}>
        Gallary
      </Title>
      <div className="gallary__cards">
        {images.map((item, index) => (
          // <GallaryCard key={index} image={item.img} />
          <GallaryCard
            setImageView={setImageView}
            showImgView={showImgView}
            img={img}
            setImg={setImg}
            key={index}
            image={item.img}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallary;
