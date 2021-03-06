import "./assets/base.less";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import BaseRouter from "./router/index.jsx";
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BaseRouter></BaseRouter>
  </Provider>
);
