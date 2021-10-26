import React from 'react';
import "./GroupList.scss";

import GroupItem from '../GroupItem/GroupItem';

const GroupList = (props: any) => {
    return (
        <div className="GroupList">
            <ul>
                {
                    props.groups.map((group: any, i: number) => {
                        let member_count = 0;
                        if(props.counters && props.counters[group.title]) {
                            member_count = props.counters[group.title];
                        }
                        
                        return <GroupItem 
                                key={i}
                                id={group.id}
                                title={group.title}
                                src={group.src}
                                member_count={member_count}
                                isPending={group.isPending}
                                isFromGroups={props.isFromGroups}
                            />
                        }
                    )
                }
            </ul>
        </div>
    );
};

export default GroupList;