import React, { useState, useEffect } from 'react';
import "./SingleGroup.scss";

import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import RoundButton from '../../components/RoundButton/RoundButton';

import AxiosServer from '../../../Data/Http/AxiosServer';
import { groups } from '../../../Data/Static/Groups';

const randomIntFromInterval = (min: number, max: number) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const SingleGroup = (props: any) => {
    const isMounted = React.useRef(true);

    const idGroup = props.match.params.idGroup;
    const group = groups.filter((group: any) => group.id.toString() === idGroup)[0]

    const [participants, setParticipants] = useState([]);

    const getParticipants = async () => {
        try {
            const groups_participants: any = [];

            const { data } = await AxiosServer.get<any[]>("/api/service/students");
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
        
    }

    useEffect(() => {
        getParticipants();

        return () => {
            isMounted.current = false;
        };
    })

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
                    label="Ask to join"
                    backgroundColor="#EB3AA7"
                    height="0.75rem"
                    width="120px"
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