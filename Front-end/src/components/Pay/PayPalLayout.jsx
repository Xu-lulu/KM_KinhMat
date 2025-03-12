// import {
//   PayPalScriptProvider,
//   PayPalButtons,
//   usePayPalScriptReducer,
// } from "@paypal/react-paypal-js";
// import { useEffect } from "react";

// // This value is from the props in the UI
// const style = { layout: "vertical" };

// // async function createOrder({ data, actions }) {
// //   // replace this url with your server
// //   return actions.order.create({
// //     purchase_units: [{ total: { currency_code: currency } }],
// //   });
// // }

// // async function onApprove(data) {
// //   // replace this url with your server
// //   const response = await fetch(
// //     "https://react-paypal-js-storybook.fly.dev/api/paypal/capture-order",
// //     {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify({
// //         orderID: data.orderID,
// //       }),
// //     }
// //   );
// //   const orderData = await response.json();
// // }

// // Custom component to wrap the PayPalButtons and show loading spinner
// const ButtonWrapper = ({ currency, showSpinner, total }) => {
//   const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
//   useEffect(() => {
//     dispatch({
//       type: "resetOptions",
//       value: {
//         ...options,
//         currency: currency,
//       },
//     });
//   }, [currency, showSpinner]);
//   return (
//     <>
//       {showSpinner && isPending && <div className="spinner" />}
//       <PayPalButtons
//         style={style}
//         disabled={false}
//         forceReRender={[style, currency, total]}
//         fundingSource={undefined}
//         createOrder={(data, actions) => {
//           return actions.order
//             .create({
//               purchase_units: [
//                 { total: { currency_code: currency, value: total } },
//               ],
//             })
//             .then((orderId) => orderId);
//         }}
//         onApprove={(data, actions) => {
//           return actions.order.capture().then(async (response) => {
//             console.log(response);
//           });
//         }}
//       />
//     </>
//   );
// };

// export default function PayLayout(total) {
//   return (
//     <div style={{ maxWidth: "750px", minHeight: "200px" }}>
//       <PayPalScriptProvider
//         options={{ clientId: "test", components: "buttons", currency: "USD" }}
//       >
//         <ButtonWrapper currency={"USD"} total={total} showSpinner={false} />
//       </PayPalScriptProvider>
//     </div>
//   );
// }

import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useEffect } from "react";

const style = { layout: "vertical" };

const ButtonWrapper = ({ currency, total, showSpinner }) => {
  const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[style, currency, total]}
        fundingSource={undefined}
        createOrder={async (data, actions) => {
          console.log("Currency:", currency);
          console.log("Total:", total);
          return await actions.order.create({
            purchase_units: [
              { amount: { currency_code: currency, value: total } },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          const response = await actions.order.capture();
            console.log(response);
        }}
      />
    </>
  );
};

export default function PayLayout({ total }) {
  return (
    <div style={{ maxWidth: "750px", minHeight: "200px" }}>
      <PayPalScriptProvider
        options={{ clientId: "test", components: "buttons", currency: "USD" }}
      >
        <ButtonWrapper currency={"USD"} total={total} showSpinner={false} />
      </PayPalScriptProvider>
    </div>
  );
}
