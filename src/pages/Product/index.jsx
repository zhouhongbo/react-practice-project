import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import ProductHome from './ProductHome'
import ProductAdd from './ProductAdd'
import ProductDetail from './ProductDetail'

export default function Product() {
  return (
    <Switch>
      {/* 默认逐层匹配 */}
      <Route exact path="/products/product" component={ProductHome} />
      <Route path="/products/product/addupdate" component={ProductAdd} />
      <Route path="/products/product/detail" component={ProductDetail} />
      <Redirect to="/products/product" />
    </Switch>
  )
}
