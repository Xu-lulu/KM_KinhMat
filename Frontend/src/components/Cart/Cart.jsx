import { useContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Cart.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faCartShopping,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, Link } from "react-router-dom";
import ProductsCart from "../Products/ProductCard";
import { deleteOneCartItem, upmountCart } from "../../redux/api/apiAddtoCart";
import {
  useDataCart,
  useDataUser,
  useDataProduct,
  useAccessToken,
  useDataCurrentUser,
} from "../../common/dataReux";
import { formatMoney } from "../../common/common";
import { createAxios } from "../../common/createInstane";
import { loginSuccess } from "../../redux/authSlice";
const Cart = () => {
  const dispatch = useDispatch();
  const [totalPrice, settotalPrice] = useState(0);
  const [totalCount, settotalCount] = useState(0);
  const dataCart = useDataCart();
  const alldataProducts = useDataProduct();
  const user = useDataUser();
  const token = useAccessToken();
  const dataCurrent = useDataCurrentUser();
  let axiosJWT = createAxios(dataCurrent, dispatch, loginSuccess);

  useEffect(() => {
    if (user && dataCart) {
      const sumPrice = dataCart.reduce(
        (acc, currentItem) =>
          acc + Number(currentItem.Price) * currentItem.mount,
        0
      );
      const sumCount = dataCart.reduce(
        (acc, currentItem) => acc + Number(currentItem.mount),
        0
      );
      settotalPrice(sumPrice);
      settotalCount(sumCount);
    } else {
      settotalPrice(0);
      settotalCount(0);
    }
  }, [dataCart]);

  const [currentItems, setCurrentItems] = useState([]);
  const [itemOffset, setitemOffset] = useState(0);
  const itemsPerPage = 10;
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(alldataProducts.slice(itemOffset, endOffset));
  }, [itemOffset, itemsPerPage, alldataProducts]);

  const handcleclinkIncrement = (id) => {
    const checkid = dataCart.find((item) => item._id === id);
    const updatedMount = Number(checkid.mount) + 1;
    const updatedItem = { ...checkid, mount: updatedMount };
    upmountCart(dispatch, id, token, updatedItem, axiosJWT);
    // const index = myCart.findIndex((item) => item._id === id);
    // const cartNewState = [...myCart];
    // cartNewState[index].mount++;
    // addtoCart(cartNewState);
    // setTotal((totals) => (totals += Number(cartNewState[index].Price)));
    // setCount((count) => (count += 1));
    // upmountCart(dispatch,,token,)
  };
  const handcleclinkDecrement = (id) => {
    // const index = myCart.findIndex((item) => item._id === id);
    // if (myCart[index].mount > 1) {
    //   const cartNewState = [...myCart];
    //   cartNewState[index].mount--;
    //   addtoCart(cartNewState);
    //   setTotal((totals) => (totals -= Number(cartNewState[index].Price)));
    //   setCount((count) => (count -= 1));
    // }
    const checkid = dataCart.find((item) => item._id === id);
    const updatedMount = Number(checkid.mount) - 1;
    const updatedItem = { ...checkid, mount: updatedMount };
    upmountCart(dispatch, id, token, updatedItem, axiosJWT);
  };
  const isCartEmpty = () => {
    if (dataCart) {
      return true;
    } else {
      return false;
    }
    // return dataCart.length === 0;
  };
  const handcleclinkRemove = (id) => {
    deleteOneCartItem(dispatch, id, token, axiosJWT);
  };
  return (
    <>
      <div className="Cart">
        {!isCartEmpty() ? (
          <>
            <div className="No-cart">
              <FontAwesomeIcon icon={faCartShopping} className="iconNocart" />
              <p>Giỏ hàng trống</p>
            </div>
            <div className="Nocart-container">
              <p>Có thể bạn cũng thích</p>
              <NavLink className="allproduct" to={`/product`}>
                Xem tất cả{" "}
                <FontAwesomeIcon
                  className="icon-faAngles"
                  icon={faAnglesRight}
                />
              </NavLink>
            </div>
            <div className="allproduct-cart">
              <div className="alldataproduct row row-cols-5 gy-1">
                {currentItems.map((product, index) => {
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
            </div>
          </>
        ) : (
          <>
            <div className="Cart-container">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Ảnh</th>
                    <th scope="col">Tên sản phẩm</th>
                    <th scope="col">Giá tiền</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                {dataCart.map((item, index) => {
                  return (
                    <tbody key={index}>
                      <tr>
                        <th scope="row">
                          <img
                            className="cart-item-img"
                            src={item.Image}
                            alt=""
                          ></img>
                        </th>
                        <td>
                          <p className="Cart-right">{item.Name}</p>
                        </td>
                        <td>
                          <p className="Cart-right">
                            {formatMoney(item.Price)} VNĐ
                          </p>
                        </td>
                        <td>
                          <div className="Cart-right">
                            <div>
                              <button
                                className="amount-btn amount-de"
                                onClick={() => handcleclinkDecrement(item._id)}
                              >
                                {" "}
                                -
                              </button>
                            </div>
                            <h5>{item.mount}</h5>
                            <div>
                              <button
                                className="amount-btn amount-in"
                                onClick={() => handcleclinkIncrement(item._id)}
                              >
                                {" "}
                                +
                              </button>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="Cart-right">
                            <button
                              className="amount-btn delete-item-cart"
                              onClick={() => handcleclinkRemove(item._id)}
                            >
                              <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
              <div className="pay">
                <div className="pay1">
                  <p>Số sản phẩm: </p>
                  <p>{totalCount}</p>
                </div>
                <div className="pay2">
                  <p>Tổng tiền: </p>
                  <p>{formatMoney(totalPrice)} VNĐ</p>
                </div>
                <div className="delete-pay">
                  <div className="pay3">
                    <Link>Xóa tất cả</Link>
                  </div>
                  <div className="pay4">
                    <Link to={`/pay`}>Thanh Toán</Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="Nocart-container">
              <p>Có thể bạn cũng thích</p>
              <NavLink className="allproduct" to={`/products`}>
                Xem tất cả{" "}
                <FontAwesomeIcon
                  className="icon-faAngles"
                  icon={faAnglesRight}
                />
              </NavLink>
            </div>
            <div className="allproduct-cart">
              <div className="alldataproduct row row-cols-5 gy-1">
                {currentItems.map((product, index) => {
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
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
