import React from 'react'
import { 
  HomeOutlined,
  PictureOutlined,
  NotificationOutlined,
  TeamOutlined,
  TableOutlined
} from '@ant-design/icons'
const menus = [
  {
    title:'系统首页',
    path:'/home',
    key:'0-0',
    icon:<HomeOutlined />,
    component:React.lazy(()=>import('./../views/home/Index'))
  },
  {
    title:'轮播图管理',
    path:'/banner',
    key:'0-1',
    icon:<PictureOutlined />,
    children:[
      {
        title:'轮播图列表',
        path:'/banner/list',
        key:'0-1-0',
        component:React.lazy(()=>import('./../views/banner/Index'))
      },
      {
        title:'添加轮播图',
        path:'/banner/add',
        key:'0-1-1',
        component:React.lazy(()=>import('./../views/banner/Add'))
      }
    ]
  },
  {
    title:'添加数据管理',
    path:'/homeData',
    key:'0-2',
    icon:<NotificationOutlined />,
    children:[
      {
        title:'秒杀列表',
        path:'/homeData/secKill',
        key:'0-2-0',
        component:React.lazy(()=>import('./../views/homeData/Skill'))
      },
      {
        title:'推荐列表',
        path:'/homeData/recommend',
        key:'0-2-1',
        component:React.lazy(()=>import('./../views/homeData/Recommend'))
      }
    ]
  },
  {
    title:'用户管理',
    path:'/user',
    key:'0-3',
    icon:<TeamOutlined />,
    children:[
      {
        title:'用户列表',
        path:'/user/list',
        key:'0-3-0',
        component:React.lazy(()=>import('./../views/users/List'))
      },
      {
        title:'管理员列表',
        path:'/user/adminList',
        key:'0-3-1',
        component:React.lazy(()=>import('./../views/users/AdminList'))
      }
    ]
  },
  {
    title:'商品管理',
    path:'/pro',
    key:'0-4',
    icon:<TableOutlined/>,
    children:[
      {
        title:'商品列表',
        path:'/pro/list',
        key:'0-4-0',
        component:React.lazy(()=>import('./../views/pro/List'))
      },
      {
        title:'筛选商品',
        path:'/pro/search',
        key:'0-4-1',
        component:React.lazy(()=>import('./../views/pro/Search'))
      }
    ]
  }
]

export default menus