import React, {useState, useContext} from 'react';

import { useHistory } from "react-router";
import { withRouter } from 'react-router';
import { Link } from "react-router-dom";
import "./SingleYourGroup.scss";

import { UserContext } from '../../../Data/Context/UserContext/UserContextProvider';
import GroupsService from '../../../Data/Services/GroupsService';
import { groups } from '../../../Data/Static/Groups';

const SingleYourGroup = (props: any) => {
    const idGroup = props.match.params.idGroup;
    const history = useHistory();
    const group = groups.filter((group: any) => group.id.toString() === idGroup)[0]

    const [ userProfile, setUserProfile ] = useContext(UserContext);

    const { leaveGroup } = GroupsService();

    const leave = async () => {
        console.log("Leaving group...");

        if(userProfile && group) {
            const modifiedUser = (await leaveGroup(
                userProfile, 
                group.title
            )).data;
            setUserProfile(modifiedUser);
            history.push("/your-groups");
        } else {
            history.push("/login");
        }
    }

    return (
        <div className="SingleYourGroup">
            <div className="SingleYourGroupContainer">
                <div className="-title">
                    <Link to="/your-groups">
                        <img src="/images/arrow_back_ios_24px_outlined.svg"></img>
                    </Link>
                    <h1 className="-highlighted">{group ? group.title:""}</h1>
                </div>
                <p>
                    {group ? group.description:""}
                </p>
                <button>
                    <img src="/images/insert_invitation_24px.png"/>
                    <span>Events</span>
                </button>
                <button>
                    <img src="/images/settings_phone_24px.png"/>
                    <span>Contact numbers</span>
                </button>
                <div className="-absolute">
                    <button className="-red" onClick={(e) => leave()}>
                        <img src="/images/directions_run_24px.png"/>
                        <span>Leave group</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default withRouter(SingleYourGroup);