import React from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import main1 from "../../images/main1.jpg";
import main2 from "../../images/main2.jpg";
import main3 from "../../images/main3.jpg";

const Slider2 = () => (
  <AwesomeSlider animation="cubeAnimation">
    <div data-src={main1}></div>

    <div data-src={main2}>
      <div
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(0, 0, 0, 0)",
          zIndex: 1,
          color: "white",
          textAlign: "center",
        }}
      >
        <h5>
          Hello! <br />
          다양한 적립 서비스를 즐겨보세요
        </h5>
      </div>
    </div>
    <div data-src={main3}></div>
  </AwesomeSlider>
);
export default Slider2;
