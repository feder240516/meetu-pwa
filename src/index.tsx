import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserContextProvider from './Data/Context/UserContext/UserContextProvider';
import EventsContextProvider from './Data/Context/EventsContext/EventsContextProvider';

ReactDOM.render(
  <UserContextProvider>
    <EventsContextProvider>
      <App />
    </EventsContextProvider>
  </UserContextProvider>,
  document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
