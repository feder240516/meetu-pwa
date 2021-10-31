import { useState, useContext, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../../Data/Context/UserContext/UserContextProvider";
import ProfileService from "../../../Data/Services/ProfileService";
import Card from "../../components/Card/Card";
import Input from "../../components/Input/Input";
import "./Login.scss";
import { Link } from "react-router-dom";
// import useEvents from "../../hooks/useEvents";
import EventsService from "../../../Data/Services/EventsService";
import getPeopleEventMapper from "../../../Data/Mapper/getPeopleEventMapper";
import { EventsContext } from "../../../Data/Context/EventsContext/EventsContextProvider";

const routes = [
  {
    to: "/login"
  }
]

export default function Login() {
  const history = useHistory();
  // const { reloadEvents } = useEvents();
  const [userProfile, setUserProfile] = useContext(UserContext);
  const [allEvents, setAllEvents] = useContext(EventsContext);
  const { loginProfile } = ProfileService();
  const [mail, setMail] = useState(" ");
  const [pass, setPass] = useState(" ");

  const changeMail = (mail: string) => {
    setMail(mail);
  }
  const changePass = (password: string) => {
    setPass(password);
  }

  const onLogin = () => {
    loginProfile({
      email: mail,
      password: pass,

    }).then(profile => {
      setUserProfile(profile);
      const groupIDs = profile.groups.map(group => group.id);
      const interests = profile.interests.map(interest => interest.name);
      Promise.all([
        EventsService().getEventsByGroup({groups:groupIDs}),
        EventsService().getEventsByInterest({interests})
      ]).then(([eventsByGroups, eventsByInterests]) => {
        const groupEvents = eventsByGroups.data.map(event => getPeopleEventMapper(event))
        const interestsEvents = eventsByInterests.data.map(event => getPeopleEventMapper(event))
        setAllEvents([...groupEvents, ...interestsEvents]);
        history.push("/")
      })
      // reloadEvents();
    }).catch(error => {
      setUserProfile({
        email: mail,
        password: pass,
        id: 0,
        career: "",
        groups: [],
        avatar: { id: 0, sexo: "", hairColor: "", hairStyle: "", skinColor: "" },
        interests: [],
        name: "",
        lastName: "",
        status: "on"
      })
      history.push("/createavatar")
    });
  }

  return <>
    <div className="login">
      <Card className="centered-card">
        <div className="card-content">
          <h2 className="login-title">Use your university's credentials to log in</h2>
          <Input id="login-email" label="Email" onChange={changeMail} ></Input>
          <Input id="login-password" label="Password" onChange={changePass} type="password"></Input>
       </div>
        <Link to="/select-interest">Go to</Link>
      </Card>
      <img src="/images/friends.png"></img>
      <button onClick={onLogin}>LOG IN</button>
    </div>
  </>
}
