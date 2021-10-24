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
                            id={group.id}
                            title={group.title}
                            src={group.src}
                            member_count={group.member_count}
                            isPending={group.isPending}
                            isFromGroups={props.isFromGroups}
                        />
                    )
                }
            </ul>
        </div>
    );
};

export default GroupList;