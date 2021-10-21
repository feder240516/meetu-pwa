import { useEffect, useRef } from "react";
import ProfileService from "../../../Data/Services/ProfileService";
import Card from "../../components/Card/Card";
import Input from "../../components/Input/Input";
import "./Welcome.scss";
// import { Card, CardContent, CardHeader } from "@mui/material";
const routes = [
  {
      to: "/welcome"
  }
]

export default function Welcome() {
  return <>
    <div className="welcome">
      <img src="/images/welcome.png"></img>
      <input id="welcome-join" value="JOIN NOW" type="submit"/>
    </div>
  </>
}
