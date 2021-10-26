import React, {useState, useEffect, useContext} from 'react';
import "./YourGroups.scss";

import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import AxiosServer from '../../../Data/Http/AxiosServer';

import GroupList from '../../components/GroupList/GroupList';
import { groups } from '../../../Data/Static/Groups';

import { UserContext } from '../../../Data/Context/UserContext/UserContextProvider';

const YourGroups = (props: any) => {
    const isMounted = React.useRef(true);
    const history = useHistory();
    const [ userProfile, setUserProfile ] = useContext(UserContext);

    const [yourGroups, setYourGroups] = useState([]);
    const [groupsCount, setGroupsCount] = useState({});

    const getYourGroups = async () => {
        try {
            if(userProfile) {
                const email = userProfile.email;
                const { data } = await AxiosServer.get<any[]>("/students");

                const student = data.filter(student => student.email === email)[0];
                if(!student) {
                    throw Error("Could not find student!");
                }

                const your_groups: any = [];
                student.groups.forEach((group: any) => {
                    const foundGroup = groups.filter((g: any) => g.title === group.title)[0];
                    if(foundGroup) {
                        your_groups.push(foundGroup);
                    }
                })

                if(isMounted.current) {
                    setYourGroups(your_groups);
                }

            } else { 
                history.push("/login");
            }

        } catch(error) {
            console.log(error)
        } 
    }

    const getGroupsCounter = async () => {
        try {
            const groups_counter: any = {};

            const { data } = await AxiosServer.get<any[]>("/students");
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
        getYourGroups();
        getGroupsCounter();

        return () => {
            isMounted.current = false;
        }
     }, []);

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
                <GroupList counters={groupsCount} groups={yourGroups} isFromGroups={false}/>
            </div>
        </div>
    );
};

export default YourGroups;