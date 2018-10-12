import React, { Component } from 'react';
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import Login from "./containers/Login";
import Search from './containers/Search'

class App extends Component {
  render() {
    console.log(this.props.isAuthenticated)
    return (
      <Router history={hashHistory}>
        <Route path='/'>
          <IndexRoute component={Login} />
          <Route path='/search' component={Search} />
        </Route>
        <Redirect from="/*" to="/" />
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  ...state.loginReducer,
})

export default connect(mapStateToProps, null)(App)
