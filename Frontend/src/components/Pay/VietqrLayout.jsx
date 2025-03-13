import { useEffect } from "react";
import "./pay.scss";
import axios from "axios";

const VietQrLayout = ({ totalPrice, dataBank }) => {
  return (
    <img
      className="Pay__Right__paypal__vietqr"
      src={`https://img.vietqr.io/image/Vietinbank-105872836449-compact2.jpg?amount=${totalPrice}&addInfo=Thanh%20toan%20QR&accountName=TRAN%20VAN%20TOAN`}
    ></img>
  );
};

export default VietQrLayout;
