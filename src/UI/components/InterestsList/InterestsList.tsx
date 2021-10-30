import React from 'react';
import "./InterestsList.scss";

import InterestItem from '../InterestItem/InterestItem';

const InterestsList = (props: any) => {
    return (
        <div className="InterestsList">
            <ul className="InterestList-Inner">
                {props.interests.map((interest: any, i: number) => 
                    <InterestItem 
                        key={i}
                        id={interest.id}
                        name={interest.name}
                        src={interest.src}
                        backgroundColor="white"
                    />
                )}
            </ul>
        </div>
    );
};

export default InterestsList;