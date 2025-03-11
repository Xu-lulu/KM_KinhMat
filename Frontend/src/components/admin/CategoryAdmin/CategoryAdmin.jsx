import { useSelector, useDispatch } from "react-redux";
// import CreateProduct from "./CreateProduct";
// import Update from "./update";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "../Products/Scss_Product/HomeAdmin.scss";
import "../Products/Scss_Product/productsAdmin.scss";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Model from "../../../common/Model";
import { deleteCategory } from "../../../redux/api/apiCategoryAdmin";
import {
  useAccessToken,
  useDataCategory,
  useDataCurrentUser,
} from "../../../common/dataReux";
import { loginSuccess } from "../../../redux/authSlice";
import { createAxios } from "../../../common/createInstane";

const CategoryAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const text = "Bạn có chắc chắn muốn xóa không?";
  const textheader = "Delete";
  const textfooter = "Xóa";
  const token = useAccessToken();
  const alldataCategorys = useDataCategory();
  const dataCurrent = useDataCurrentUser();
  let axiosJWT = createAxios(dataCurrent, dispatch, loginSuccess);
  const handleDelete = async (id) => {
    deleteCategory(dispatch, id, navigate, token, axiosJWT);
  };
  return (
    <>
      <div className="Container-Admin-product">
        <div className="Header">
          <h6>Quản lý danh mục</h6>
          <div className="d-flex justify-content-end">
            <NavLink
              className="btn btn-success create-product-button"
              to="/createCategory"
            >
              <FontAwesomeIcon className="iconadd" icon={faPlus} />
              Thêm danh mục
            </NavLink>
          </div>
        </div>
        <div className="Data">
          {alldataCategorys && alldataCategorys.length > 0 ? (
            <div className="admin-container-table">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Tên danh mục</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                {alldataCategorys.map((item, index) => {
                  return (
                    <tbody key={index}>
                      <tr>
                        <td>
                          <p className="Admin-item">{item.Namecategory}</p>
                        </td>
                        <td>
                          <div className="Admin-item">
                            <Link
                              className="admin-edit"
                              to={`/editcategory/${item._id}`}
                            >
                              <i class="fa-regular fa-pen-to-square"></i>
                            </Link>
                          </div>
                        </td>
                        <td>
                          {/* <div className="admin-delete-btn"> */}
                          <Model
                            className="Create-submit"
                            handleSubmit={handleDelete}
                            textheader={<i class="fa-solid fa-trash"></i>}
                            textbody={text}
                            textfooter={textfooter}
                            id={item._id}
                          />
                          {/* </div> */}
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          ) : (
            <>
              {" "}
              <div className="Nodata">
                <Lottie animationData={LogoNodata} loop={true} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default CategoryAdmin;
