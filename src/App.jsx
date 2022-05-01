import React from "react";
import { Outlet } from "react-router-dom";
import { Layout} from "antd";
import Headers from "./components/Header";
import Siderbar from "./components/Sider";
export default function App() {
  const {  Sider, Content } = Layout;
  return (
    <div>
      <Layout className="app_page">
       <Headers></Headers>
        <Layout>
          <Sider><Siderbar></Siderbar></Sider>
          <Content>
            <Outlet />
          </Content>
          <footer>Respect | Copyright &copy; 2022 Author 你单排吧</footer>
        </Layout>
      </Layout>
    </div>
  );
}
