import React from 'react';
import "./GroupList.scss";

import GroupItem from '../GroupItem/GroupItem';

const GroupList = (props: any) => {
    return (
        <div className="GroupList">
            <ul>
                {
                    props.groups.map((group: any, i: number) => 
                        <GroupItem 
                            key={i}
                            label={group.label}
                            src={group.src}
                            member_count={group.member_count}
                            isPending={group.isPending}
                        />
                    )
                }
            </ul>
        </div>
    );
};

export default GroupList;