import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../../../Data/Context/UserContext/UserContextProvider";
import ProfileService from "../../../Data/Services/ProfileService";
import Card from "../../components/Card/Card";
import Input from "../../components/Input/Input";
import "./Login.scss";
import { Link } from "react-router-dom";
// import { Card, CardContent, CardHeader } from "@mui/material";
const routes = [
  {
      to: "/login"
  }
]

export default function Login() {
  const [ userProfile, setUserProfile ] = useContext(UserContext);
  const { loginProfile, updateProfile, registerUser } = ProfileService();

  const onLogin = () => {
    loginProfile({
      email: "santiagomurcia@gmail.com",
      password: "rajo",
    }).then(profile => {
      setUserProfile(profile);
    });
  }

  return <>
    <div className="login">
      <Card className="centered-card">
        <div className="card-content">
          <h2 className="login-title">Use your university's credentials to log in</h2>
          <Input id="login-email" label="Email:"/>
          <Input id="login-password" label="Password:" type="password"/>
        </div>
        <button onClick={onLogin}>Login</button>
        <Link to="/select-interest">Go to</Link>
      </Card>
    </div>
  </>
}
