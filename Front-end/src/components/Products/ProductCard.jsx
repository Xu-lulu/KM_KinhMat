import { Link, NavLink } from "react-router-dom";
// import DetailProduct from "./detailProduct";
import { useNavigate } from "react-router-dom";
import "./Productscard.scss";
import VanillaTilt from "vanilla-tilt";
import { Rate } from "antd";
import { useEffect, useRef } from "react";
const ProductCard = (props) => {
  const { _id, Name, Price, Description, Image, count, Category } = props;
  const navigation = useNavigate();
  const handleclickDetail = () => {
    navigation(`/detail/${_id}`);
  };
  // const cardRef = useRef(null);
  // useEffect(() => {
  //   // Khởi tạo Vanilla Tilt trên phần tử thẻ card
  //   VanillaTilt.init(cardRef.current, {
  //     // reverse: false,
  //     max: 25,
  //     speed: 400,
  //     glare: true,
  //     "max-glare": 0.5,
  //   });

  //   // Dọn dẹp khi component bị hủy
  //   // return () => cardRef.current.VanillaTilt.destroy();
  // }, []);
  return (
    <>
      <div className="card" 
      // ref={cardRef}
      >
        <div onClick={handleclickDetail}>
          <div className="card_image">
            <img
              src={Image}
              alt={`picture of: ${Name}`}
            />
          </div>
          <div className="card_info">
            <h2>{Name}</h2>
            <h3>{Price}VND</h3>
            <div className="productsCard">
              <Link to={`/detail/${_id}`} className="btn">
                Xem chi tiết
              </Link>
            </div>
          </div>
        </div>
        <Rate allowHalf defaultValue={5} className="star" />
      </div>
    </>
  );
};
export default ProductCard;
