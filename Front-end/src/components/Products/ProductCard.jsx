import { Link, useNavigate } from "react-router-dom";
import "./Productscard.scss";
import { Rate } from "antd";
import { memo, useCallback } from "react";

const ProductCard = ({ _id, Name, Price, Image }) => {
  const navigate = useNavigate();

  // 🔹 Dùng useCallback để tối ưu hiệu suất
  const handleClickDetail = useCallback(() => {
    navigate(`/detail/${_id}`);
  }, [_id, navigate]);

  return (
    <div className="card">
      <div onClick={handleClickDetail}>
        <div className="card_image">
          <img src={Image} alt={`picture of: ${Name}`} />
        </div>
        <div className="card_info">
          <h2>{Name}</h2>
          <h3>{Price} VND</h3>
          <div className="productsCard">
            <Link to={`/detail/${_id}`} className="btn">
              Xem chi tiết
            </Link>
          </div>
        </div>
      </div>
      <Rate allowHalf defaultValue={5} className="star" />
    </div>
  );
};

// 🔹 Dùng React.memo để tránh re-render không cần thiết
export default memo(ProductCard);
