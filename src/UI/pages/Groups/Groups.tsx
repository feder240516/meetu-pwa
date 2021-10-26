import React, { useState, useEffect } from 'react';
import "./Groups.scss";

import { Link } from "react-router-dom";
import AxiosServer from '../../../Data/Http/AxiosServer';

import GroupList from '../../components/GroupList/GroupList';

import { groups } from '../../../Data/Static/Groups';

const Groups = (props: any) => {
    const isMounted = React.useRef(true);
    const [groupsCount, setGroupsCount] = useState({});
    
    const getGroupsCounter = async () => {
        try {
            const groups_counter: any = {};

            const { data } = await AxiosServer.get<any[]>("/api/service/students");
            data.forEach((student: any) => {
                student.groups.forEach((group: any) => {
                    if(!groups_counter[group.title]) {
                        groups_counter[group.title] = 0
                    }
                       
                    groups_counter[group.title]++;
                })
            });

            if(isMounted.current) {
                setGroupsCount(groups_counter);
            }
            
        } catch(error) {
            console.log(error)
        } 
    }

    useEffect(() => {
        getGroupsCounter();

        return () => {
            isMounted.current = false;
        }
     }, []);
    
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
                <GroupList counters={groupsCount} groups={groups} isFromGroups={true}/>
            </div>
        </div>
    );
};

export default Groups;