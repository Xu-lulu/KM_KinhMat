import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../../productsAdmin.scss";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createCategory } from "../../../../redux/api/apiCategoryAdmin";
import {
  useAccessToken,
  useDataCategory,
  useDataCurrentUser,
} from "../../../../common/dataReux";
import { createAxios } from "../../../../common/createInstane";
import { loginSuccess } from "../../../../redux/authSlice";

const CreateCategory = () => {
  const [name, setname] = useState("");

  const navgigate = useNavigate();
  const dispatch = useDispatch();
  const dataCategory = useDataCategory();
  const token = useAccessToken();
  const dataCurrent = useDataCurrentUser();
  let axiosJWT = createAxios(dataCurrent, dispatch, loginSuccess);

  const handleSubmit = async (event) => {
    const addcategory = {
      Namecategory: name,
    };
    event.preventDefault();
    createCategory(dispatch, navgigate, token, addcategory, axiosJWT);
  };
  return (
    <>
      <div className="Container-Create-Product">
        <h3>Thêm Danh Mục</h3>
        <form className="Form-Create-Product">
          <div className="Form-Name-Price">
            <div className="mb-3 Form-Name">
              <label className="form-label" name="name">
                Tên Danh mục
              </label>
              <input
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
              className="btn-createCategory"
              onClick={handleSubmit}
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default CreateCategory;
