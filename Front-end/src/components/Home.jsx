import { useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import baner1 from "../assets/baner1.png";
import baner2 from "../assets/baner2.png";
import baner3 from "../assets/baner3.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import BanerProducts from "./baner/banerProducts";
import { useSelector } from "react-redux";
import { useDataProduct } from "../common/dataReux";
import { shuffle } from "lodash";
const Home = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const dataProducts = useDataProduct();
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    if (dataProducts && dataProducts.length > 0) {
      const shuffledProducts = shuffle(dataProducts);
      setTopProducts(shuffledProducts.slice(0, 3));
      setSelectedProduct(shuffledProducts[0]);
    }
  }, [dataProducts]);

  const handleOptionClick = (product) => {
    setSelectedProduct(product);
  };
  console.log(selectedProduct.Image);
  return (
    <>
      <div className="HomeContainer">
        {/* <div className="imageContainer roboto-thin-italic">
          <h1>Thế giới ẩm thực dành cho bạn</h1>
          <h2>
            Nơi cung cấp đa dạng các món đồ ăn ngon, từ đồ ăn nhanh đến món ngon
            miệng, để bạn có thể thưởng thức mỗi ngày. Đặt hàng ngay hôm nay để
            trải nghiệm sự tiện lợi và ngon miệng!
          </h2>
          <Link to="/products">
            <button>Đặt hàng ngay</button>
          </Link>
        </div>
        <div className="home-baner-container">
          <img src={baner1} alt="baner1"></img>
          <img src={baner2} alt="baner2"></img>
          <img src={baner3} alt="baner3"></img>
        </div> */}
        <div className="banner">
          <div className="content"></div>
          <div className={`imgBox ${searchActive ? "active" : ""}`}>
            {selectedProduct && (
              <>
                <div className="food">
                  <img
                    src={selectedProduct.Image}
                    alt=""
                    className="food-img"
                  ></img>
                </div>
                <div className="description">
                  <h3>{selectedProduct.Name}</h3>
                  <p>{selectedProduct.Description}</p>
                </div>
              </>
            )}
          </div>
          <div className="detail">
            <button
              className={`detail__btn ${searchActive ? "active" : ""}`}
              onClick={() => setSearchActive(!searchActive)}
            >
              Xem chi tiết
            </button>
          </div>
          <div className="selections">
            <div className="circle">
              {topProducts.map((product, index) => (
                <div
                  key={index}
                  className={`options option-${index + 1}`}
                  onClick={() => handleOptionClick(product)}
                >
                  <img src={product.Image} alt={product.Name}></img>
                </div>
              ))}
            </div>
            <h1>Healthy Life</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
