import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import "./baner.scss";
import baner1 from "../../assets/BanerProducts/baner1.png";
import baner2 from "../../assets/BanerProducts/baner2.png";
import baner3 from "../../assets/BanerProducts/baner3.png";
import baner4 from "../../assets/BanerProducts/baner4.jpg";
import baner5 from "../../assets/BanerProducts/baner5.jpg";
const BanNer = () => {
  const [allBanner, setallBanner] = useState([]);
  const allbannersss = [baner1, baner2, baner3, baner4, baner5];
useEffect(()=>{
    setallBanner(allbannersss)
},[])
  return (
    <>
      <div className="Banner">
        <div className="Banner__right">
          <Carousel
            autoplay
            draggable={true}
            arrows
            infinite={true}
            autoplaySpeed={3500}
            dotPosition="bottom"
          >
            {allBanner.map((item, index) => {
              return (
                <div key={index} className="item-image">
                  <img src={item} alt={`Banner ${index + 1}`}></img>
                </div>
              );
            })}
            {/* <div>
            <img src={baner1} alt="banner1"></img>
          </div> */}
          </Carousel>
        </div>
        <div className="Banner__left">
          <div className="Banner__left__voucher-first">
            <img></img>
          </div>
          <div className="Banner__left_voucher-second">
            <img></img>
          </div>
        </div>
      </div>
    </>
  );
};
export default BanNer;
