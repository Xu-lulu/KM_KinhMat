import TextArea from "antd/es/input/TextArea";
import "./pay.scss";
import { Button, Form, Input, Select, Table } from "antd";
import {
  useDataUser,
  useAccessToken,
  useDataCart,
} from "../../common/dataReux";
import { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Radio } from "antd";
import { formatMoney } from "../../common/common";
import PayLayout from "./PayPalLayout";
import VietQrLayout from "./VietqrLayout";
import axios from "axios";

const Pay = () => {
  const [totalPrice, settotalPrice] = useState(0);
  const [totalCount, settotalCount] = useState(0);
  const [value, setValue] = useState(1);
  const [paypal, setpayPal] = useState(false);
  const [vietQr, setvietQr] = useState(false);
  const [valueQR, setvalueQR] = useState(false);

  const [form] = Form.useForm();
  const user = useDataUser();
  const dataCart = useDataCart();
  const token = useAccessToken();
  const [dataBank, setdataBank] = useState([]);
  const [bankNumbers, setbankNumber] = useState([]);

  useEffect(async () => {
    const res = await axios.get("http://localhost:3000/bank/allBank", {
      headers: {
        token: `Bearer ${token}`,
      },
    });
    setdataBank(res.data);
  }, []);
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

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("All form values:", values);
      // Thực hiện xử lý dữ liệu ở đây (ví dụ: gửi dữ liệu qua API)
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };
  const onChange = (e) => {
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
  };
  const onChangeQR = (e) => {
    setvalueQR(true);
  };
  const bankNames = dataBank.map((item) => item.Bankname);
  // const bankaccounts = dataBank.map((item) => item.Bankaccounts);
  // const bankNumber = dataBank.map((item) => item.Banknumber);
  // console.log(bankaccounts);

  console.log(dataBank);
  console.log(bankNames);
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
              rules={[{ required: true, message: "Nhập đầy đủ họ tên!" }]}
            >
              <Input size="large" placeholder="Nhập họ tên" />
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                { required: true, message: "Nhập đầy đủ số điện thoại!" },
              ]}
            >
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>
            <Form.Item
              label="Địa chỉ"
              name="Select"
              rules={[
                {
                  required: true,
                  message: "Please input!",
                },
              ]}
            >
              <div className="Pay__Left__Address">
                <Select
                  className="Pay__Left__Address__select"
                  placeholder="Tỉnh/Thành phố"
                />
                <Select
                  className="Pay__Left__Address__select__Right"
                  placeholder="Quận/Huyện"
                />
              </div>
              <TextArea placeholder="Nhập địa chỉ cụ thể" />
            </Form.Item>
            <Form.Item
              label="Ghi chú"
              name="note"
              rules={[{ required: false }]}
            >
              <TextArea />
            </Form.Item>
            {/* Thêm các trường dữ liệu khác của phần 1 của form ở đây */}
            <Form.Item
              label="Phương thức thanh toán"
              name="paypal"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn phương thức thanh toán",
                },
              ]}
            >
              <div>
                <Radio.Group onChange={onChange} value={value}>
                  <Radio value={1}>Thanh toán tiền mặt</Radio>
                  <Radio value={2}>Thanh toán Paypal</Radio>
                  {/* <FontAwesomeIcon icon={faCcPaypal} /> */}
                  <Radio value={3}>Thanh toán VietQR</Radio>
                  {/* <Radio value={4}>D</Radio> */}
                </Radio.Group>
              </div>
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
            <div className="Pay__Right__paypal">
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
                  className="Pay__Right__paypal__submitpay"
                  onClick={handleSubmit}
                >
                  Thanh toán
                </Button>
              ) : (
                <></>
              )}
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
export default Pay;
