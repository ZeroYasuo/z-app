import React,{ useState, useEffect } from 'react'
import { Table, Space, Button, Image, Popconfirm, Tooltip } from 'antd'
import { getBannerList, removeItem } from './../../api/banner'
function Index() {
  const [bannerlist, setBannerlist] = useState([])
  useEffect(()=>{
    getBannerList().then(res=>{
      setBannerlist(res.data.data)
    })
  },[])
  
  const deleteItem = (bannerid)=>{
    console.log(bannerid)
    removeItem({bannerid}).then(res=>{
      getBannerList().then(res=>{
        setBannerlist(res.data.data)
        console.log(bannerlist)
      })
    })
  }
  const columns = [
    {
      title:'序号',
      align:'center',
      dataIndex:'',
      render:(text,record,index) =>{
        return <span> {index + 1} </span>
      }
    },
    {
      title:'图片',
      align:'center',
      dataIndex:'img',
      render:(text,record,index) => {
        return <Image src={text} height={100} width={200} />
      }
    },
    {
      title:'链接',
      align:'center',
      dataIndex:'link'
    },
    {
      title:'描述',
      align:'center',
      dataIndex:'alt'
    },
    {
      title:'操作',
      align:'center',
      dataIndex:'',
      render:(text,record,index)=>{
        return (
          <Space>
            <Tooltip title='此功能正在研发中'>
              <Button type='dashed'>编辑</Button>
            </Tooltip>
            <Popconfirm
            title='确认删除吗'
            onConfirm={()=>{deleteItem(record.bannerid)}}
            okText='确认'
            cancelText='取消'
            >
              <Button type='danger'>删除</Button>
            </Popconfirm>
          </Space>
        )
      }
    }

  ]

  return (
    < Table
    bordered
    columns={columns}
    dataSource={bannerlist}
    rowKey={(record) => record.bannerid}
    />
  )
}

export default Index
