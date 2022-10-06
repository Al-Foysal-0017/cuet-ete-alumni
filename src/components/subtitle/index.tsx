import React from "react";
import "./__subtitle.scss";

const Subtitle = ({ children, style, className }: any) => {
  return (
    <div className="alumni__subtitle">
      <div className={className} style={style}>
        {children}
      </div>
    </div>
  );
};

export default Subtitle;
