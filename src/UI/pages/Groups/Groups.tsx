import React, { useState, useEffect } from 'react';
import "./Groups.scss";

import { Link } from "react-router-dom";
import AxiosServer from '../../../Data/Http/AxiosServer';

import GroupList from '../../components/GroupList/GroupList';

import { groups } from '../../../Data/Static/Groups';

/*const groups = [
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
]*/

const Groups = (props: any) => {
    /*const [groups, setGroups] = useState([]);

    const getGroups = async () => {
        try {
            const { data } = await AxiosServer.get<any[]>("/api/service/groups");
            setGroups(data);
        } catch(error) {
            console.log(error)
        } 
    }

    useEffect(() => {
       getGroups();
    }, []);*/

    return (
        <div className="Groups">
            <div className="GroupsTab">
                <Link to="groups">
                    <h1 className="selected">Groups</h1>
                </Link>
                <Link to="your-groups">
                    <h1>Your Groups</h1>
                </Link>
            </div>

            <div className="GroupsContainer">
                <GroupList groups={groups} isFromGroups={true}/>
            </div>
        </div>
    );
};

export default Groups;