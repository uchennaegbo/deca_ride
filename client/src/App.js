import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header/Header';
import Home from './Homepage/Home';
import Dashboard from './Dashboard/Dashboard';
import Driver from './Drivers/Drivers';
import Trip from './Trips/Trips';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/drivers" component={Driver} />
        <Route path="/trip" component={Trip} />
      </Switch>
    </div>
  );
}

export default App;
