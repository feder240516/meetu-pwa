import React from 'react';
import "./InterestPeopleList.scss";

import InterestPeopleItem from '../InterestPeopleItem/InterestPeopleItem';

const randomIntFromInterval = (min: number, max: number) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const InterestPeopleList = (props: any) => {
    return (
        <div className="InterestPeopleList">
            <ul>
                {
                    props.avatarList.map((avatar_name: string, i: number) => {
                        const avatar_face_option = randomIntFromInterval(1, 3);

                        return (<InterestPeopleItem 
                            key={i}
                            avatar_name={avatar_name}
                            avatar_face={`/images/avatar-faces/avatar-face-${avatar_face_option}.png`}
                        />)
                    })
                }          
            </ul>
        </div>
    );
};

export default InterestPeopleList;