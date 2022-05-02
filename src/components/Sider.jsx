import React,{useEffect,useState} from "react";
import { Menu } from "antd";
import { useNavigate,useLocation } from "react-router-dom";
import {
  PieChartOutlined,
  DesktopOutlined,
  MailOutlined,
} from "@ant-design/icons";
export default function Sider() {
  const navigate = useNavigate();
  const location=useLocation();
  const [defaultKey,setDefaultKey]=useState('');

  //一般加个空数组，就是为了模仿componentDidMounted
  useEffect(()=>{
    let path=location.pathname;
    setDefaultKey(path)
  },[location])
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem("查看文章列表", "/list", <PieChartOutlined />),
    getItem("文章编辑", "/edit", <DesktopOutlined />),
    getItem("修改资料", "/means", <MailOutlined />),
  ];
  const [collapsed, setCollapsed] = React.useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const handleClick = (e) => {
    // console.log(e);
    navigate(e.key);
    setDefaultKey(e.key)
  };
  return (
    <div
      style={{
        width: 190,
      }}
    >
      <Menu
        defaultSelectedKeys={['/list']}
        selectedKeys={[defaultKey]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        items={items}
        onClick={handleClick}
      />
    </div>
  );
}
