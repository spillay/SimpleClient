import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import NotFoundPage from './components/NotFoundPage';
import Dashboard from './components/Dashboard';
import SearchUsers from './components/SearchUsers';
import SFC from './components/SFC';
/*
Centralized  application routing configuration
*/

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/" component={Home} exact={true} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/search" component={SearchUsers} />
          <Route path="/selectFormControls" component={SFC} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
/*
          <Route path='/owners' component={OwnerList}></Route>
*/
