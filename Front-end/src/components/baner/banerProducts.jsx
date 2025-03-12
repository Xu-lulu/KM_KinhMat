import { useEffect, useState } from "react";
import baner1 from "../../assets/BanerProducts/baner1.png";
import baner2 from "../../assets/BanerProducts/baner2.png";
import baner3 from "../../assets/BanerProducts/baner3.png";
import baner4 from "../../assets/BanerProducts/baner4.jpg";
import baner5 from "../../assets/BanerProducts/baner5.jpg";
import "./baner.scss";
import { Carousel } from "antd";
const BanerProducts = () => {
  const banners = [baner4, baner5];
  const [currentBannerIndex, setcurrentBannerIndex] = useState(0);
  useEffect(() => {
    const interValId = setInterval(() => {
      setcurrentBannerIndex((prevIndex) => (prevIndex += 1) % banners.length);
    }, 5000);
    return () => clearInterval(interValId);
  }, []);
  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  return (
    <>
      <div className="baner-container">
        {/* <img
          src={banners[currentBannerIndex]}
          alt={`Banner ${currentBannerIndex + 1}`}
          className="slide-right"
        ></img> */}
        <div className="baner-container__right">baner-container</div>
        <div className="baner-container__left"></div>
      </div>
    </>
  );
};

export default BanerProducts;
