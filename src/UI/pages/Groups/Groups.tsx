import React from 'react';
import "./Groups.scss";

import GroupList from '../../components/GroupList/GroupList';

const groups = [
    {
        label: "Robocup",
        src: "/images/robocup.png",
        member_count: 12,
        isPending: false
    },
    {
        label: "Football",
        src: "/images/football.jpg",
        member_count: 27,
        isPending: false
    },
    {
        label: "Basketball",
        src: "/images/football.jpg",
        member_count: 8,
        isPending: false
    }
]

const Groups = (props: any) => {
    return (
        <div className="Groups">
            <h1>Groups</h1>

            <div className="GroupsContainer">
                <GroupList groups={groups}/>
            </div>
        </div>
    );
};

export default Groups;