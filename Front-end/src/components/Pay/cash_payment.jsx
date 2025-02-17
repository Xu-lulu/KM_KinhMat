import { useEffect } from "react";
import "./scss/cashpayment.scss";
import axios from "axios";
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { Steps } from 'antd';
const Cash_payment = ({ }) => {
  const description = 'This is a description.';
  return (
    // <img
    //   className="Pay__Right__paypal__vietqr"
    //   src={`https://img.vietqr.io/image/Vietinbank-105872836449-compact2.jpg?amount=${totalPrice}&addInfo=Thanh%20toan%20QR&accountName=TRAN%20VAN%20TOAN`}
    // ></img>
    <Steps className="cashpayment"
    items={[
      {
        title: 'Thanh Toán Trực Tiếp',
        status: 'finish',
        icon: <UserOutlined />,
        description
      },
      {
        title: 'Đơn hàng đang được chuẩn bị',
        status: 'process',

        // icon: <SolutionOutlined />,
        icon: <LoadingOutlined />,
        description

      },
      {
        title: 'Đơn hàng đang được giao',
        status: 'wait',
        icon: <LoadingOutlined />,
        description
      },
      {
        title: 'Đã thanh toán',
        status: 'wait',
        // icon: <SmileOutlined />,
        description
      },
    ]}
  />
  );
};

export default Cash_payment;
