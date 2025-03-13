import TextArea from "antd/es/input/TextArea";
import "./pay.scss";
import { Button, Form, Input, Select, Space, Table } from "antd";
import {
  useDataUser,
  useAccessToken,
  useDataCart,
  usedataProvinces,
  usedataDistricts,
  usedataWards,
} from "../../common/dataReux";
import { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Radio } from "antd";
import { formatMoney } from "../../common/common";
import PayLayout from "./PayPalLayout";
import VietQrLayout from "./VietqrLayout";
import axios from "axios";
import { API_ROOT } from "../../../constants";
import {
  dataDistricts,
  dataProvinces,
  dataWards,
} from "../../redux/api/apiLocation";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cash_payment from "./cash_payment";
const columns = [
  {
    title: "",
    dataIndex: "Image",
    key: "Image",
    render: (text, item) => (
      <img
        src={`${item.Image}`}
        alt=""
        style={{ width: 50, height: 40, borderRadius: 10 }}
      />
    ),
  },
  {
    title: "Tên",
    dataIndex: "Name",
    key: "Name",
    class: "styleTable",
  },
  {
    title: "Số lượng",
    dataIndex: "mount",
    key: "mount",
    class: "styleTable",
  },
  {
    title: "Giá",
    dataIndex: "Price",
    key: "Price",
    render: (text, record) => formatMoney(record.Price) + " VNĐ",
    class: "styleTable",
  },
];
const Pay = () => {
  const dispatch = useDispatch();
  const [totalPrice, settotalPrice] = useState(0);
  const [totalCount, settotalCount] = useState(0);
  const [value, setValue] = useState(1);
  const [paypal, setpayPal] = useState(false);
  const [vietQr, setvietQr] = useState(false);
  const [valueQR, setvalueQR] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const user = useDataUser();
  const dataCart = useDataCart();
  const token = useAccessToken();
  const [dataBank, setdataBank] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedWards, setSelectedWards] = useState(null);

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const datauseProvinces = usedataProvinces();
  const datauseDistricts = usedataDistricts();
  const datauseWards = usedataWards();
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const res = await axios.get("http://localhost:3000/bank/allBank", {
  //         headers: { token: `Bearer ${token}` },
  //       });
  //       setdataBank(res.data);
  //     } catch (error) {
  //       console.error("Lỗi khi lấy dữ liệu ngân hàng:", error);
  //     }
  //   }

  //   fetchData();
  // }, [token]);
  useEffect(() => {
    dataProvinces(dispatch);
  }, [dispatch]);
  useEffect(() => {
    if (datauseProvinces) {
      setProvinces(datauseProvinces);
    }
  }, [datauseProvinces]);
  useEffect(() => {
    if (Array.isArray(datauseDistricts)) {
      setDistricts(datauseDistricts);
    } else {
      setDistricts([]);
    }
  }, [datauseDistricts]);
  useEffect(() => {
    if (Array.isArray(datauseWards)) {
      setWards(datauseWards);
    } else {
      setWards([]);
    }
  }, [datauseWards]);
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
  const handleCityChange = (value) => {
    console.log("Selected District:", value);
    const city = provinces.find((city) => city.name === value);
    if (city) {
      const id = city.code; // Lấy đúng ID của tỉnh đang chọn
      dataDistricts(dispatch, id);
      setSelectedCity(value);
      form.setFieldsValue({
        city: value,
        district: undefined,
        ward: undefined,
      });
    } else {
      setDistricts([]);
      setSelectedCity(null);
    }
  };
  const handledistricChange = (value) => {
    const res = districts.find((data) => data.name === value);
    if (res) {
      const id = res.code; // Lấy đúng ID của tỉnh đang chọn
      dataWards(dispatch, id);
      setSelectedDistricts(value);
      form.setFieldsValue({ district: value, ward: undefined });
    } else {
      setWards([]);
      setSelectedDistricts(null);
    }
  };
  const handleWardChange = (value) => {
    setSelectedWards(value);
    form.setFieldsValue({ ward: value });
  };
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      console.log("All form values:", values.province);
      navigate("/pay/cashpayment", { state: values });

    } catch (error) {
      console.error("Validation failed:", error);
    }
  };
  const onChange = (e) => {
    form.setFieldsValue({ paypal: 1 });
    setValue(e.target.value);
    if (e.target.value === 1) {
      setpayPal(false);
      setvietQr(false);
      setvalueQR(false);
    }
    if (e.target.value === 2) {
      setpayPal(true);
      setvietQr(false);
      setvalueQR(false);
    }
    if (e.target.value === 3) {
      setvietQr(true);
      setpayPal(false);
    }
    if (e.target.value === "") {
      setpayPal(false);
      setvietQr(false);
      setvalueQR(false);
    }
  };
  const onChangeQR = (e) => {
    setvalueQR(true);
  };
  const bankNames = dataBank.map((item) => item.Bankname);
  // const bankaccounts = dataBank.map((item) => item.Bankaccounts);
  // const bankNumber = dataBank.map((item) => item.Banknumber);
  // console.log(bankaccounts);

  // console.log(dataBank);
  // console.log(bankNames);
  // console.log("wards", datauseWards);
  const handlesubmitPaypal = () => {};
  return (
    <>
      <div className="Pay">
        {/* Phần 1 của form */}
        <div className="Pay__Left">
          <Form
            form={form}
            name="userForm"
            labelCol={{ flex: "110px" }}
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 1 }}
            colon={false}
            // style={{ maxWidth: 600 }}
          >
            <h2>Thanh Toán</h2>
            <p>Thông tin người nhận</p>
            <Form.Item
              label="Họ Tên"
              name="fullName"
              rules={[{ required: false, message: "Nhập đầy đủ họ tên!" }]}
            >
              <Space>
                <Input size="large" placeholder="Nhập họ tên" />
              </Space>
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                { required: false, message: "Nhập đầy đủ số điện thoại!" },
              ]}
            >
              <Space>
                <Input placeholder="Nhập số điện thoại" />
              </Space>
            </Form.Item>

            <Form.Item
              label="Địa chỉ"
              // name="Select"
              rules={[
                {
                  required: false,
                  message: "Please input!",
                },
              ]}
            >
              <div className="Pay__Left__Address">
                <Form.Item
                  name="province"
                  noStyle
                  rules={[
                    {
                      required: false,
                      message: "Vui lòng chọn tỉnh/thành phố!",
                    },
                  ]}
                >
                  <Select
                    name="provinces"
                    className="Pay__Left__Address__provinces"
                    placeholder="Tỉnh/Thành phố"
                    value={selectedCity}
                    onChange={handleCityChange} // Gọi hàm khi chọn tỉnh
                  >
                    {provinces.map((city) => (
                      <Select.Option key={city.code} value={city.name}>
                        {city.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="district"
                  noStyle
                  rules={[
                    { required: false, message: "Vui lòng chọn quận/huyện!" },
                  ]}
                >
                  <Select
                    name="districts"
                    className="Pay__Left__Address__select__districts"
                    placeholder="Quận/Huyện"
                    value={selectedDistricts}
                    onChange={handledistricChange}
                    disabled={!selectedCity} // Vô hiệu hóa nếu chưa chọn tỉnh
                  >
                    {districts ? (
                      <>
                        {districts.map((district) => (
                          <Select.Option
                            key={district.code}
                            value={district.name}
                          >
                            {district.name}
                          </Select.Option>
                        ))}
                      </>
                    ) : (
                      <></>
                    )}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="ward"
                  noStyle
                  rules={[
                    { required: false, message: "Vui lòng chọn xã/phường!" },
                  ]}
                >
                  <Select
                    name="wards"
                    className="Pay__Left__Address1__wards"
                    placeholder="Xã/Phường"
                    value={selectedWards}
                    onChange={handleWardChange}
                    disabled={!selectedDistricts}
                  >
                    {wards ? (
                      <>
                        {wards.map((ward) => (
                          <Select.Option key={ward.code} value={ward.name}>
                            {ward.name}
                          </Select.Option>
                        ))}
                      </>
                    ) : (
                      <></>
                    )}
                  </Select>
                </Form.Item>
              </div>
              <Space className="space">
                <div className="Pay__Left__Address1">
                </div>
                <Form.Item
                  label="Số nhà/ngõ/ngách"
                  name="houseNumber"
                  initialValue=""
                  rules={[
                    {
                      required: false,
                      message: "Vui lòng nhập số nhà/ngõ/ngách!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Space>
            </Form.Item>
            <Form.Item
              label="Ghi chú"
              name="note"
              rules={[{ required: false }]}
            >
              <Space>
                <TextArea />
              </Space>
            </Form.Item>
            {/* Thêm các trường dữ liệu khác của phần 1 của form ở đây */}
            <Form.Item
              label="Phương thức thanh toán"
              name="paypal"
              initialValue={1}
              rules={[
                {
                  required: false,
                  message: "Vui lòng chọn phương thức thanh toán",
                },
              ]}
            >
              <Space>
                <div>
                  <Radio.Group onChange={onChange} value={value}>
                    <Radio value={1}>Thanh toán tiền mặt</Radio>
                    <Radio value={2}>Thanh toán Paypal</Radio>
                    {/* <FontAwesomeIcon icon={faCcPaypal} /> */}
                    <Radio value={3}>Thanh toán VietQR</Radio>
                    {/* <Radio value={4}>D</Radio> */}
                  </Radio.Group>
                </div>
              </Space>
            </Form.Item>
            {vietQr && (
              <Form.Item
                label="Phương thức thanh toán QR"
                name="paypal"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn phương thức thanh toán",
                  },
                ]}
              >
                <Space>
                  <div>
                    {/* <Radio.Group onChange={onChangeQR} value={valueQR}>
                      {dataBank.map((item, index) => {
                        return (
                          <>
                            <Radio key={index} value={item._id}>
                              {item.Bankname}
                            </Radio>
                            ;
                          </>
                        );
                      })}
                    </Radio.Group> */}

                    <Select
                      options={bankNames.map((name) => ({
                        value: name,
                        label: name,
                      }))}
                      onChange={onChangeQR}
                    />
                  </div>
                </Space>
              </Form.Item>
            )}
          </Form>
        </div>

        {/* Phần 2 của form */}
        <div className="Pay__Right">
          <h5>Thông tin đơn hàng</h5>
          <Form
            form={form}
            name="productForm"
            labelCol={{ flex: "110px" }}
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 1 }}
            colon={false}
            style={{ maxWidth: 600 }}
          >
            <Table
              className="Pay__Right__Table"
              dataSource={dataCart.map((item, index) => ({
                ...item,
                key: index,
              }))}
              columns={columns}
              pagination={false}
            />
            <div className="pay">
              <div className="pay1">
                <p>Số sản phẩm: </p>
                <p>{totalCount}</p>
              </div>
              <div className="pay2">
                <p>Tổng tiền: </p>
                <p>{formatMoney(totalPrice)} VNĐ</p>
              </div>
            </div>
            <div className="Pay__Right__pay">
              {paypal && !vietQr && !valueQR ? (
                <div style={{ marginTop: "5%" }}>
                  <PayLayout total={totalPrice} />
                </div>
              ) : valueQR && vietQr && !paypal ? (
                <>
                  <VietQrLayout totalPrice={totalPrice} dataBank={dataBank} />
                </>
              ) : !paypal && !vietQr && !valueQR ? (
                <Button
                  className="Pay__Right__pay__paypal__submitpay"
                  onClick={handleSubmit}
                >
                  {/* <Link to={`/pay/cashpayment`} >Thanh Toán</Link> */}
                  Thanh Toán
                </Button>
              ) : (
                <>
                  {/* <Button
                    className="Pay__Right__pay__cashpayment"
                    onClick={handleSubmit}
                  >
                    Thanh Toán cashpayment
                  </Button> */}
                </>
              )}
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
export default Pay;
