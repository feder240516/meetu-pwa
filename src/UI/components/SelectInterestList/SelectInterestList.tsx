import React from 'react';
import "./SelectInterestList.scss";

import SelectInterestItem from '../SelectInterestItem/SelectInterestItem';

const SelectInterestList = (props: any) => {
    return (
        <div className="SelectInterestList">
            <ul>
                <SelectInterestItem 
                    name="Gym"
                    src="/images/Dumbbell.png"
                    backgroundColor="white"
                />
               <SelectInterestItem 
                    name="Tennis"
                    src="/images/Dumbbell.png"
                    backgroundColor="white"
                />
                <SelectInterestItem 
                    name="Basketball"
                    src="/images/Dumbbell.png"
                    backgroundColor="white"
                />
            </ul>
        </div>
    );
};

export default SelectInterestList;