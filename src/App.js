import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.less'

import Login from './pages/Login'
import Admin from './pages/Admin'

export default class App extends Component {
    render() {
        return (
            <>
                <Switch>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/" component={Admin}></Route>
                </Switch>
            </>
        )
    }
}
