import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./less/Login.less";
import myLogo from "../assets/mylogo.png";
export default function Login() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login">
      <div className="login_box">
        <img src={myLogo} />
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            style={{ marginTop: "10px" }}
            name="username"
            rules={[
              {
                required: true,
                message: "请输入用户名",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              size="large"
              placeholder="请输入用户名"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "请输入密码",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              size="large"
              placeholder="请输入密码"
            />
          </Form.Item>

          <Form.Item style={{ display: "inline-flex" }}>
            <Link to="/register">还没账号？立即去注册</Link>
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            style={{ display: "inline-flex", marginLeft: "200px" }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" size="large" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
