import React, { Component } from 'react';
import './App.scss';

import { BrowserRouter as Router, Route} from "react-router-dom";

import Map from './UI/pages/Map/Map';
import BottomNav from './UI/components/BottomNav/BottomNav';
import Login from './UI/pages/Login/Login';
import Welcome from './UI/pages/Welcome/Welcome';

class App extends Component {
  render() {
    return (
      <Router>
        <Route
            exact
            path="/welcome"
            render={(props) => (
              <React.Fragment>
                <Welcome />
              </React.Fragment>
            )}
          />
        <Route
            exact
            path="/login"
            render={(props) => (
              <React.Fragment>
                <Login />
              </React.Fragment>
            )}
          />
        <div>
          <Route
            exact
            path="/"
            render={(props) => (
              <React.Fragment>
                <Map />
              </React.Fragment>
            )}
          />
          <Route
            exact
            path="/events"
            render={(props) => (
              <React.Fragment>
                Events
              </React.Fragment>
            )}
          />
          <Route
            exact
            path="/interests"
            render={(props) => (
              <React.Fragment>
                Interests
              </React.Fragment>
            )}
          />
          <Route
            exact
            path="/groups"
            render={(props) => (
              <React.Fragment>
                Groups
              </React.Fragment>
            )}
          />
          <Route
            exact
            path="/profile"
            render={(props) => (
              <React.Fragment>
                Profile
              </React.Fragment>
            )}
          />
          <BottomNav />
        </div>
        
      </Router>
    );
  }
}

export default App;
