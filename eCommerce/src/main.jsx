import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "remixicon/fonts/remixicon.css";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import App from "./App.jsx";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <Provider store={store}>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          closeOnClick
          pauseOnHover={false}
          theme="light"
        />
        <ToastContainer />
        <App />
      </Provider>
  </StrictMode>
);
