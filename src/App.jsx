import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Main from './layout/main/index.jsx'
import axios from 'axios'

const App = () => {
  axios.get('http://121.89.205.189/api/pro/list').then(res=> {console.log(res.data)})
  axios.get('http://121.89.205.189/api/pro/seckilllist').then(res=> {console.log(res.data)})
  return (
    <Router>
      <Switch>
        <Route path='/' component={Main} />
      </Switch>
    </Router>
  );
};

export default App;