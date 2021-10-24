import React, {useState} from 'react';

import { withRouter } from 'react-router';
import { Link } from "react-router-dom";
import "./SingleYourGroup.scss";

const groups = [
    {
        id: 0,
        title: "Robocup",
        src: "/images/robocup.png",
        member_count: 12,
        isPending: false,
        description: "No description."
    },
    {
        id: 1,
        title: "Football",
        src: "/images/football.jpg",
        member_count: 27,
        isPending: false,
        description: "No description."
    },
    {
        id: 2,
        title: "Basketball",
        src: "/images/football.jpg",
        member_count: 8,
        isPending: false,
        description: "No description."
    }
]

const SingleYourGroup = (props: any) => {
    const idGroup = props.match.params.idGroup;
    const group = groups.filter((group: any) => group.id.toString() === idGroup)[0]

    //const [group, setGroup] = useState(null);
    //const getGroup = async () => {}

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
                    <button className="-red">
                        <img src="/images/directions_run_24px.png"/>
                        <span>Leave group</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default withRouter(SingleYourGroup);