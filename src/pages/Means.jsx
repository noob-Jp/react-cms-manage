import React,{useEffect,useState} from 'react'
import { Form, Input, Button,Upload,message} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {reqGetUserData,reqChangeUserData} from '../request/api'
import { connect } from 'react-redux';


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
//上传之前触发，限制图片大小为小于200KB
function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024/ 1024/ 1024  < 200;
  if (!isLt2M) {
    message.error('请上传小于200KB的图片!');
  }
  return isJpgOrPng && isLt2M;
}

function Means(props) {
  const [loading,setLoading]=useState(false);
  const [imageUrl,setImageUrl ]=useState('');

  useEffect(()=>{
    let imgUrl=localStorage.getItem('avatar');
    if(imgUrl){
      setImageUrl("http://47.93.114.103:6688/"+imgUrl);
    }
    //请求获取用户信息，并存储
    reqGetUserData().then((res)=>{
      console.log(res);
      if(res.errCode===0){
        sessionStorage.setItem('username',res.data.username);
      }
    })
  },[])
  //提交按钮点击事件
  const onFinish = (values) => {
    const {username,password}=values;
    if(username&&username!==sessionStorage.getItem('username')&&password.trim()!==''){
      reqChangeUserData({
        username: username,
        password: password
      })
        .then((res)=>{
          console.log(res);
        })
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>{
        setLoading(false);
        setImageUrl(imageUrl);
        //存储图片名称
        localStorage.setItem('avatar',info.file.response.data.filePath);

        props.addKey();
      }
      );
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>修改头像</div>
    </div>
  );
  return (
    <div style={{margin:'auto',textAlign:'center'}}>
      <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{

      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="修改用户名"
        name="username"
      >
        <Input placeholder='请输入新用户名'/>
      </Form.Item>

      <Form.Item
        label="修 改 密 码"
        name="password"
      >
        <Input.Password   placeholder='请输入新密码'/>
      </Form.Item>


      <Form.Item
        wrapperCol={{
          offset: 0,
          span: 24,
        }}
      >
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
      </Form>
      <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="/api/upload"
          beforeUpload={beforeUpload}
          onChange={handleChange}
          headers={{"cms-token":localStorage.getItem('cms-token')}}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
    </div>
  )
}

const mapDispatchToProps=(dispatch)=>{
  return{
    addKey(){
      const action={
        type:"addKeyFn"
      }
      dispatch(action);
    }
  }
}

export default connect(null,mapDispatchToProps)(Means)
