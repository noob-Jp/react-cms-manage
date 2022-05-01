import React from "react";
import { Outlet } from "react-router-dom";
import { Button } from 'antd';


export default function App() {
  return (
    <div>
      App
      <Outlet />
    </div>
  );
}




