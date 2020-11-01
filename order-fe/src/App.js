import React from 'react'
import { Route } from 'react-router-dom'
import Order from './pages/Order'
import OrderHistory from './pages/OrderHistory'
import OrderDetail from './pages/OrderDetail'

function App() {

  return (
    <>
      <Route path="/" exact component={Order}></Route>
      <Route path="/order" exact component={OrderHistory}></Route>
      <Route path="/order/:id" exact component={OrderDetail}></Route>
    </>
  );
}

export default App;
