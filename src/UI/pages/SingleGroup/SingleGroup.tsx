import React, { useState } from 'react';
import "./SingleGroup.scss";

import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import RoundButton from '../../components/RoundButton/RoundButton';

const groups = [
    {
        id: 0,
        label: "Robocup",
        src: "/images/robocup.png",
        member_count: 12,
        isPending: false,
        description: "No description."
    },
    {
        id: 1,
        label: "Football",
        src: "/images/football.jpg",
        member_count: 27,
        isPending: false,
        description: "No description."
    },
    {
        id: 2,
        label: "Basketball",
        src: "/images/football.jpg",
        member_count: 8,
        isPending: false,
        description: "No description."
    }
]

const SingleGroup = (props: any) => {
    const idGroup = props.match.params.idGroup;
    const group = groups.filter((group: any) => group.id.toString() === idGroup)[0]

    //const [group, setGroup] = useState(null);
    //const getGroup = async () => {}

    return (
        <div className="SingleGroup">
            <div 
                className="GroupImg"
                style={{
                    backgroundImage: "url('/images/robocup.png')",
                    backgroundSize: "cover"
                }}
            >
                <Link to="/groups">
                    <img src="/images/arrow_back_ios_24px_outlined.svg"></img>
                </Link>
            </div>
            <div className="SingleGroupContainer">
                <h1 className="-highlighted">{group ? group.label : ""}</h1>
                <p>{group ? group.description : ""}</p>
                <RoundButton 
                    label="Ask to join"
                    backgroundColor="#EB3AA7"
                    height="0.75rem"
                    width="120px"
                />
                <h1>Paticipants</h1>
                <ul>
                    <li>
                        <img src="/images/avatar-faces/avatar-face-1.png"></img>
                        <span>Participant 1</span>
                    </li>
                    <li>
                        <img src="/images/avatar-faces/avatar-face-2.png"></img>
                        <span>Participant 2</span>
                        </li>
                    <li>
                        <img src="/images/avatar-faces/avatar-face-3.png"></img>
                        <span>Participant 3</span>
                    </li>
                    <li>
                        <img src="/images/avatar-faces/avatar-face-1.png"></img>
                        <span>Participant 4</span>
                    </li>
                    <li>
                        <img src="/images/avatar-faces/avatar-face-2.png"></img>
                        <span>Participant 5</span>
                        </li>
                    <li>
                        <img src="/images/avatar-faces/avatar-face-3.png"></img>
                        <span>Participant 6</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default withRouter(SingleGroup);