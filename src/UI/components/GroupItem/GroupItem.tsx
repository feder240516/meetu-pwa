import React from 'react';
import "./GroupItem.scss";

import { Link } from "react-router-dom";

const GroupItem = (props: any) => {
    return (
        <li className="GroupItem">
            <Link to={props.isFromGroups ? `/groups/${props.id}`:`/your-groups/${props.id}`} className="GroupLink">
                <div className="-GroupImg" 
                    style={{
                        backgroundImage: `url('${props.src}')`,
                        backgroundSize: "cover"
                    }}
                >
                    {props.isPending ? <span>Pending of acceptance</span> : null}
                </div>
                <div className="-GroupContent">
                    <span className="Grouptitle">{props.title}</span>
                    <div className="avatar-faces">
                    <img 
                        style={{marginLeft: "0px"}}
                        src="/images/avatar-faces/avatar-face-3.png" />
                        <img 
                        style={{marginLeft: "30px"}}
                        src="/images/avatar-faces/avatar-face-1.png" />
                        <img 
                        style={{marginLeft: "63px"}}
                        src="/images/avatar-faces/avatar-face-2.png" />
                    </div>
                    <div className="circle">
                        <span>+{props.member_count && props.member_count - 3 > 0 ? props.member_count - 3 : 0}</span>
                    </div>
                </div>
                
            </Link>
        </li>
    );
};

export default GroupItem;