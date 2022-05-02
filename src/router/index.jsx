/**
 * App > List + Edit + Means
 * Login
 * Register
 *
 * History 模式 --BrowserRouter
 * Hash 模式    --HashRouter
 */

import App from "../App";
import ListTable from "../pages/ListTable";
import Edit from "../pages/Edit";
import Means from "../pages/Means";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

const BaseRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/list" element={<ListTable />}></Route>
        <Route path="/edit" element={<Edit />}></Route>
        <Route path="/means" element={<Means />}></Route>
      </Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
    </Routes>
  </Router>
);

export default BaseRouter;
