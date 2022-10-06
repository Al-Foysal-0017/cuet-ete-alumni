import React from "react";
import "./__title.scss";

const Title = ({ children, style, className }: any) => {
  return (
    <div className="alumni__title">
      <div className={className} style={style}>
        {children}
      </div>
    </div>
  );
};

export default Title;
