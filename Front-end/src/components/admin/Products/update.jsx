import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../productsAdmin.scss";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UpdateProduct } from "../../../redux/api/apiProductAdmin";
import { useDispatch, useSelector } from "react-redux";
import {
  useAccessToken,
  useDataCategory,
  useDataCurrentUser,
  useDataProduct,
  useDataProductAdmin,
} from "../../../common/dataReux";
import { createAxios } from "../../../common/createInstane";
import { loginSuccess } from "../../../redux/authSlice";
const Update = () => {
  const { id } = useParams();
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [count, setcount] = useState("");
  const [urlimg, seturlimg] = useState("");
  const [category, setcategory] = useState("");
  const navgigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const token = useAccessToken();
  const alldataProducts = useDataProductAdmin();
  const dataCurrent = useDataCurrentUser();
  let axiosJWT = createAxios(dataCurrent, dispatch, loginSuccess);
  const dataupdate = alldataProducts.find((item) => item._id === id);
  useEffect(() => {
    setdescription(dataupdate.Description);
    setname(dataupdate.Name);
    setprice(dataupdate.Price);
    setcategory(dataupdate.Category);
    setcount(dataupdate.count);
  }, []);
  const dataCategory = useDataCategory();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const addproducts = {
      Name: name,
      Price: price,
      Description: description,
      Image: urlimg,
      count: count,
      Category: category,
    };
    UpdateProduct(dispatch, id, token, addproducts, navgigate, axiosJWT);
  };
  const handleImageChange = (event) => {
    seturlimg(event.target.files[0]);
    setSelectedImage(URL.createObjectURL(event.target.files[0]));
  };
  return (
    <>
      <div className="Container-Create-Product">
        <h3>Cập nhật Món Ăn</h3>
        <form className="Form-Create-Product">
          <div className="Image-Des">
            <div>
              <label className="form-label" htmlFor="image">
                Chọn ảnh
              </label>
              {selectedImage ? (
                <>
                  <label
                    className="form-label"
                    name="description"
                    htmlFor="image"
                  >
                    <img
                      src={selectedImage}
                      alt="Selected"
                      className="selected-image"
                    />
                  </label>

                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </>
              ) : (
                <>
                  <div className="mb-3 Image-form" onSubmit={handleSubmit}>
                    <label className="form-label" htmlFor="image">
                      <img
                        className="selected-image"
                        src={dataupdate.Image}
                        alt=""
                      ></img>
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      name="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                  </div>
                </>
              )}
            </div>

            <div className="mb-3 form-des">
              <label className="form-label" name="description">
                Chi tiết sản phẩm
              </label>
              <input
                type="text"
                value={description}
                className="form-control input-create-description"
                name="description"
                onChange={(e) => setdescription(e.target.value)}
              />
            </div>
          </div>
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
            <div className="mb-3 Form-Price">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label"
                name="price"
              >
                Giá
              </label>
              <input
                value={price}
                type="text"
                className="form-control"
                name="price"
                onChange={(e) => setprice(e.target.value)}
              />
            </div>
          </div>
          <div className="Form-Count-Category">
            <div className="mb-3 Form-Count">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label"
                name="count"
              >
                Số lượng
              </label>
              <input
                type="text"
                value={count}
                className="form-control"
                name="count"
                onChange={(e) => setcount(e.target.value)}
              />
            </div>
            <div className="mb-3 Form-Category">
              <label htmlFor="category" className="form-label">
                Danh mục sản phẩm
              </label>
              <select
                id="category"
                className="form-select"
                onChange={(e) => setcategory(e.target.value)}
                value={category}
              >
                <option value="">Chọn danh mục</option>
                {dataCategory.map((item, index) => {
                  return (
                    <option
                      key={index}
                      onChange={(e) => setcategory(e.target.value)}
                    >
                      {item.Namecategory}
                    </option>
                  );
                })}
              </select>
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
      {/* <form>
        <div className="mb-3" onSubmit={handleSubmit}>
          <label className="form-label" name="name">
            Tên sản phẩm
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label" name="price">
            Giá
          </label>
          <input
            type="text"
            className="form-control"
            name="price"
            value={price}
            onChange={(e) => setprice(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" name="description">
            Chi tiết sản phẩm
          </label>
          <input
            type="text"
            className="form-control"
            name="description"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="image">
            Chọn ảnh
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            onChange={handleImageChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Danh mục sản phẩm
          </label>
          <select
            id="category"
            className="form-select"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
          >
            <option value="">{category}</option>
            {dataCategory.map((item, index) => {
              return (
                <option
                  key={index}
                  value={item.Namecategory}
                  onChange={(e) => setcategory(e.target.value)}
                >
                  {item.Namecategory}
                </option>
              );
            })}
          </select>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form> */}
    </>
  );
};
export default Update;
