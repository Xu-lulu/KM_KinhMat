import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { dataProducts, dataCategorys } from "../../../redux/api/apiProduct";
import { useSelector, useDispatch } from "react-redux";
import HomeAdmin from "./HomeAdmin";
import "../productsAdmin.scss";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Model from "../../../common/Model";
import { createProduct } from "../../../redux/api/apiProductAdmin";
import { createAxios } from "../../../common/createInstane";
import { loginSuccess } from "../../../redux/authSlice";
import {
  useAccessToken,
  useDataCategory,
  useDataCurrentUser,
} from "../../../common/dataReux";
import { UploadOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";

const CreateProduct = () => {
  const [name, setname] = useState("");
  const [brand, setbrand] = useState("");
  const [status, setstatus] = useState("");

  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [count, setcount] = useState("");
  const [urlimg, seturlimg] = useState("");
  const [category, setcategory] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [fileList, setFileList] = useState([]);
  const text = "Bạn có chắc chắn muốn lưu không?";
  const textheader = "Thêm sản phẩm";
  const textfooter = "Lưu";
  const dataCurrent = useDataCurrentUser();
  const dispatch = useDispatch();
  let axiosJWT = createAxios(dataCurrent, dispatch, loginSuccess);

  const navgigate = useNavigate();
  const dataCategory = useDataCategory();
  const token = useAccessToken();

  const dataCondition = [
    {
      NameCondition: "còn hàng",
    },
    {
      NameCondition: "hết hàng",
    },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();

    // const addproducts = {
    //   Name: name,
    //   Price: price,
    //   Description: description,
    //   image: urlimg,
    //   count: count,
    //   Category: category,
    // };
    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Brand", brand);
    formData.append("Price", price);
    formData.append("Description", description);
    formData.append("Image", urlimg);
    formData.append("Count", count);
    formData.append("Category", category);
    formData.append("Status", status);
    formData.append("setFileList", fileList);

    createProduct(dispatch, navgigate, token, formData, axiosJWT);
  };
  console.log(name,brand,price,description,urlimg,count,category,status,fileList)
  const handleImageChange = (event) => {
    seturlimg(event.target.files[0]);
    setSelectedImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleMultipleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedImages(files);
  };

  const handlePreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const handleFileChange = ({ fileList: newFileList }) => {
    if (Array.isArray(newFileList) && newFileList.length <= 5) {
      setFileList(newFileList);
    } else {
      toast.error("Bạn chỉ có thể tải lên tối đa 5 ảnh.");
    }
  };

  console.log(fileList);
  return (
    <>
      <div className="Container-Create-Product">
        <h3>Thêm Sản Phẩm</h3>
        <form
          className="Form-Create-Product"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="Form__1">
            <div className="Form__1__Name-Brand">
              <div className="mb-3 Form-Name">
                <label className="form-label" name="name">
                  Tên sản phẩm
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  onChange={(e) => setname(e.target.value)}
                />
              </div>
              <div className="mb-3 Form-Brand">
                <label className="form-label" name="brand">
                  Tên thương hiệu
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="brand"
                  onChange={(e) => setbrand(e.target.value)}
                />
              </div>

              <div className="Form__1__Price-Count">
                <div className="mb-3 Form-Price">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label"
                    name="price"
                  >
                    Giá(VNĐ)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="price"
                    onChange={(e) => setprice(e.target.value)}
                  />
                </div>
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
                    className="form-control"
                    name="count"
                    onChange={(e) => setcount(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="Form__1__ImageMain">
              <label className="form-label" htmlFor="image">
                Chọn ảnh chính
              </label>
              {selectedImage ? (
                <>
                  <div>
                    <label className="form-label" name="Image" htmlFor="image">
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
                      name="Image"
                      accept="*/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-3 Image-form">
                    <label className="form-label" name="Image" htmlFor="image">
                      <div className="icon-image">
                        <FontAwesomeIcon icon={faImage} />
                      </div>
                      Chọn ảnh
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      name="Image"
                      accept="*/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="Form-Des">
            <div className="mb-3 form-des">
              <label className="form-label" name="description">
                Chi tiết sản phẩm
              </label>
              <textarea
                type="text"
                className="form-control input-create-description"
                name="description"
                onChange={(e) => setdescription(e.target.value)}
              />
            </div>
          </div>
          <div className="Form-Category-Condition">
            <div className="mb-3 Form-Category">
              <label htmlFor="category" className="form-label">
                Danh mục sản phẩm
              </label>
              <select
                id="category"
                className="form-select"
                // value={category}
                onChange={(e) => setcategory(e.target.value)}
              >
                <option value="">Chọn danh mục</option>
                {dataCategory.map((item, index) => {
                  return (
                    <option
                      key={index}
                      // onChange={(e) => setcategory(e.target.value)}
                    >
                      {item.Namecategory}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3 Form-Condition">
              <label htmlFor="status" className="form-label">
                Tình trạng
              </label>
              <select
                id="status"
                className="form-select"
                // value={status}
                onChange={(e) => setstatus(e.target.value)}
              >
                <option value="">Chọn tình trạng</option>
                {dataCondition.map((item, index) => {
                  return (
                    <option
                      key={index}
                      // onChange={(e) => setstatus(e.target.value)}
                    >
                      {item.NameCondition}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="Object_Image">
            <p>Ảnh chi tiết &lt;tối đa 5 ảnh&gt;</p>
            <ImgCrop rotationSlider>
              <Upload
                listType="picture-card"
                fileList={fileList}
                beforeUpload={() => false} // Ngăn tải lên tự động
                onChange={handleFileChange}
                onPreview={handlePreview}
              >
                {fileList.length < 5 && "+ Tải lên"}
              </Upload>
            </ImgCrop>
          </div>
          <div className="">
            <button type="submit" className="btn btn-createProduct">
              Lưu
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default CreateProduct;
