import React, { useEffect, useState } from "react";
import { Table, Space, Button ,Popconfirm,message} from "antd";
import { useNavigate } from "react-router-dom";
import {reqGetArticleList,reqDelArticle} from '../request/api'
import moment from "moment";

//标题组件
function Mytitle(props){
  return(
    <div>
      <a style={{ color: '#000000' }}>{props.title}</a>
      <p style={{ color: '#999' }}>{props.subTitle}</p>
    </div>
  )
}
export default function ListTable() {
  //列表数据
  const [arr,setArr]=useState([]);
  const navigate=useNavigate();
  //分页
  const [pagination,setPagination] =useState({current:1,pageSize:10,total:0});
  //文章id
  const [articleId,setArticleId]=useState('');
  useEffect(()=>{
    getArticle(pagination.current,pagination.pageSize);
  },[])
  //分页器切换
  const pageChange=(arg)=>getArticle(arg.current,arg.pageSize);
  //提取请求文章列表代码
  const getArticle=(current,pageSize)=>{
    reqGetArticleList({
      num:current,
      count:pageSize
    }).then((res)=>{
      if(res.errCode===0){
        let {num,count,total}=res.data;
        setPagination({current:num,pageSize:count,total});
        //深拷贝获取到的数组
        let newArr=JSON.parse(JSON.stringify(res.data.arr));
        //声明一个空数组
        let myArr=[];
        /*
          1.给每一个数组项加一个key
          2.处理后台返回的日期
          3.标题组件
        */
        newArr.map(item=>{
          let obj={
            key:item.id,
            date:moment(item.data).format("YYYY-MM-DD hh:mm:ss"),
            mytitle:<Mytitle id={item.id} title={item.title} subTitle={item.subTitle}></Mytitle>
          }
          myArr.push(obj)
        })
        setArr(myArr);
      }
    })
  };
  //气泡确认框点击事件
  function confirm(id) {
    // console.log(id);
    reqDelArticle({id:id}).then((res)=>{
      if(res.errCode===0){ 
        message.success(res.message);
        getArticle(1,pagination.pageSize);
      }
      else{
        message.error(res.message);
      }
    })
  }
  
  function cancel(e) {
    message.success("点击了取消");
  }

  const columns = [
    {
      title: "标题",
      dataIndex: "mytitle",
      key: "mytitle",
      width: '60%',
      render: (text) => <div>{text}</div>,
    },
    {
      title: "日期",
      dataIndex: "date",
      key: "date",
      render: text => <p>{text}</p>,
    },

    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={()=>navigate('/edit/'+text.key)}>编辑</Button>
          <Popconfirm
            title="是否删除这篇文章?"
            onConfirm={()=>confirm(text.key)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
             <Button type="danger">删除</Button>
          </Popconfirm> 
        </Space>
      ),
    },
  ];

 

  return (
    <div style={{width:'100%',overflowY:'scroll'}}>
      <Table 
      columns={columns} 
      dataSource={arr} 
      pagination={pagination}
      onChange={pageChange}
      sticky={true}
      bordered/>
    </div>
  );
}
