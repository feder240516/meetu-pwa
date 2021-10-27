import React, {useState, useEffect, useContext} from 'react';
import "./Interest.scss";

import {Link} from "react-router-dom";
import { withRouter } from 'react-router-dom';

import { useHistory } from "react-router";
import AxiosServer from '../../../Data/Http/AxiosServer';

import InterestPeopleList from '../../components/InterestPeopleList/InterestPeopleList';
import RoundButton from '../../components/RoundButton/RoundButton';

import { UserContext } from '../../../Data/Context/UserContext/UserContextProvider';

import { interests } from "../../../Data/Static/Interests";
import InterestsService from '../../../Data/Services/InterestsService';

const Interest = (props: any) => {
    const isMounted = React.useRef(true);
    const history = useHistory();
    const [peopleWithSameInterest, setPeopleWithSameInterest] = useState([]);

    const idInterest = props.match.params.idInterest;
    const interest = interests.filter((interest: any) => interest.id.toString() === idInterest)[0]

    const [ userProfile, setUserProfile ] = useContext(UserContext);
    const { addInterest, removeInterest } = InterestsService();

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
            console.log(error);
        }
    }

    const add = async() => {
        if(userProfile && interest) {
            const modifiedUser = (await addInterest(
                userProfile, 
                {
                    id: interest.id,
                    name: interest.name
                }
            )).data;
            setUserProfile(modifiedUser);
            getPeopleWithSameInterest();
        } else {
            history.push("/login")
        }
    }

    const remove = async() => {
        if(userProfile && interest) {
            const modifiedUser = (await removeInterest(
                userProfile, 
                {
                    id: interest.id,
                    name: interest.name
                }
            )).data;
            setUserProfile(modifiedUser);
            getPeopleWithSameInterest();
        } else {
            history.push("/login")
        }
    }

    const hasInterest = () => {
        let hasInterest = false;

        if(userProfile) {
            userProfile.interests.forEach((i: any) => {
                if(interest.name === i.name) {
                    hasInterest = true;
                }
            })
        }

        return hasInterest;
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
                        {hasInterest() ? 
                            (<RoundButton 
                                label="Remove interest"
                                backgroundColor="#EB3AA7"
                                onClick={(e: any) => { remove() }}
                                height="20px"
                            />) 
                            : 
                            (<RoundButton 
                                label="Add interest"
                                backgroundColor="#EB3AA7"
                                onClick={(e: any) => { add() }}
                                height="20px"
                            />)
                        }

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