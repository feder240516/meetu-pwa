import { useState, useContext, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../../Data/Context/UserContext/UserContextProvider";
import ProfileService from "../../../Data/Services/ProfileService";
import Card from "../../components/Card/Card";
import Input from "../../components/Input/Input";
import "./Login.scss";
// import { Card, CardContent, CardHeader } from "@mui/material";
const routes = [
  {
    to: "/login"
  }
]

export default function Login() {
  const history = useHistory();
  const [userProfile, setUserProfile] = useContext(UserContext);
  const { loginProfile, updateProfile, registerUser } = ProfileService();
  const [datos, setDatos] = useState({
    correo: '',
    contrasena: ''
})

const handleInputChange = (event: any) => {
    // console.log(event.target.name)
    // console.log(event.target.value)
    setDatos({
        ...datos,
        [event.target.name] : event.target.value 
    })

    console.log(event.target.name)
}


  const onLogin = () => {
    loginProfile({
      email: datos.correo,
      password: datos.contrasena,
      
    }).then(profile => {
      setUserProfile(profile);
      history.push("/")
    }).catch(error => {
      setUserProfile({
        email: datos.correo,
        password: datos.contrasena,
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
          <input id="correo" onChange={handleInputChange} name="correo"  />
          <input id="contrasena" onChange={handleInputChange} name="contrasena" type="password" />
        </div>
        <button onClick={onLogin}>Login</button>
      </Card>
    </div>
  </>
}
