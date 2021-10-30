import { useState, useContext, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../../Data/Context/UserContext/UserContextProvider";
import ProfileService from "../../../Data/Services/ProfileService";
import Card from "../../components/Card/Card";
import Input from "../../components/Input/Input";
import "./Login.scss";
import { Link } from "react-router-dom";

const routes = [
  {
    to: "/login"
  }
]

export default function Login() {
  const history = useHistory();
  const [userProfile, setUserProfile] = useContext(UserContext);
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
      history.push("/")
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
      </Card>
      <img src="/images/friends.png"></img>
      <button onClick={onLogin}>LOG IN</button>
    </div>
  </>
}
