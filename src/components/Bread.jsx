import React, { useState, useEffect } from "react";
import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";
export default function Bread() {
  const location = useLocation();
  let pathname = location.pathname;
  // console.log(pathname);
  const [breadName, setBreadName] = useState("");
  useEffect(() => {
    switch (pathname) {
      case "/list":
        setBreadName("查看文章列表");
        break;
      case "/edit":
        setBreadName("文章编辑");
        break;
      case "/means":
        setBreadName("修改资料");
        break;
      default:
        setBreadName(pathname.includes('edit')?'文章编辑':'');
        break;
    }
  }, [pathname]);
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="/">首页</Breadcrumb.Item>
        <Breadcrumb.Item>{breadName}</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}
