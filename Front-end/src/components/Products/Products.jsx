import ProductsCart from "./ProductCard";
import { useState, useEffect } from "react";
import "./Products.scss";
import { Pagination } from "antd";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Search from "../search/search";
import BanNer from "../baner/baner";
import { useSelector } from "react-redux";
import { useDataCategory, useDataProduct } from "../../common/dataReux";

const Products = () => {
  const [currentItems, setCurrentItems] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;
  const alldataProducts = useDataProduct();

  const dataCategory = useDataCategory();

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(alldataProducts.slice(itemOffset, endOffset));
  }, [itemOffset, alldataProducts]);

  const handlePageChange = (page) => {
    const newOffset = (page - 1) * itemsPerPage;
    setItemOffset(newOffset);
  };

  // const handleCategoryChange = (category) => {
  //   const filteredProducts = alldataProducts.filter(
  //     (product) => product.Category === category
  //   );
  //   setCurrentItems(filteredProducts.slice(0, itemsPerPage));
  //   setItemOffset(0);
  // };
  const handleCategoryChange = (category) => {
    if (category === "All") {
      // Nếu chọn danh mục "All", hiển thị tất cả sản phẩm
      setCurrentItems(alldataProducts.slice(0, itemsPerPage));
    } else {
      // Lọc danh sách sản phẩm theo danh mục được chọn
      const filteredProducts = alldataProducts.filter(
        (product) => product.Category === category
      );
      // Cập nhật danh sách sản phẩm và vị trí bắt đầu của trang về 0
      setCurrentItems(filteredProducts.slice(0, itemsPerPage));
    }
    setItemOffset(0);
  };
  const [activeCategory, setActiveCategory] = useState("All");
  return (
    <>
      <div className="Product-page">
        <div className="Products-baner">
          <BanNer />
        </div>
        <div className="Products-baner">
          <BanNer />
        </div>
        <div className="Products-baner">
          <BanNer />
        </div>
        <div className="Products-baner">
          <BanNer />
        </div>
        <div className="product">
          <nav className="navbarpro">
            <NavLink
              className={`${activeCategory === "All" ? "active" : ""}`}
              onClick={() => {
                handleCategoryChange("All");
                setActiveCategory("All");
              }}
            >
              All
            </NavLink>
            {dataCategory.map((item, index) => {
              return (
                <NavLink
                  // className="btn"
                  className={`${
                    activeCategory === item.Namecategory ? "active" : ""
                  }`}
                  key={index}
                  onClick={() => {
                    handleCategoryChange(item.Namecategory);
                    setActiveCategory(item.Namecategory);
                  }}
                >
                  {item.Namecategory}
                </NavLink>
              );
            })}
          </nav>{" "}
         <div className="data_products">
          {alldataProducts ? (
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
            ) : (
              <p>Loading</p>
            )}
         </div>
        </div>
        <Pagination
          current={Math.floor(itemOffset / itemsPerPage) + 1}
          pageSize={itemsPerPage}
          total={alldataProducts.length}
          onChange={handlePageChange}
          className="Pagination"
        />
      </div>
    </>
  );
};

export default Products;
