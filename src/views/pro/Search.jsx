import React,{useState,useEffect} from 'react'
import { Table,Button,Space,Image,Popconfirm,Switch,Select,Input } from 'antd'
import {getProList,getCategory,updateFlag,searchPro} from './../../api/pro'
const { Option } = Select
function Index() {
  const [listData, setlistData] = useState([])
  const [categoryList, setcategoryList] = useState([])
  const [category, setcategory] = useState('')
  const [search, setsearch] = useState('')
  useEffect(()=>{
    getProList({limitNum:200}).then(res=>{
      setlistData(res.data.data)
    })
    getCategory().then(res=>{
      setcategoryList(res.data.data)
    })
  },[])
  const updateRecommendlist =(proid,text) => {
    updateFlag({
      proid,
      type:'isrecommend',
      flag: text === '1' ? false : true
    }).then(res=> {
      getProList({limitNum:200}).then(res=>{
        setlistData(res.data.data)
      })
    })
  }
  const updateSeckilllist = (proid,text)=>{
    updateFlag({
      proid,
      type:'isseckill',
      flag: text === '1' ? false : true
    }).then(res=> {
      getProList({limitNum:200}).then(res=>{
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
      dataIndex:'category'
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
      dataIndex:'originprice',
      sorter:(a,b)=>{return a.originprice - b.originprice}
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
      title:'是否推荐',
      width:120,
      dataIndex:'isrecommend',
      render:(text,record)=>{
        return <Switch onChange={()=>{ updateRecommendlist(record.proid,text) }} checked={text} />
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
  const changeCategory = (value) => {
    setcategory(value)
  }
  const changeSearch = (e) => {
    setsearch(e.target.value)
  }
  const searchProFn = () => {
    searchPro({category,search}).then(res=>{
      setlistData(res.data.data)
    })
  }
  return (
    <div>
      <Select
      style={{width:120}}
      defaultValue=''
      onChange={changeCategory}
      >
        <Option value=''>全部</Option>
        {
          categoryList && categoryList.map(item=>{
            return <Option value={item} key={item}>{item}</Option>
          })
        }
      </Select>
      <Input
      style={{width:120}}
      placeholder='请输入关键词'
      value={search}
      onChange={changeSearch}
      />
      <Button onClick={searchProFn} type='ghost'>搜索</Button>
      <Table dataSource={listData} columns={columns} scroll={{x:1500,y: 600}} rowKey={({proid})=>proid}/>
    </div>
  )
}

export default Index
