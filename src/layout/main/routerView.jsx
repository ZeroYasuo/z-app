import React,{Suspense} from 'react'
import { Route,Switch,Redirect } from 'react-router-dom'
import { Spin } from 'antd'
import NotFound from './../../views/error/NotFound'
import menus from './../../router/menus'
function RouterView() {
  const renderRoute = (menus) => {
    return menus.map(item => {
      if(item.children){
        return renderRoute(item.children)
      }else{
        return (<Route path={item.path} key={item.path} component={item.component} />)
      }
    })
  }
  const renderDirect = (menus) => {
    return menus.map(item=>{
      if(item.redirect){
        return <Redirect exact key={item.key} from={item.path} to={item.redirect} />
      }
    })
  }
  return (
    <Suspense fallback={<Spin/>}>
      <Switch>
        {
          renderRoute(menus)
        }
        {
          renderDirect(menus)
        }
        <Route from='/' to='/home'/>
        <Route component={NotFound}/>
      </Switch>
    </Suspense>
  )
}

export default RouterView