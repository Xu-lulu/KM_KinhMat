import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../../productsAdmin.scss";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { editCategory } from "../../../../redux/api/apiCategoryAdmin";
import {
  useAccessToken,
  useDataCategory,
  useDataCurrentUser,
} from "../../../../common/dataReux";
import { createAxios } from "../../../../common/createInstane";
import { loginSuccess } from "../../../../redux/authSlice";
const UpdateCategory = () => {
  const { id } = useParams();
  const [name, setname] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useAccessToken();
  const alldataCategorys = useDataCategory();
  const dataCurrent = useDataCurrentUser();
  let axiosJWT = createAxios(dataCurrent, dispatch, loginSuccess);
  const dataupdate = alldataCategorys.find((item) => item._id === id);
  useEffect(() => {
    setname(dataupdate.Namecategory);
  }, [dataupdate]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const addproducts = {
      Namecategory: name,
    };
    editCategory(dispatch, id, token, addproducts, navigate, axiosJWT);
  };
  return (
    <>
      <div className="Container-Create-Product">
        <h3>Cập nhật Danh mục</h3>
        <form className="Form-Create-Product">
          <div className="Form-Name-Price">
            <div className="mb-3 Form-Name">
              <label className="form-label" name="name">
                Tên sản phẩm
              </label>
              <input
                value={name}
                type="text"
                className="form-control"
                name="name"
                onChange={(e) => setname(e.target.value)}
              />
            </div>
          </div>
          <div className="">
            <button
              type="submit"
              className="btn btn-primary Create-submit"
              onClick={handleSubmit}
            >
              Sửa sản phẩm
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default UpdateCategory;
