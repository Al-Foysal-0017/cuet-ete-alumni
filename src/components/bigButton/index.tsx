import React from "react";
import { Link } from "react-router-dom";
import "./__bigButton.scss";

const BigButton = ({ link, name, center = false, style }: any) => {
  return (
    <Link to={link}>
      <div
        style={{ justifyContent: center ? "center" : "" }}
        className="big_btn"
      >
        <button>{name}</button>
      </div>
    </Link>
  );
};

export default BigButton;
