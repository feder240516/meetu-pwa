import { useEffect, useRef } from "react";
import ProfileService from "../../../Data/Services/ProfileService";
import Card from "../../components/Card/Card";
import React, { Component, useState } from "react";
import SelectInput from "../../components/SelectInput/SelectInput";

import "./Profile.scss";
import { style } from "@mui/system";
// import { Card, CardContent, CardHeader } from "@mui/material";
const routes = [
  {
    to: "/profile"
  }
]



export default function App() {
  const [hairStyle, setStyle] = useState("1");
  const [gender, setGender] = useState("Female");
  const [skinColor, setSkin] = useState("Pale");
  const [hairColor, setHair] = useState("Blonde");
  const [title, setTitle] = useState("hola");

  const state = [
    { value: 1, label: 'Online 🟢' },
    { value: 2, label: 'Offline 🔴' },
  ]

  const checkSelection = () => {
    var imgURL = " ";
    imgURL = "/images/" + gender + skinColor + hairColor + hairStyle + ".png";
    return imgURL;
  }

  const getHairIcon = (num: any) => {
    var hairIcon = " ";
    hairIcon = "/images/" + gender + num + ".png";
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
            <h4>Your Name</h4>
          </div>
          <div className="grid-12">
            <h4>Your Career</h4>
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
