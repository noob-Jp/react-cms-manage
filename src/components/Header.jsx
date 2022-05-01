import React, {useEffect, useState } from "react";
import mylogo from "../../src/assets/mylogo.png";
import defaultAvatar from "../../src/assets/mylogo2.png";
import { Menu, Dropdown, Space ,message} from "antd";
import { CaretDownOutlined ,EditOutlined ,LoginOutlined} from "@ant-design/icons";
import {useNavigate} from 'react-router-dom';



export default function Header() {
  const navigate=useNavigate();
  const [avatar,setAvatar] =useState(defaultAvatar);
  const [username,setUsername] =useState('游客');
  //模拟componentDidMount
  useEffect(()=>{
    let username1=localStorage.getItem('username');
    let avatar1=localStorage.getItem('avatar');
    if(username1){
      setUsername(username1);
    }
    if(avatar1){
      //http://47.93.114.103:6688
      setAvatar('http://47.93.114.103:6688/'+avatar1);
    }
  },[])  
  //退出登录
const logout=()=>{
  
  localStorage.removeItem('cms-token');
  message.success('退出成功，即将返回登录页');
  setTimeout(()=>{
    navigate('/login')
  },1000)
}
//右侧下拉菜单内容
const menu = (
  <Menu
  style={{top:'20px'}}
    items={[
      {
        label: (
          <a
            rel="noopener noreferrer"
            href=""
          >
            修改资料
          </a>
        ),
        icon: <EditOutlined />,
      },
      {
        label: (
          <a
            rel="noopener noreferrer"
            onClick={logout}
          >
            退出登录
          </a>
        ),
        icon: <LoginOutlined />,
      },
    ]}
  />
);
 
  return (
    <header>
      <img src={mylogo} alt="" className="logo" />
      <div className="right">
        <Dropdown overlay={menu}>
          <a onClick={(e) => e.preventDefault()}>
          <img src={avatar} className="avatar"/>
            <Space>
              <span>{username}</span>
              <CaretDownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </header>
  );
}
