import React,{useState,useEffect} from 'react'
import { Table,Button,Space,Image,Popconfirm,Switch } from 'antd'
import {updateFlag,showdata} from './../../api/pro'
function Index() {
  const [listData, setlistData] = useState([])
  const [categoryList] = useState([])
  useEffect(()=>{
    showdata({type:'isseckill',flag:'1'}).then(res=>{
      setlistData(res.data.data)
    })
  },[])
  const updateSeckilllist = (proid,text)=>{
    updateFlag({
      proid,
      type:'isseckill',
      flag: text === '1' ? false : true
    }).then(res=> {
      showdata({type:'isseckill',flag:'1'}).then(res=>{
        setlistData(res.data.data)
      })
    })
  }
  const columns = [
    {
      title:'序号',
      fixed:'left',
      width:120,
      render:(text,record,index)=>{
        return <span>{index + 1}</span>
      }
    },
    {
      title:'名称',
      width:200,
      dataIndex:'proname'
    },
    {
      title:'分类',
      width:200,
      dataIndex:'category',
      filters:categoryList,
      onFilter:(value,record)=>record.category.indexOf(value) !== -1
    },
    {
      title:'品牌',
      width:200,
      dataIndex:'brand'
    },
    {
      title:'图片',
      width:120,
      dataIndex:'img1',
      render:(text,record,index)=>{
        return <Image src={text} width={60} height={60} />
      }
    },
    {
      title:'原价',
      width:120,
      dataIndex:'originprice'
    },
    {
      title:'折扣',
      width:120,
      dataIndex:'discount'
    },
    {
      title:'销量',
      width:120,
      dataIndex:'sales',
      sorter:(a,b)=> a.sales - b.sales
    },
    {
      title:'库存',
      width:200,
      dataIndex:'stock',
      sorter:(a,b)=>{return a.stock - b.stock}
    },
    {
      title:'上架状态',
      width:120,
      dataIndex:'issale',
      render:(text)=>{
        return <Switch checked={text} /> 
      }
    },
    {
      title:'是否秒杀',
      width:200,
      dataIndex:'isseckill',
      render:(text,record)=>{
        return <Switch onChange={()=>{ updateSeckilllist(record.proid,text) }} checked={text}/>
      }
    },
    {
      title:'操作',
      width:120,
      fixed:'right',
      dataIndex:'',
      align:'center',
      render:(text,record,index)=>{
        return <Space>
          <Popconfirm
          okText='确认'
          cancelText='取消'
          onConfirm={()=>{}}
          title='确认删除吗'
          >
            <Button type='danger'>删除</Button>
          </Popconfirm>
        </Space>
      }
    },
  ]
  return (
    <div>
      <Table dataSource={listData} columns={columns}/>
    </div>
  )
}

export default Index
