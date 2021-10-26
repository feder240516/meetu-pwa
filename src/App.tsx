import React, { Component } from 'react';
import './App.scss';

import { BrowserRouter as Router, Route} from "react-router-dom";

import Map from './UI/pages/Map/Map';
import Interests from './UI/pages/Interests/Interests';
import Interest from './UI/pages/Interest/Interest';
import SelectInterest from './UI/pages/SelectInterest/SelectInterest';
import BottomNav from './UI/components/BottomNav/BottomNav';
import Login from './UI/pages/Login/Login';
import Welcome from './UI/pages/Welcome/Welcome';
import CreateAvatar from './UI/pages/CreateAvatar/CreateAvatar';
import Profile from './UI/pages/Profile/Profile';
import ViewEvents from './UI/pages/Events/ViewEvents/ViewEvents';

const interests = [
  {
    id: 0,
    name:"Gym",
    src:"/images/Dumbbell.png",
  },
  {
    id: 1,
    name:"Tennis",
    src:"/images/Ball.png",
  },
  {
    id: 2,
    name:"Gym",
    src:"/images/Shirt.png",
  }
]

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
          <Route
            exact
            path="/createavatar"
            render={(props) => (
              <React.Fragment>
                <CreateAvatar />
              </React.Fragment>
            )}
          />
          <Route
            exact
            path="/profile"
            render={(props) => (
              <React.Fragment>
                <Profile />
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
                <ViewEvents />
              </React.Fragment>
            )}
          />
          <Route
            exact
            path="/interests"
            render={(props) => (
              <React.Fragment>
                <Interests interests={interests}/>
              </React.Fragment>
            )}
          />

          <Route
            exact
            path="/interest/:idInterest"
            render={(props) => (
              <React.Fragment>
                <Interest interests={interests}/>
              </React.Fragment>
            )}
          />

        <Route
            exact
            path="/select-interests"
            render={(props) => (
              <React.Fragment>
                <SelectInterest />
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
