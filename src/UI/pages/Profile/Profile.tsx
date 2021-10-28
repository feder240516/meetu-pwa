import { useContext, useEffect, useRef } from "react";
import ProfileService from "../../../Data/Services/ProfileService";
import Card from "../../components/Card/Card";
import React, { Component, useState } from "react";
import SelectInput from "../../components/SelectInput/SelectInput";
import { UserContext } from "../../../Data/Context/UserContext/UserContextProvider";
import { useHistory } from "react-router";

import "./Profile.scss";
import { style } from "@mui/system";
// import { Card, CardContent, CardHeader } from "@mui/material";
const routes = [
  {
    to: "/profile"
  }
]



export default function App() {
  const history = useHistory();
  const [hairStyle, setStyle] = useState("1");
  const [userProfile, setUserProfile] = useContext(UserContext);

  const state = [
    { value: 1, label: 'Online 🟢' },
    { value: 2, label: 'Offline 🔴' },
  ]

  const checkSelection = () => {
    var imgURL = " ";
    console.log("desde profile" + userProfile?.avatar);
   
    imgURL = `/images/${userProfile?.avatar.sexo}${userProfile?.avatar.skinColor}${userProfile?.avatar.hairColor}${userProfile?.avatar.hairStyle}.png`;
    return imgURL;
  }

  const getHairIcon = (num: any) => {
    var hairIcon = " ";
    
    return hairIcon;
  }
  const [isChecked, setIsChecked] = useState(false);
  const onChange = (e: any) => {
    setIsChecked(!isChecked);
  }
  return (
    <div className="App">
      <h1>Your Profile</h1>
      <img src={checkSelection()} />
      
        <Card className="centered-card">
        <div className="grid">
          <div className="grid-12">
            <h4>{userProfile?.name}</h4>
          </div>
          <div className="grid-12">
            <h4>{userProfile?.career}</h4>
          </div>
          <div className="grid-12">
            <h4>Interests</h4>
          </div>
          <div className="grid-6">
            <SelectInput
              label="Status"
              options={state}
            />
          </div>
          </div>
        </Card>
      
    </div>
  );
}
