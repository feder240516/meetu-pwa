import { useContext, useEffect, useRef } from "react";
import ProfileService from "../../../Data/Services/ProfileService";
import { UserContext } from "../../../Data/Context/UserContext/UserContextProvider";
import Card from "../../components/Card/Card";
import React, { Component, useState } from "react";
import { useHistory } from "react-router";

import "./Avatar.scss";
import { style } from "@mui/system";
import { RegisterUserRequest } from "../../../Core/Entities/Service/Create/RegisterUser";
// import { Card, CardContent, CardHeader } from "@mui/material";
const routes = [
  {
    to: "/createavatar"
  }
]



export default function App() {
  const history = useHistory();
  const [hairStyle, setStyle] = useState("1");
  const [gender, setGender] = useState("Female");
  const [skinColor, setSkin] = useState("Pale");
  const [hairColor, setHair] = useState("Blonde");
  const [userProfile, setUserProfile] = useContext(UserContext);
  const { loginProfile, updateProfile, registerUser } = ProfileService();

  const checkSelection = () => {
    var imgURL = " ";
    imgURL = "/images/" + gender + skinColor + hairColor + hairStyle + ".png";
    return imgURL;
  }

  const getHairIcon = (num: any) => {
    var hairIcon = " ";
    hairIcon = "/images/" + gender + num + ".png";

    console.log(userProfile?.email);
    return hairIcon;

  }
  const [isChecked, setIsChecked] = useState(false);
  const onChange = (e: any) => {
    setIsChecked(!isChecked);
  }
  //llamar register profile
  //status
  //intereses vacios
  //grupos vacios 
  //llamar registerUser

  const onNext = () => {
    const notNullUserProfile = userProfile as unknown as RegisterUserRequest;
    registerUser({
        email: notNullUserProfile.email,
        password: notNullUserProfile.password,
        career: "",
        groups: [], 
        on: "on",
        avatar: { sexo: gender, hairColor: hairColor, hairStyle: hairStyle, skinColor: skinColor },
        interests: [], 
        
      }
      
    ).then(profile => {

      setUserProfile(profile);
      console.log("desde create " + profile);
    })
      history.push("/profile");
  }


  return (
    <div className="App">
      <h1>Create your avatar!</h1>
      <img src={checkSelection()} />
      <input id="next" value="NEXT" type="submit" onClick={() => {
                onNext();
              }}/>
      <Card className="centered-card">
        <div className="grid">
          <div className="radio-btn-container grid-12">
            <div className="grid">
              <div className="grid-4">
                <label>Character</label>
              </div>
              <li className="grid-3" onClick={() => {
                setGender("Female");
              }}>
                <label className="-RadioItem">
                  <input
                    className="-RadioInput"
                    type="radio"
                    name="gender"
                    value={gender}
                    onChange={onChange}
                    checked={isChecked}
                  />
                  <div className="-InterestItem">
                    <div className="circle"  >
                      <img src="/images/femenine.png" alt="" style={{ border: gender == "Female" ? "1px solid white" : "none" }}></img>
                    </div>
                  </div>
                </label>
              </li>
              <li className="grid-3" onClick={() => {
                setGender("Male");
              }}>
                <label className="-RadioItem">
                  <input
                    className="-RadioInput"
                    type="radio"
                    name="gender"
                    value={gender}
                    onChange={onChange}
                    checked={isChecked}
                  />
                  <div className="-InterestItem">
                    <div className="circle"  >
                      <img src="/images/mars.png" alt="" style={{ border: gender == "Male" ? "1px solid white" : "none" }}></img>
                    </div>
                  </div>
                </label>
              </li>
            </div>
          </div>
        </div>
        <div className="radio-btn-container grid-12">
          <div className="grid">
            <div className="grid-4">
              <label>Hair Style</label>
            </div>
            <div className="radio-btn grid-3" onClick={() => {
              setStyle("1");
            }}>
              <input
                type="radio"
                name="gender"
                value={gender}
                onChange={onChange}
                checked={isChecked}
              />
              <div className="circle"  >
                <img src={getHairIcon(1)} alt="" style={{ border: hairStyle == "1" ? "1px solid white" : "none" }} />
              </div>
            </div>
            <div className="radio-btn grid-3" onClick={() => {
              setStyle("2");
            }}>
              <input
                type="radio"
                name="gender"
                value={gender}
                onChange={onChange}
                checked={isChecked}
              />
              <div className="circle"  >
                <img src={getHairIcon(2)} alt="" style={{ border: hairStyle == "2" ? "1px solid white" : "none" }} />
              </div>
            </div>
          </div>
          <div className="radio-btn-container grid-12">
            <div className="grid">
              <div className="grid-4">
                <label>Hair Color</label>
              </div>
              <div
                className="radio-btn grid-2"
                onClick={() => {
                  setHair("Blonde");
                }}
              >
                <input
                  type="radio"
                  value={hairColor}
                  name="hairColor"
                  id="blonde"
                  checked={hairColor == "Blonde"}
                />
              </div>
              <div
                className="radio-btn grid-2"
                onClick={() => {
                  setHair("Brown");
                }}
              >
                <input
                  type="radio"
                  value={hairColor}
                  name="hairColor"
                  id="brown"
                  checked={hairColor == "Brown"}
                />
              </div>
              <div
                className="radio-btn grid-2"
                onClick={() => {
                  setHair("Black");
                }}
              >
                <input
                  type="radio"
                  value={hairColor}
                  name="hairColor"
                  id="black"
                  checked={hairColor == "Black"}
                />
              </div>
            </div>
          </div>
          <div className="radio-btn-container grid-12">
            <div className="grid">
              <div className="grid-4">
                <label>Skin Color</label>
              </div>
              <div
                className="radio-btn grid-2"
                onClick={() => {
                  setSkin("Pale");

                }}
              >
                <input
                  type="radio"
                  value={skinColor}
                  name="skinColor"
                  id="pale"
                  checked={skinColor == "Pale"}
                />
              </div>
              <div
                className="radio-btn grid-2"
                onClick={() => {
                  setSkin("Tan");
                }}
              >

                <input
                  type="radio"
                  value={skinColor}
                  name="skinColor"
                  id="tan"
                  checked={skinColor == "Tan"}
                />
              </div>
              <div
                className="radio-btn grid-2"
                onClick={() => {
                  setSkin("Dark");
                }}
              >
                <input
                  type="radio"
                  value={skinColor}
                  name="skinColor"
                  id="dark"
                  checked={skinColor == "Dark"}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
      
    </div>
  );
}
