import React from 'react';
import "./SelectInterestList.scss";

import SelectInterestItem from '../SelectInterestItem/SelectInterestItem';

import { interests } from "../../../Data/Static/Interests";

const SelectInterestList = (props: any) => {
    return (
        <div className="SelectInterestList">
            <ul>
                {
                    interests.map((interest: any, i: number) => 
                        (<SelectInterestItem 
                            key={i}
                            name={interest.name}
                            src={interest.src}
                            backgroundColor="white"
                        />)
                    )
                }
            </ul>
        </div>
    );
};

export default SelectInterestList;