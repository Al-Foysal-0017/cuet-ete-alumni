import React from "react";
import { MdPeopleAlt, MdOutlineEvent } from "react-icons/md";
import { BsImage } from "react-icons/bs";
import { FaAward } from "react-icons/fa";
import Container from "../../../components/container/Container";
import "./__performance.scss";

const Performance = () => {
  const data = [
    {
      icon: <MdPeopleAlt size={48} />,
      number: "4025",
      name: "Members",
    },
    {
      icon: <BsImage size={48} />,
      number: "8724",
      name: "Photos",
    },
    {
      icon: <MdOutlineEvent size={48} />,
      number: "231",
      name: "Events",
    },
    {
      icon: <FaAward size={48} />,
      number: "32",
      name: "Awards",
    },
  ];
  return (
    <div className="performance">
      <Container>
        <div className="performance__cards">
          {data.map((item, index) => (
            <div key={index} className="performance__cards__item">
              <div className="performance__cards__item__left">{item.icon}</div>
              <div className="performance__cards__item__right">
                <div className="performance__cards__item__right__top">
                  {item.number}
                </div>
                <div className="performance__cards__item__right__bottom">
                  {item.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Performance;
