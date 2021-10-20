import React from 'react';
import "./InterestPeopleItem.scss";

const InterestPeopleItem = (props: any) => {
    return (
        <li className="InterestPeopleItem">
            <div className="-img-container">
                <img src={props.avatar_face} alt=""></img>
            </div>
            <span>{props.avatar_name}</span>
        </li>
    );
};

export default InterestPeopleItem;