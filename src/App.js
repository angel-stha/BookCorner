import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Form from './Add';
import Home from './Homepage';
import Books from './Book'
import MyProfile from "./MyProfile";
import UserProfile from "./UsersProfile";
import './Homepage.css';
import axios from 'axios';

function App() {
    return (
      <Router>
        <div>

          <Login/>
          <Switch>
              <Route path='/home' component={Home} />
              <Route path='/book' component={Books} />
              <Route path='/my-profile' component={MyProfile} />
              <Route path='/user-profile' component={UserProfile} />
          </Switch>

          </div>
      </Router>


  );
}

export default App;
