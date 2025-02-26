import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Space,
  Table,
  Steps,
  Card,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";

import "./scss/cashpayment.scss";
import { useLocation } from "react-router-dom";
import {
  UserOutlined,
  LoadingOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import {
  useDataCart,
  usedataDistricts,
  usedataProvinces,
  useDataUser,
  usedataWards,
} from "../../common/dataReux";
import { formatMoney } from "../../common/common";
const { Step } = Steps;
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
const steps = [
  {
    title: "Thanh Toán Trực Tiếp",
    icon: <UserOutlined />,
  },
  {
    title: "Đơn hàng đang được chuẩn bị",
    icon: <LoadingOutlined />,
  },
  {
    title: "Đơn hàng đang được giao",
    icon: <LoadingOutlined />,
  },
  {
    title: "Đã thanh toán",
    icon: <SmileOutlined />,
  },
];
const Cash_payment = () => {
  const [currentStep, setCurrentStep] = useState(1); // Giả lập trạng thái đơn hàng
  const dataCart = useDataCart();
  const [form] = Form.useForm();
  const [totalPrice, settotalPrice] = useState(0);
  const [totalCount, settotalCount] = useState(0);
  const user = useDataUser();
  const [data, setData] = useState([]);
  const location = useLocation();
  const [editing, setEditing] = useState(false);
  const formData = location.state; // Lấy toàn bộ dữ liệu form từ state
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [selectedDistricts, setSelectedDistricts] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedWards, setSelectedWards] = useState(null);

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const datauseProvinces = usedataProvinces();
  const datauseDistricts = usedataDistricts();
  const datauseWards = usedataWards();
  useEffect(() => {
    console.log(formData);
    if (formData) {
      setUserData(formData);
      form.setFieldsValue(formData);
    }
  }, [formData, form]);

  const handleCityChange = (value) => {
    console.log("Selected District:", value);
    const city = provinces.find((city) => city.name === value);
    if (city) {
      const id = city.code;
      const data = provinces.find((item) => item.code === id);
      setSelectedCity(data);
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
      const id = res.code;

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

  const handleEdit = () => setEditing(true);

  const handleCancel = () => {
    form.setFieldsValue(userData);
    setEditing(false);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setUserData(values);
      setEditing(false);
      message.success("Thông tin đã được lưu!");
    } catch (error) {
      message.error("Vui lòng điền đầy đủ thông tin hợp lệ!");
    }
  };

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

  return (
    <>
      <div className="cashpayment">
        <Steps
          className="cashpayment__status"
          current={currentStep}
          items={steps.map((step, index) => ({
            ...step,
            status:
              index < currentStep
                ? "finish"
                : index === currentStep
                ? "process"
                : "wait",
          }))}
        />
      </div>
      <div className="cashpayment__detail_pay">
        <h5>Thông tin đơn hàng</h5>
        <Form
          form={form}
          name="productForm"
          labelCol={{ flex: "110px" }}
          labelAlign="left"
          labelWrap
          wrapperCol={{ flex: 1 }}
          colon={false}
        >
          <div>
            {" "}
            <Table
              className="cashpayment_detail_pay__Table"
              dataSource={dataCart.map((item, index) => ({
                ...item,
                key: index,
              }))}
              columns={columns}
              pagination={false}
            />
            <div className="cashpayment__detail_pay__end">
              <div className="cashpayment__detail_pay__end__count">
                <p>Số sản phẩm: </p>
                <p>{totalCount}</p>
              </div>
              <div className="cashpayment__detail_pay__end__total">
                <p>Tổng tiền: </p>
                <p>{formatMoney(totalPrice)} VNĐ</p>
              </div>
            </div>
          </div>
          {/* <div className="Pay__Right__pay">
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
                <Link to={`/pay/cashpayment`}>Thanh Toán</Link>
              </Button>
            ) : (
              <>
                <Button
            className="Pay__Right__pay__cashpayment"
            onClick={handleSubmit}
          >
            Thanh Toán cashpayment
          </Button>
              </>
            )}
          </div> */}
        </Form>
      </div>
      <div className="max-w-xl mx-auto p-4">
        <Card title="Thông Tin Người Dùng" className="rounded-2xl shadow-lg">
          <Form
            form={form}
            layout="vertical"
            // initialValues={formData} // Dữ liệu có sẵn được đưa vào các ô input khi form tải lần đầu
            disabled={!editing} // Mặc định không cho chỉnh sửa cho đến khi bấm nút "Chỉnh sửa"
          >
            <Form.Item
              label="Họ và tên"
              name="fullName"
              // rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
              initialValues={formData.fullName}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              // rules={[
              //   { required: true, message: "Vui lòng nhập email!" },
              //   { type: "email", message: "Email không hợp lệ!" },
              // ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="phone"
              // rules={[
              //   { required: true, message: "Vui lòng nhập số điện thoại!" },
              // ]}
              initialValues={formData.phone}
            >
              <Input />
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
                  // rules={[
                  //   {
                  //     required: false,
                  //     message: "Vui lòng chọn tỉnh/thành phố!",
                  //   },
                  // ]}
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
                  // rules={[
                  //   { required: false, message: "Vui lòng chọn quận/huyện!" },
                  // ]}
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
                  // rules={[
                  //   { required: false, message: "Vui lòng chọn xã/phường!" },
                  // ]}
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
                <div className="Pay__Left__Address1"></div>
                <Form.Item
                  label="Số nhà/ngõ/ngách"
                  name="houseNumber"
                  initialValue=""
                  // rules={[
                  //   {
                  //     required: false,
                  //     message: "Vui lòng nhập số nhà/ngõ/ngách!",
                  //   },
                  // ]}
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
            
          </Form>
          <div className="flex justify-end space-x-2">
              {editing ? (
                <>
                  <Button onClick={handleCancel}>Hủy</Button>
                  <Button type="primary" onClick={handleSave}>
                    Lưu
                  </Button>
                </>
              ) : (
                <Button type="primary" onClick={handleEdit}>
                  Chỉnh sửa
                </Button>
              )}
            </div>
        </Card>
      </div>
    </>
  );
};

export default Cash_payment;
