import React, { Component } from 'react';
import './App.scss';

import { BrowserRouter as Router, Route} from "react-router-dom";

import Map from './UI/pages/Map/Map';
import Interests from './UI/pages/Interests/Interests';
import Interest from './UI/pages/Interest/Interest';
import SelectInterest from './UI/pages/SelectInterest/SelectInterest';
import Groups from './UI/pages/Groups/Groups';
import YourGroups from './UI/pages/YourGroups/YourGroups';
import SingleGroup from './UI/pages/SingleGroup/SingleGroup';
import SingleYourGroup from './UI/pages/SingleYourGroup/SingleYourGroup';
import BottomNav from './UI/components/BottomNav/BottomNav';
import Login from './UI/pages/Login/Login';
import Welcome from './UI/pages/Welcome/Welcome';
import CreateAvatar from './UI/pages/CreateAvatar/CreateAvatar';
import ViewEvents from './UI/pages/Events/ViewEvents/ViewEvents';

import ReactNotificationComponent from './notifications/ReactNotificationComponent';
import Notifications from './notifications/Notifications';
import { onMessageListener } from './firebaseInit';

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
  },
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
  },
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
  },
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
  },
]

class App extends Component {
  state = {
    show: false,
    notification: {
      title: "",
      body: ""
    }
  } 

  componentDidMount() {
    onMessageListener()
      .then((payload: any) => {
        this.setState({
          show: true,
          notification: {
            title: payload.notification.title,
            body: payload.notification.body,
          }
        })
        console.log(payload);
      })
      .catch((err: any) => console.log("failed: ", err));
  }

  render() {
    return (
      <Router>
        {
          this.state.show ? 
            <ReactNotificationComponent 
              title={this.state.notification.title}
              body={this.state.notification.body}
            /> : null
        }
        <Notifications />
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
            path="/select-interest"
            render={(props) => (
              <React.Fragment>
                <SelectInterest />
              </React.Fragment>
            )}
          />

        <Route
            exact
            path="/your-groups"
            render={(props) => (
              <React.Fragment>
                <YourGroups />
              </React.Fragment>
            )}
          />

          <Route
            exact
            path="/your-groups/:idGroup"
            render={(props) => (
              <React.Fragment>
                <SingleYourGroup />
              </React.Fragment>
            )}
          />

          <Route
            exact
            path="/groups"
            render={(props) => (
              <React.Fragment>
                <Groups />
              </React.Fragment>
            )}
          />

          <Route
            exact
            path="/groups/:idGroup"
            render={(props) => (
              <React.Fragment>
                <SingleGroup />
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
