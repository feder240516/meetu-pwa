import React, {useState, useEffect} from 'react';
import "./Interest.scss";

import {Link} from "react-router-dom";
import { withRouter } from 'react-router-dom';

import AxiosServer from '../../../Data/Http/AxiosServer';

import InterestPeopleList from '../../components/InterestPeopleList/InterestPeopleList';
import RoundButton from '../../components/RoundButton/RoundButton';

import { interests } from "../../../Data/Static/Interests";

const Interest = (props: any) => {
    const isMounted = React.useRef(true);
    const [peopleWithSameInterest, setPeopleWithSameInterest] = useState([]);

    const idInterest = props.match.params.idInterest;
    const interest = interests.filter((interest: any) => interest.id.toString() === idInterest)[0]

    const getPeopleWithSameInterest = async () => {
        try {
            const { data } = await AxiosServer.get<any[]>("/students");

            const people_with_same_interest: any = [];
            data.forEach((student: any) => {
                student.interests.forEach((i: any) => {
                    if(interest.name === i.name) {
                        people_with_same_interest.push(`${student.name} ${student.lastName}`)
                    }
                })
            });

            if(isMounted.current) {
                setPeopleWithSameInterest(people_with_same_interest);
            }

        } catch(error) {

        }
    }

    useEffect(() => {
        getPeopleWithSameInterest();

        return () => {
            isMounted.current = false;
        }
    }, [])

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
                                <InterestPeopleList 
                                    avatarList={peopleWithSameInterest}
                                    interest={interest}
                                />
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