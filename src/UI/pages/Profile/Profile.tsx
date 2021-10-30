import { useContext, useEffect, useRef } from "react";
import ProfileService from "../../../Data/Services/ProfileService";
import Card from "../../components/Card/Card";
import React, { Component, useState } from "react";
import SelectInput from "../../components/SelectInput/SelectInput";
import { UserContext } from "../../../Data/Context/UserContext/UserContextProvider";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import InterestItem from '../../components/InterestItem/InterestItem';


import "./Profile.scss";
import { style } from "@mui/system";
import Interest from "../Interest/Interest";
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
  const [status, setStatus] = useState(" ");
  const state = [
    { value: 1, label: 'Online 🟢' },
    { value: 2, label: 'Offline 🔴' },
  ]

  const checkSelection = () => {
    var imgURL = " ";

    imgURL = `/images/${userProfile?.avatar.sexo}${userProfile?.avatar.skinColor}${userProfile?.avatar.hairColor}${userProfile?.avatar.hairStyle}.png`;
    return imgURL;
  }
  const consoleThis = (something: string) => {
   
    console.log("desde profile"+something);
    return something;
}
 /*const updateStatus = () =>{
  setStatus("On")
   return status
 }*/

  const InterestsList = (props: any) => {
    return (
        <div className="InterestsList">
            <ul>
                {props.interests.map((interest: any, i: number) => 
                    <InterestItem 
                        key={i}
                        id={interest.id}
                        name={interest.name}
                        src={interest.src}
                        backgroundColor="white"
                        onClick={consoleThis(interest.src)}
                    />
                )}
            </ul>
        </div>
    );
};

  const [isChecked, setIsChecked] = useState(false);
  
  return (
    <div className="Profile">
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
            {/*importar imagenes estaticas*/}
            <h4>{userProfile?.interests.map((interest ) => <span>{InterestsList}</span>)}</h4>
            <div className="InterestsList">
              <ul>
                {userProfile?.interests.map((interest: any, i: number) =>
                  <InterestItem
                    key={i}
                    id={interest.id}
                    name={interest.name}
                    src={`/images/${interest.name}.png`}
                    backgroundColor="white"
                    className="circle"
                  />
                  )}
              <Link className="add-event" to="/select-interest" >+</Link>
              </ul>
            </div>
            
          </div>
          <div className="grid-6">
            <SelectInput
              label="Status"
              options={state}
              /*onChange={updateStatus()}*/
            />
          </div>
        </div>
      </Card>

    </div>
  );
}
