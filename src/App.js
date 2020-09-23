import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

function App() {
  return (
      <Router>
        <div>

          <Login/>
          <Switch>
            <Route path='/home' component={Home} />
          </Switch>
        </div>
      </Router>

  );
}

export default App;
