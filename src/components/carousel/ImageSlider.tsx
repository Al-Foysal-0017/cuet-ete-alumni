import React, { useState, useEffect } from "react";
import { SliderData } from "./SliderData";
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";
import "./imageSlider.css";
import ImageLoader from "./imageLoader/imageLoader";

const ImageSlider = ({ slides }: any) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = slides?.length;

  const autoScroll = true;
  let slideInterval: any;
  let intervalTime = 4000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function auto() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [auto, autoScroll, currentSlide, slideInterval]);

  return (
    <section className="slider">
      {SliderData.map((slide, index) => {
        return (
          <div key={index} className="slider-container">
            <div
              className={
                index === currentSlide
                  ? "slide active slider-left"
                  : "slide slider-left"
              }
            >
              {index === currentSlide && (
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div className="imageSlider-textBox">
                      <div>{slide.txt}</div>
                      <div
                        style={{
                          bottom: "16px",
                          right: "2rem",
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <HiArrowNarrowLeft
                          style={{ marginRight: "8px" }}
                          onClick={prevSlide}
                          className="arrowIconHome"
                        />
                        <HiArrowNarrowRight
                          className="arrowIconHome"
                          onClick={nextSlide}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Right Side --- img */}
            <div
              className={
                index === currentSlide
                  ? "slide active slider-right"
                  : "slide slider-right"
              }
              key={index}
            >
              {index === currentSlide && (
                <div style={{ display: "flex" }}>
                  <ImageLoader src={slide.image} className="image" />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default ImageSlider;
