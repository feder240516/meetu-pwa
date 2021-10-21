import React from 'react';
import "./InterestItem.scss";

import { Link } from "react-router-dom";

const InterestItem = (props: any) => {
    return (
        <li className="InterestItem">
            <Link to={`/interest/${props.id}`}>
                <div className="circle" style={{background: props.backgroundColor}}>
                    <img src={props.src} alt=""></img>
                </div>
                <span>{props.name}</span>
            </Link>
        </li>
    );
};

export default InterestItem;