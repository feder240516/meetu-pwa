import React from 'react';
import "./SelectInterest.scss";

import SearchInput from '../../components/SearchInput/SearchInput';
import SelectInterestList from '../../components/SelectInterestList/SelectInterestList';
import RoundButton from '../../components/RoundButton/RoundButton';

const SelectInterest = (props: any) => {
    return (
        <div className="SelectInterest">
            <SearchInput />

            <div className="InterestsContainer">
                <div className="-Inner">
                    <span className="inner-txt">Select your interests!</span>
                    <SelectInterestList />
                </div>
            </div>

            <div className="interest-btns">
                <RoundButton 
                    label="Continue"
                    backgroundColor="#EB3AA7"
                    onClick={(e: any) => {}}
                    height="1rem"
                    customStyle={{ textTransform: "uppercase"}}
                />
            </div>
        </div>
    );
};

export default SelectInterest;