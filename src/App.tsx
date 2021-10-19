import React, { Component } from 'react';
import './App.scss';

import { BrowserRouter as Router, Route} from "react-router-dom";

import Map from './UI/components/Map/Map';
import BottomNav from './UI/components/BottomNav/BottomNav';

class App extends Component {
  render() {
    return (
      <Router>
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
