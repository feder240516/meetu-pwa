import React from 'react';
import "./Interests.scss";

import SearchInput from '../../components/SearchInput/SearchInput';
import InterestsList from '../../components/InterestsList/InterestsList';

const Interests = (props: any) => {
    return (
        <div className="Interests">
            <SearchInput />

            <div className="InterestsContainer">
                <div className="-Inner">
                    <span className="inner-txt">Find interests</span>
                    <InterestsList interests={props.interests}/>
                </div>
            </div>
        </div>
    );
};

export default Interests;