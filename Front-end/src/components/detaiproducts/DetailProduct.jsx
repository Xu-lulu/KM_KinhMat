import { useState, useContext, useEffect } from "react";
import "./detail.scss";
import { CartContext } from "../../Contexts/CartContext";
import { useParams, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import axios from "axios";
import ProductsCart from "../Products/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { findCategorys } from "../../redux/api/apiProduct";
import { addtoCart, upmountCart } from "../../redux/api/apiAddtoCart";
import {
  useDataCurrentUser,
  useDataFindCategory,
  useDataProduct,
  useAccessToken,
  useDataCart,
} from "../../common/dataReux";
import { createAxios } from "../../common/createInstane";
import { loginSuccess } from "../../redux/authSlice";
const DetailProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [add, setadd] = useState(0);
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();
  const alldataProducts = useDataProduct();
  const token = useAccessToken();
  const dataCurrent = useDataCurrentUser();
  let axiosJWT = createAxios(dataCurrent, dispatch, loginSuccess);
  const dataDetail = alldataProducts.find((item) => item._id === id);
  useEffect(() => {
    findCategorys(dispatch, dataDetail.Category);
  }, [dataDetail.Category]);
  const datafincategory = useDataFindCategory();
  const user = useSelector((state) => {
    const currentUser = state.auth.login.currentUser;
    if (currentUser && currentUser.newUsers) {
      return currentUser.newUsers;
    }
    return null;
  });
  const dataCartUser = useDataCart();
  const handleAdd = async () => {
    if (user) {
      const newItem = {
        _id: dataDetail._id,
        Name: dataDetail.Name,
        Price: dataDetail.Price,
        Image: dataDetail.Image,
        count: dataDetail.count,
        Category: dataDetail.Category,
        mount: 1,
      };
      if (dataCartUser) {
        const checkid = dataCartUser.find((item) => item._id === newItem._id);
        if (checkid) {
          const updatedMount = Number(checkid.mount) + 1;
          const updatedItem = { ...checkid, mount: updatedMount };
          upmountCart(dispatch, id, token, updatedItem, axiosJWT);
        } else {
          addtoCart(dispatch, user._id, token, newItem, axiosJWT);
        }
      } else {
        // Xử lý trường hợp dataCartUser là null hoặc trống
        addtoCart(dispatch, user._id, token, newItem, axiosJWT);
      }
    } else {
      navigate("/Login");
      toast.success("Bạn cần đăng nhập để có thể mua hàng!");
    }
  };
  // const checkid = myCart.find((item) => item._id === newItem._id);
  //   if (checkid) {
  //     checkid.mount++;
  //     setCount((add) => (add += 1));
  //   } else {
  //     addtoCart((item) => [...item, newItem]);
  //     setCount((add) => (add += 1));
  //   }
  //   setTotal((total) => (total += Number(dataDetail.Price)));
  //   toast.success("Đã thêm sản phẩm vào giỏ hàng");
  // } else {
  //   navigate("/Login");
  // }
  // const checkid = dataCartUser.find((item) => item._id === newItem._id);
  // if (checkid) {
  //   const updatedMount = Number(checkid.mount) + 1;
  //   const updatedItem = { ...checkid, mount: updatedMount };
  //   // const updatedataCart = { ...dataCartUser, updatedItem };
  //   // console.log("updata", updatedItem);
  //   upmountCart(dispatch, id, token, updatedItem, axiosJWT);
  // } else {
  //   addtoCart(dispatch, user._id, token, newItem, axiosJWT);
  // }
  // const checkid = dataCart.find((item) => item._id === newItem._id);
  // if (checkid) {
  //   checkid.mount++;
  //   setCount((add) => (add += 1));
  // }

  // const existingItemIndex = dataCart.findIndex(
  //   (item) => item._id === newItem._id
  // );

  // if (existingItemIndex !== -1) {
  //   dispatch(IncreaseMount(dataCart[existingItemIndex]._id));
  // setCount(count + 1);
  // }
  // else {
  //   dispatch(CartStart());
  //   try {
  //     dispatch(CartSuccess(newItem));
  //     toast.success("Đã thêm sản phẩm vào giỏ hàng");
  //   } catch (error) {
  //     dispatch(CartFailed(error));
  //   }
  // }

  // setTotal((total) => (total += Number(dataDetail.Price)));
  // addtoCart((item) => [...item, newItem]);
  //   } else {
  //     navigate("/Login");
  //     toast.success("Bạn cần đăng nhập để có thể mua hàng!");
  //   }
  // };
  // const dataCart = useSelector((state) => state.cart.dataCart.dataCart);
  // console.log("dataCart", dataCart);
  return (
    <>
      <div>
        <div className="products">
          <div className="products-Image-container">
            <img
              className="products-Image"
              src={dataDetail.Image}
              alt={`picture of: ${dataDetail.Name}`}
            />
          </div>
          <div className="container">
            <div className="container-product">
              <div className="productsCategory">
                <p>Danh mục/{dataDetail.Category}</p>
              </div>
              <div className="productsName">
                <p>{dataDetail.Name}</p>
              </div>
              <div className="productsPrice">
                <p>Giá: {dataDetail.Price}/1 suất</p>
              </div>
              <div className="productsDescription">
                <p>Chi tiết món ăn: {dataDetail.Description}</p>
              </div>
            </div>
            <div className="add-cart">
              <button className="products-btn" onClick={handleAdd}>
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
        <div className="AllFoodSame">
          <div className="FoodSame">
            <div className="line"></div>
            <p>Món ăn tương ứng</p>
          </div>
          <div className="FoodSame-Product">
            {datafincategory ? (
              <div className="alldataproduct row row-cols-4 gy-1 p-5">
                {datafincategory.map((product, index) => {
                  return (
                    <div className="product-card p-1" key={index}>
                      <ProductsCart
                        _id={product._id}
                        Name={product.Name}
                        Price={product.Price}
                        Description={product.Description}
                        Image={product.Image}
                        Count={product.count}
                        Category={product.Category}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>Loading</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailProduct;
