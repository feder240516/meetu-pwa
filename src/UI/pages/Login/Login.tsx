import { useEffect, useRef } from "react";
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
  const { loginProfile, updateProfile, registerUser } = ProfileService();
  return <>
    <div className="login">
      <Card className="centered-card">
        <div className="card-content">
          <h2 className="login-title">Use your university's credentials to log in</h2>
          <Input id="login-email" label="Email:"/>
          <Input id="login-password" label="Password:" type="password"/>
        </div>
      </Card>
    </div>
  </>
}
