import React, { useState } from "react";
import { BsChevronUp } from "react-icons/bs";
import "./_scrollToTopBtn.scss";

function ScrollToTopBtn() {
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 150) {
      setVisible(true);
    } else if (scrolled <= 150) {
      setVisible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };
  window.addEventListener("scroll", toggleVisible);
  return (
    <>
      {visible && (
        <div className="scrollToTop" onClick={scrollToTop}>
          <BsChevronUp />
        </div>
      )}
    </>
  );
}

export default ScrollToTopBtn;
