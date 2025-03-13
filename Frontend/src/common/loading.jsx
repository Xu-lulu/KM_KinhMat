import { useEffect, useState } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
export const SpinLoad = () => {
//   const [spinning, setSpinning] = useState(false);
//     const showLoader = () => {
//       setSpinning(true);
//       setTimeout(() => {
//         setSpinning(false);
//       }, 3000);
//     };
//   useEffect(() => {
//     if (spinning) {
//       const timer = setTimeout(() => {
//         setSpinning(false);
//       }, 3000);

//       return () => clearTimeout(timer);
//     }
//   }, [spinning]);

//   const showLoader = () => {
//     setSpinning(true);
//   };
  return <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }}/>} spinning={true} fullscreen />;
};
