// import { useEffect } from "react";
// import "./scss/cashpayment.scss";
// import axios from "axios";
// import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
// import { Steps } from 'antd';
// const Cash_payment = ({ }) => {
//   const description = 'This is a description.';
//   return (
//     // <img
//     //   className="Pay__Right__paypal__vietqr"
//     //   src={`https://img.vietqr.io/image/Vietinbank-105872836449-compact2.jpg?amount=${totalPrice}&addInfo=Thanh%20toan%20QR&accountName=TRAN%20VAN%20TOAN`}
//     // ></img>
//     <Steps className="cashpayment"
//     items={[
//       {
//         title: 'Thanh Toán Trực Tiếp',
//         status: 'finish',
//         icon: <UserOutlined />,
//         description
//       },
//       {
//         title: 'Đơn hàng đang được chuẩn bị',
//         status: 'process',

//         // icon: <SolutionOutlined />,
//         icon: <LoadingOutlined />,
//         description

//       },
//       {
//         title: 'Đơn hàng đang được giao',
//         status: 'wait',
//         icon: <LoadingOutlined />,
//         description
//       },
//       {
//         title: 'Đã thanh toán',
//         status: 'wait',
//         // icon: <SmileOutlined />,
//         description
//       },
//     ]}
//   />
//   );
// };

// export default Cash_payment;
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Space, Table, Steps } from "antd";

import "./scss/cashpayment.scss";
import { useLocation } from "react-router-dom";
import {
  UserOutlined,
  LoadingOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { useDataCart, useDataUser } from "../../common/dataReux";
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
  const formData = location.state; // Lấy toàn bộ dữ liệu form từ state

  useEffect(() => {
    console.log("Dữ liệu form:", formData);
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
  }, [dataCart])

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
      <div className="cashpayment__detail_user">
        <h5>Thông tin khách hàng</h5>
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
              className="cashpayment__detail_user__Table"
              dataSource={dataCart.map((item, index) => ({
                ...item,
                key: index,
              }))}
              columns={columns}
              pagination={false}
            />
            {/* <div className="cashpayment__detail_pay__end">
              <div className="cashpayment__detail_pay__end__count">
                <p>Số sản phẩm: </p>
                <p>{totalCount}</p>
              </div>
              <div className="cashpayment__detail_pay__end__total">
                <p>Tổng tiền: </p>
                <p>{formatMoney(totalPrice)} VNĐ</p>
              </div>
            </div> */}
          </div>
        </Form>
        
      </div>
    </>
  );
};

export default Cash_payment;
