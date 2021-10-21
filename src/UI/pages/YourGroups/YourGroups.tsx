import React from 'react';
import "./YourGroups.scss";

import GroupList from '../../components/GroupList/GroupList';

const groups = [
    {
        label: "Robocup",
        src: "/images/robocup.png",
        member_count: 12,
        isPending: true
    },
    {
        label: "Football",
        src: "/images/football.jpg",
        member_count: 27,
        isPending: true
    },
    {
        label: "Basketball",
        src: "/images/football.jpg",
        member_count: 8,
        isPending: true
    }
]

const YourGroups = (props: any) => {
    return (
        <div className="YourGroups">
            <h1>Your groups</h1>

            <div className="GroupsContainer">
                <GroupList groups={groups}/>
            </div>
        </div>
    );
};

export default YourGroups;