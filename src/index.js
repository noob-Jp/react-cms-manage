import App from "./App";
import "./assets/base.css";
import { createRoot } from "react-dom/client";
// import { Provider } from "react-redux";
// import store from './store'
import BaseRouter from "./router/index.jsx";
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BaseRouter>
  </BaseRouter>
);
