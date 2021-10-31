import React from 'react';
import "./SelectInterestList.scss";

import SelectInterestItem from '../SelectInterestItem/SelectInterestItem';

const SelectInterestList = (props: any) => {
    return (
        <div className="SelectInterestList">
            <ul>
                {
                    props.interests.map((interest: any, i: number) => {
                            let isChecked = props.selectedInterests.includes(interest.id);
                            return (<SelectInterestItem 
                                key={interest.id}
                                id={interest.id}
                                name={interest.name}
                                src={interest.src}
                                backgroundColor="white"
                                isChecked={isChecked}
                                onToggle={props.toggleSelect}
                            />)
                        }
                    )
                }
            </ul>
        </div>
    );
};

export default SelectInterestList;