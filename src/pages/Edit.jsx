import React, { useEffect, useState } from "react";
import { PageHeader, Button, Modal, Form, Input, message } from "antd";
import moment from "moment";
import E from "wangeditor";
import {reqAddArticle,reqUpdateArticle} from '../request/api';
import {useNavigate, useParams} from 'react-router-dom';
let editor = null;
export default function Edit() {
  const [content, setContent] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const params=useParams();
  const navigate=useNavigate();
  useEffect(() => {
    editor = new E("#div1");
    editor.config.onchange = (newHtml) => {
      setContent(newHtml);
    };
    //创建实例
    editor.create();

    return () => {
      //组件销毁时销毁编辑器，
      editor.destroy();
    };
  }, []);

  //处理请求数据
  const dealData=(errCode,msg)=>{
    setIsModalVisible(false);//关闭对话框
    if(errCode===0){
      message.success(msg);
      setTimeout(()=>{
        //跳到list页面
        navigate("/list")
      },1500)
    }else{
      message.error(msg);
    }
  }

  //对话框事件
  const handleOk=()=>{
    form.validateFields().then((values)=>{
      console.log(values);
      //解构对话框中标题与副标题的值
      let {title,subtitle} =values;
      //地址栏有id的话，代表现在是要更新文章
      if(params.id){
        //更新文章的请求
        reqUpdateArticle({title,subtitle,content,id:params.id})
          .then((res)=>{
            dealData(res.errCode,res.message);
          })
      }else{
        //添加文章的请求
        reqAddArticle({title,subtitle,content})
        .then((res)=>{
          dealData(res.errCode,res.message);
        })
      }
      
    }).catch(()=>false);
  }
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  //对话框内表单事件
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div style={{ width: "100%" }}>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="文章编辑"
        subTitle={"当前日期：" + moment(new Date()).format("YYYY-MM-DD")}
        extra={
          <Button key="1" type="primary" onClick={showModal}>
            提交文章
          </Button>
        }
      ></PageHeader>
      
      <div id="div1" style={{ padding: "0 20px" }}></div>

      <Modal
        zIndex={99999}
        title="填写文章标题"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="提交" cancelText="取消"
      >
        <Form
          form={form}
          name="title"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[
              {
                required: true,
                message: "请输入标题!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="副标题"
            name="subtitle"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
