import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { Toaster, toast } from "sonner";
import { store, persistor } from "./redux/store.jsx";
import { PersistGate } from "redux-persist/integration/react";
// import { reportWebVitals } from "../reportWebVitals";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      {/* <ToastContainer /> */}
      <Toaster position="top-center" richColors />
    </PersistGate>
  </Provider>
);
// reportWebVitals();
