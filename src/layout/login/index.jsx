import React, { Component } from 'react';
import { Space,Button,Input,Divider,message } from 'antd'
import {login} from './../../api/login'
class Login extends Component {
  state = {
    loginname: '',
    password:''
  }
  changeName = (e)=>{
    this.setState({
      loginname:e.target.value
    })
  }
  changePassword = (e)=>{
    this.setState({
      password:e.target.value
    })
  }
  LoginFn= ()=>{
    const obj = {
      adminname:this.state.loginname,
      password:this.state.password
    }
    console.log(obj);
    login(obj).then(res=>{
      console.log(res);
      if(res.data.code === '10003'){
        message.error('密码错误')
      }else if (res.data.code === '10005'){
        message.error('管理员为注册')
      }else {
        message.success('登录成功')
        localStorage.setItem('loginState','true')
        localStorage.setItem('username',res.data.data.adminname)
        localStorage.setItem('adminToken',res.data.data.token)
        localStorage.setItem('role',res.data.data.role)
      }
      this.props.history.push('/')
    })
    
  }
  render() {
    return (
      <div className="loginContainer">
        <div className="loginBox">
          <div className="loginLogo">
            嗨购管理系统
          </div>
          <Divider>
            使用用户名登录
          </Divider>
          <Space direction='vertical' style={{width:'100%'}}>
            <div style={{borderBottom:'1px solid #ccc',height:40}}>
              <Input onChange={this.changeName} value={this.state.username} placeholder='请输入用户名' className='myinput' bordered='false' size='large'></Input>
            </div>
            <div style={{borderBottom:'1px solid #ccc',height:40}}>
              <Input onChange={this.changePassword} value={this.state.password} placeholder='请输入密码' className='myinput' bordered='false' size='large'></Input>
            </div>
            <Button onClick={this.LoginFn} type='primary' size='large' block style={{marginTop:'80'}}>登录</Button>
          </Space>
        </div>
      </div>
    );
  }
}

export default Login;