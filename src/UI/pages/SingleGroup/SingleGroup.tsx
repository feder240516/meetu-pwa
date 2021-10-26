import React, { useState, useEffect, useContext } from 'react';
import "./SingleGroup.scss";

import { useHistory } from "react-router";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import RoundButton from '../../components/RoundButton/RoundButton';

import { UserContext } from '../../../Data/Context/UserContext/UserContextProvider';
import AxiosServer from '../../../Data/Http/AxiosServer';
import { groups } from '../../../Data/Static/Groups';

import GroupsService from '../../../Data/Services/GroupsService';

const randomIntFromInterval = (min: number, max: number) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const SingleGroup = (props: any) => {
    const isMounted = React.useRef(true);
    const history = useHistory();
    const [ userProfile, setUserProfile ] = useContext(UserContext);

    const idGroup = props.match.params.idGroup;
    const group = groups.filter((group: any) => group.id.toString() === idGroup)[0]

    const [participants, setParticipants] = useState([]);

    const { enterToGroup } = GroupsService();

    const getParticipants = async () => {
        try {
            const groups_participants: any = [];

            const { data } = await AxiosServer.get<any[]>("/students");
            data.forEach((student: any) => {
                student.groups.forEach((g: any) => {
                    if(group.title === g.title) {
                        groups_participants.push(`${student.name} ${student.lastName}`);
                    }
                })
            });

            if(isMounted.current) {
                setParticipants(groups_participants);
            }

        } catch(error) {
            console.log(error)
        } 
    }

    const join = async () => {
        console.log("Joining group...");

        if(userProfile && group) {
            const modifiedUser = (await enterToGroup(
                userProfile, 
                { 
                    id: group.id, 
                    title: group.title,
                    description: group.description,
                    participants: []
                }
            )).data;
            setUserProfile(modifiedUser);
            getParticipants();
        } else {
            history.push("/login");
        }
    }

    const isMember =  () => {
        let isMember = false;

        if(userProfile) {
            userProfile.groups.forEach((g: any) => {
                if(group.title === g.title) {
                    isMember = true;
                }
            })
        }

        return isMember;
    }

    useEffect(() => {
        getParticipants();

        return () => {
            isMounted.current = false;
        };
    }, [])

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
                <h1 className="-highlighted">{group ? group.title : ""}</h1>
                <p>{group ? group.description : ""}</p>
                <RoundButton 
                    label={isMember() ? "You are a member of this group!" : "Ask to join"}
                    backgroundColor={isMember() ? "#4D1568":"#EB3AA7"}
                    height="0.75rem"
                    width={isMember() ? "150px" : "120px"}
                    customStyle={isMember() ? { pointerEvents: "none"} : {}}
                    onClick={(e: any) => { join() }}
                />
                <h1>Paticipants</h1>
                <ul>
                    {
                        participants.map((participant: string, i: number) => {
                            const avatar_face_option = randomIntFromInterval(1, 3);
                            return (<li key={i}>
                                <img src={`/images/avatar-faces/avatar-face-${avatar_face_option}.png`}></img>
                                <span>{participant}</span>
                            </li>)
                            }
                        )
                        
                    }
                </ul>
            </div>
        </div>
    );
};

export default withRouter(SingleGroup);