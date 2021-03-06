import React, { Component } from 'react';
import './App.scss';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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
import Profile from './UI/pages/Profile/Profile';
import ViewEvents from './UI/pages/Events/ViewEvents/ViewEvents';
import CreateEvent from './UI/pages/Events/CreateEvent/CreateEvent';
import EventDetail from './UI/pages/Events/EventDetail/EventDetail';

import ReactNotificationComponent from './notifications/ReactNotificationComponent';
import { onMessageListener, getToken } from './firebaseInit';
import CreateSOS from './UI/pages/CreateSOS/CreateSOS';

class App extends Component {
  state = {
    show: false,
    token: "",
    notification: {
      title: "",
      body: ""
    }
  }

  componentDidMount = async () => {
    

    /*await Notification.requestPermission();
    
    const token = await getToken();
    console.log("The token is: ", token)
    this.setState({token});

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
      .catch((err: any) => console.log("failed: ", err));*/
  }

  onCreateSOS() {
    this.setState({
      show: true,
      notification: {
        title: "SOS emergency",
        body: "Your SOS emergency has been submitted"
      }
    })
  }

  onHideNotification() {
    this.setState({
      show: false,
      notification: {
        title: '',
        body: '',
      }
    })
  }

  render() {
    return (
      <Router>
        {
          this.state.show ?
            <ReactNotificationComponent
              title={this.state.notification.title}
              body={this.state.notification.body}
              onHideNotification={this.onHideNotification.bind(this)}
            /> : null
        }
        <Switch>
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
            path="/"
            render={(props) => (
              <>
                <Switch>
                  <Route
                    exact
                    path="/profile"
                    render={(props) => (
                      <React.Fragment>
                        <Profile />
                      </React.Fragment>
                    )}
                  />

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
                    path="/sos/create"
                    render={(props) => (
                      <React.Fragment>
                        <CreateSOS onCreateSOS={this.onCreateSOS.bind(this)}/>
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
                    path="/events/create"
                    render={(props) => (
                      <React.Fragment>
                        <CreateEvent />
                      </React.Fragment>
                    )}
                  />
                  <Route
                    exact
                    path="/events/:idEvent"
                    render={(props) => (
                      <React.Fragment>
                        <EventDetail {...props} />
                      </React.Fragment>
                    )}
                  />
                  <Route
                    exact
                    path="/interests"
                    render={(props) => (
                      <React.Fragment>
                        <Interests />
                      </React.Fragment>
                    )}
                  />

                  <Route
                    exact
                    path="/interest/:idInterest"
                    render={(props) => (
                      <React.Fragment>
                        <Interest />
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
                </Switch>

                <BottomNav />
              </>
            )}
          />

        </Switch>
      </Router>
    );
  }
}

export default App;
