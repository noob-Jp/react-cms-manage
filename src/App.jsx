import React,{useEffect} from "react";
import { Outlet } from "react-router-dom";
import { Layout} from "antd";
import Headers from "./components/Header";
import Siderbar from "./components/Sider";
import Bread from "./components/Bread";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

function App(props) {
  const {  Sider, Content } = Layout;
  const navigate=useNavigate();
  useEffect(()=>{
    navigate('/list');
  },[])
  return (
    <div>
      <Layout className="app_page">
       <Headers key={props.mykey}></Headers>
        <Layout>
          <Sider><Siderbar></Siderbar></Sider>
          <Content className="container_box">
            <Bread></Bread>
            <div className="container_content">
              <Outlet />
            </div>
            
          </Content>
          <footer>Respect | Copyright &copy; 2022 Author 你单排吧</footer>
        </Layout>
      </Layout>
    </div>
  );
}

const mapStateToProps=(state)=>{
  return{
    mykey:state.mykey
  }
}
export default connect(mapStateToProps)(App)
