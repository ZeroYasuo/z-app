import React,{useState,useEffect} from 'react'
import { addmin, getAdminList,deleteadmin,updateadmin } from './../../api/users'
import {Button,Space,Table,Popconfirm,Drawer,Input,Tree,Select,message,Modal} from 'antd'
import menus from './../../router/menus'
function Index() {

  const [adminlist,setAdminlist] = useState([])
  const [visible,setVisible] = useState(false)
  const [checkedKeys,setcheckedKeys] = useState('')

  const [adminname,setaddminname] = useState('')
  const [password,setpassword] = useState('')
  const [role,setrole] = useState('')

  const [uadminname,setuadminname] = useState('')
  const [urole,seturole] = useState('1')
  const [ucheckedKeys,setucheckedKeys] = useState([])
  const [isModalVisible,setisModalVisible] = useState(false)


  useEffect(()=>{
    getAdminList().then(res=>{
      setAdminlist(res.data.data)
    })
  },[])

  adminlist.forEach((item,index)=>{
    item.ind = index + 1
  })

  const showDrawer = ()=>{
    setVisible(true)
  }

  const expandedKeys = []
  menus.forEach(item=>{
    expandedKeys.push(item.key)
  })

  const onCheck = (checkedValue,info)=>{
    console.log(checkedValue)
    setcheckedKeys(checkedValue)
  }

  const roleChange = (value) => {
    setrole(value)
  }

  const addminFn = () =>{
    const obj = {adminname,password,role,checkedKeys}
    console.log(obj)
    addmin(obj).then(()=>{
      message.success('添加管理员成功')
      setaddminname('')
      setcheckedKeys([])
      setpassword('')
      setrole('1')
      setVisible('false')
      getAdminList().then(res=>{
        setAdminlist(res.data.data)
      })
    })
  }

  const changeModalvisible = () => {
    setisModalVisible(true)
  }

  const uroleChange = (e) => {
    seturole(e.target.value)
  }

  const onucheck = (checkedValue,info) => {
    setucheckedKeys(checkedValue)
  }

  const columns = [
    {
      title:'序号',
      render:(text,record,index)=>{
        return <span>{index + 1}</span>
      }
    },
    {
      title:'用户名',
      dataIndex:'adminname'
    },
    {
      title:'权限',
      dataIndex:'role',
      render:(text,record,index)=>{
        return text === '2' ? '超级管理员' : '管理员'
      }
    },
    {
      title:'操作',
      dataIndex:'',
      width:200,
      align:'center',
      render:(text,record,index)=>{
        return (
          <>
          {
          index === 0 ? null : 
          <Space>
            <Button type='dashed' onClick={
              ()=>{
                changeModalvisible()
                setuadminname(record.adminname)
                seturole(record.role + '')
                setucheckedKeys(record.checkedKeys)
              }
              }>编辑</Button>
            <Popconfirm
            title='确认删除吗'
            okText='确认'
            cancelText='取消'
            onConfirm={()=>{
              deleteadmin({adminid:record.adminid}).then(()=>{
              getAdminList().then(res=>{
                setAdminlist(res.data.data)
              })
            }) 
            }}
            >
              <Button type='danger'>删除</Button>
            </Popconfirm>
          </Space>}
        </>
        )
      }
    }
  ]


  return (
    <div>
      <Button onClick={showDrawer} type='primary'>添加管理员</Button>
      <Table
      columns={columns}
      dataSource={adminlist}
      rowKey={({adminid})=> adminid}
      ></Table>
      <Drawer
      title='添加管理'
      onClose={()=>{setVisible(false)}}
      visible={visible}
      placement='right'
      closable='false'
      >
        <Input placeholder='请输入名称' value={adminname} onChange={e=>{setaddminname(e.target.value)}}></Input>
        <Input placeholder='请输入密码' value={password} onChange={e=>{setpassword(e.target.value)}}></Input>
        <Select value={role} onChange={roleChange} style={{width:100}}>
          <Select.Option value='1'>管理员</Select.Option>
          <Select.Option value='2'>超级管理员</Select.Option>
        </Select>
        <Tree
        checkable //节点前添加复选框
        expandedKeys={expandedKeys} //展开所有的菜单选项
        onCheck = {onCheck} //点击复选框触发
        checkedKeys= {checkedKeys} //选中的选项
        treeData={menus} //数据
        >
        </Tree>
        <Button type='primary' onClick={addminFn}>添加</Button>
      </Drawer>
      <Modal
      title='更新管理员信息'
      visible={isModalVisible} 
      onOk={()=>{
        console.log(uadminname,urole,ucheckedKeys);
        updateadmin({
          adminname:uadminname,password:'777',role:urole,checkedKeys:ucheckedKeys
        }).then(
          ()=>{
            setisModalVisible(false)
            getAdminList().then(res=>{
              setAdminlist(res.data.data)
            })
          }
        )
      }} 
      onCancel={()=>{ setisModalVisible(false) }}
      >
        <Input placeholder='更新管理员信息' value={uadminname} readOnly></Input>
        <Select value={urole} onChange={uroleChange} style={{width:100}}>
          <Select.Option value='1'>管理员</Select.Option>
          <Select.Option value='2'>超级管理员</Select.Option>
        </Select>
        <Tree
        checkable //节点前添加复选框
        expandedKeys={expandedKeys} //展开所有的菜单选项
        onCheck = {onucheck} //点击复选框触发
        checkedKeys= {ucheckedKeys} //选中的选项
        treeData={menus} //数据
        >
        </Tree>
      </Modal>
    </div>
  )
}

export default Index
