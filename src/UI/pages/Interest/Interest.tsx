import React from 'react';
import "./Interest.scss";

import {Link} from "react-router-dom";
import { withRouter } from 'react-router-dom';

import InterestPeopleList from '../../components/InterestPeopleList/InterestPeopleList';
import RoundButton from '../../components/RoundButton/RoundButton';

const Interest = (props: any) => {
    const idInterest = props.match.params.idInterest;
    const interest = props.interests.filter((interest: any) => interest.id.toString() === idInterest)[0]

    return (
        <div className="Interest">
            <div className="-title">
                    <Link to="/interests">
                        <img src="/images/arrow_back_ios_24px_outlined.svg"></img>
                    </Link>
                    <h1>{interest ? interest.name : null}</h1>
             </div>
            
            <div className="circle">
                <img src={interest ? interest.src : ""} alt=""/>
            </div>

            <div className="InterestsContainer">
                <div className="-Inner">
                    
                    {
                        interest ? 
                            <React.Fragment>
                                <span className="inner-txt">People with this interest:</span>
                                <InterestPeopleList interest={interest}/>
                            </React.Fragment> 
                            : 
                            <span className="inner-txt">The interest wasn't found!</span>
                    }
                    
                </div>
            </div>

            {
                interest ? 
                    <div className="interest-btns">
                        <RoundButton 
                            label="Add interest"
                            backgroundColor="#EB3AA7"
                            onClick={(e: any) => {}}
                            height="20px"
                        />
                        <RoundButton 
                            label="See events"
                            backgroundColor="#F178B6"
                            onClick={(e: any) => {}}
                            height="20px"
                        />
                    </div> 
                    : 
                    null
            }
        </div>
    );
};

export default withRouter(Interest);