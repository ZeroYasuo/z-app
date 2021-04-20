import React from 'react'
import { Menu } from 'antd';
import menus from './../../router/menus'
import { useHistory,useLocation } from 'react-router-dom'
// import { Route } from 'react-router-dom'

const { SubMenu } = Menu

const keyArr = []
menus.forEach(item=>{
  keyArr.push(item.path)
})
// submenu keys of first level
const rootSubmenuKeys = keyArr

const SideMenu = () => {
  const history = useHistory()
  const location = useLocation()
  // console.log(location)
  const {pathname} = location
  const [openKeys, setOpenKeys] = React.useState(['/' + pathname.split('/')[1]]);

  const onOpenChange = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const renderMenu = (menus)=>{
    return menus.map(item=>{
      if(item.children){
        return (<SubMenu key={item.path} title={item.title} icon={item.icon}>
          {renderMenu(item.children)}
        </SubMenu>)
      }else{
        return (
          <Menu.Item key={item.path} icon={item.icon}>{item.title}</Menu.Item>
          // item.path === '/' ? null : <Route
          // path={item.path}
          // exact
          // component={item.component} />
        )
      }
    })
  }
  const changeUrl = (obj)=>{
    const path = obj.key
    history.push(path)
  }
  return (
    <Menu theme='dark' onClick={changeUrl} mode="inline" openKeys={openKeys} onOpenChange={onOpenChange}>
      {renderMenu(menus)}
      {/* <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
        <Menu.Item key="1">Option 1</Menu.Item>
        <Menu.Item key="2">Option 2</Menu.Item>
        <Menu.Item key="3">Option 3</Menu.Item>
        <Menu.Item key="4">Option 4</Menu.Item>
      </SubMenu> */}
    </Menu>
  );
};

export default SideMenu