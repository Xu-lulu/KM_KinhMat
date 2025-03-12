import ProductsCart from "./ProductCard";
import { useState, useEffect, useMemo } from "react";
import "./Products.scss";
import { Pagination } from "antd";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Search from "../search/search";
import BanNer from "../baner/baner";
import { useSelector } from "react-redux";
import { useDataCategory, useDataProduct } from "../../common/dataReux";
import { Alert } from "antd";
import Marquee from "react-fast-marquee";
const Products = () => {
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;
  const alldataProducts = useDataProduct();
  const dataCategory = useDataCategory();
  const [activeCategory, setActiveCategory] = useState("All");

  // 🔹 Dùng useMemo để tránh tính toán lại không cần thiết
  const filteredProducts = useMemo(() => {
    return activeCategory === "All"
      ? alldataProducts
      : alldataProducts.filter(
          (product) => product.Category === activeCategory
        );
  }, [alldataProducts, activeCategory]);

  const currentItems = useMemo(() => {
    return filteredProducts.slice(itemOffset, itemOffset + itemsPerPage);
  }, [filteredProducts, itemOffset, itemsPerPage]);

  const handlePageChange = (page) => {
    const newOffset = (page - 1) * itemsPerPage;
    setItemOffset(newOffset);
  };

  const handleCategoryChange = (category) => {
    if (category === activeCategory) return; // Tránh cập nhật state nếu không có thay đổi

    setActiveCategory(category);
    setItemOffset(0); // Reset phân trang khi thay đổi danh mục
  };

  return (
    <>
      <div className="Product-page">
        <Alert
          banner
          message={
            <Marquee pauseOnHover gradient={false}>
              Khai Chương Khuyến Mãi Cực Khủng
            </Marquee>
          }
        />
        <div className="Products-baner">
          <BanNer />
        </div>
        <div className="product">
          <nav className="navbarpro">
            <NavLink
              className={`${activeCategory === "All" ? "active" : ""}`}
              onClick={() => handleCategoryChange("All")}
            >
              All
            </NavLink>
            {dataCategory.map((item, index) => (
              <NavLink
                className={`${
                  activeCategory === item.Namecategory ? "active" : ""
                }`}
                key={item.Namecategory} // Dùng key là tên danh mục thay vì index
                onClick={() => handleCategoryChange(item.Namecategory)}
              >
                {item.Namecategory}
              </NavLink>
            ))}
          </nav>

          <div className="data_products">
            {alldataProducts.length > 0 ? (
              <div className="alldataproduct row row-cols-5 gy-1">
                {currentItems.map((product) => (
                  <div className="product-card p-1" key={product._id}>
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
                ))}
              </div>
            ) : (
              <p>Loading</p>
            )}
          </div>
        </div>

        <Pagination
          current={Math.floor(itemOffset / itemsPerPage) + 1}
          pageSize={itemsPerPage}
          total={filteredProducts.length}
          onChange={handlePageChange}
          className="Pagination"
        />
      </div>
    </>
  );
};

export default Products;
