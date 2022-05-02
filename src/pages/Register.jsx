import React from "react";
import { Form, Input, Button, Checkbox,message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link ,useNavigate} from "react-router-dom";
import "./less/Login.less";
import myLogo from "../assets/mylogo.png";
import {reqRegister} from '../request/api.js'
export default function Login() {
  const navigate=useNavigate();
  const onFinish = (values) => {
    console.log("Success:", values);
    reqRegister({
      username:values.username,
      password:values.password
    }).then((res)=>{
      console.log(res);
      if(res.errCode===0){
        message.success('注册成功，即将跳转到登录页');
        setTimeout(()=>{
          navigate('/login')
        },1500)
       
      }else if(res.errCode===1){
        message.error('注册失败,用户已存在');
      }
    })
  };

  return (
    <div className="login">
      <div className="login_box">
        <img src={myLogo} alt="LOGO"/>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
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

          <Form.Item
            name="confirm" 
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "请再次输入确认密码!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      "请输入相同密码"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              size="large"
              placeholder="请再次确认密码"
            />
          </Form.Item>

          <Form.Item style={{ display: "inline-flex" }}>
            <Link to="/login">已有账号？立即去登录</Link>
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
              立即注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
