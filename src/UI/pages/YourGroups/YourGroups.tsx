import React, {useState} from 'react';
import "./YourGroups.scss";

import { Link } from "react-router-dom";

import GroupList from '../../components/GroupList/GroupList';

const groups = [
    {
        id: 0,
        title: "Robocup",
        src: "/images/robocup.png",
        member_count: 12,
        isPending: true,
        description: "No description."
    },
    {
        id: 1,
        title: "Football",
        src: "/images/football.jpg",
        member_count: 27,
        isPending: true,
        description: "No description."
    },
    {
        id: 2,
        title: "Basketball",
        src: "/images/football.jpg",
        member_count: 8,
        isPending: true,
        description: "No description."
    }
]

const YourGroups = (props: any) => {
    //const [groups, setGroups] = useState([]);
    //const getGroups = async () => {}

    return (
        <div className="YourGroups">
            <div className="GroupsTab">
                <Link to="/groups">
                    <h1>Groups</h1>
                </Link>
                <Link to="/your-groups">
                    <h1 className="selected">Your Groups</h1>
                </Link>
            </div>

            <div className="GroupsContainer">
                <GroupList groups={groups} isFromGroups={false}/>
            </div>
        </div>
    );
};

export default YourGroups;