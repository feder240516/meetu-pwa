import React, {useState, useEffect, useContext} from 'react';
import "./SelectInterest.scss";

import SearchInput from '../../components/SearchInput/SearchInput';
import SelectInterestList from '../../components/SelectInterestList/SelectInterestList';
import RoundButton from '../../components/RoundButton/RoundButton';

import { useHistory } from "react-router";
import { interests } from "../../../Data/Static/Interests";

import { UserContext } from '../../../Data/Context/UserContext/UserContextProvider';
import InterestsService from '../../../Data/Services/InterestsService';
import EventsService from '../../../Data/Services/EventsService';
import getPeopleEventMapper from '../../../Data/Mapper/getPeopleEventMapper';
import { EventsContext } from '../../../Data/Context/EventsContext/EventsContextProvider';

const SelectInterest = (props: any) => {
    const [search, setSearch] = useState("");
    const [selectedInterests, setSelectedInterests] = useState<any>([]);

    const history = useHistory();

    const [ userProfile, setUserProfile ] = useContext(UserContext);
    const [allEvents, setAllEvents] = useContext(EventsContext);
    const { setInterests } = InterestsService();

    const onChangeSearch = (e: any) => {
        setSearch(e.target.value);
    }

    const getFilteredInterests = () => {
        return search !== ""
        ? interests.filter((interest: any) =>
            interest.name.toLowerCase().includes(search.toLowerCase())
          )
        : interests;
    }

    const getInterests = () => {
        if(userProfile) {
            let interestIds: any = [];
            userProfile.interests.forEach((interest: any) => {
                interestIds.push(interest.id);
            })

            setSelectedInterests(interestIds);
        } else {
            history.push("/login");
        }
    }

    const toggleSelect = (id: number) => {
        if(selectedInterests.includes(id)) {
            const newInterestIds: any = [...selectedInterests.filter((interestId: number) => interestId !== id)]
            setSelectedInterests(newInterestIds);
        } else {
            const newInterestIds: any = [...selectedInterests]
            newInterestIds.push(id);
            setSelectedInterests(newInterestIds);
        }
        
    }

    const onContinue = () => {
        updateInterests();
        history.push("/profile");
        console.log(userProfile);
    }

    const updateInterests = async () => {
        if(userProfile) {
            const newSelectedInterests: any = [];
            selectedInterests.forEach((id: any) => {
                const interest = interests.filter((i: any) => i.id === id)[0]
                if(interest) {
                    newSelectedInterests.push(
                        {
                            name: interest.name,
                            id: interest.id
                        }
                    )
                }
            })

            const modifiedUser = (await setInterests(
                userProfile,
                newSelectedInterests
            )).data;

            setUserProfile(modifiedUser);
            const newgroupIDs = modifiedUser.groups.map(group => group.id);
            const newInterests = modifiedUser.interests.map(interest => interest.name);
            const [eventsByGroups, eventsByInterests] = await Promise.all([
                EventsService().getEventsByGroup({ groups: newgroupIDs }),
                EventsService().getEventsByInterest({ interests: newInterests })
            ])
            const groupEvents = eventsByGroups.data.map(event => getPeopleEventMapper(event))
            const interestsEvents = eventsByInterests.data.map(event => getPeopleEventMapper(event))
            setAllEvents([...groupEvents, ...interestsEvents]);
            
        }
    }

    useEffect(() => {
        getInterests();

        return () => {}
    }, [])

    return (
        <div className="SelectInterest">
            <SearchInput onChange={onChangeSearch} />

            <div className="InterestsContainer">
                <div className="-Inner">
                    <span className="inner-txt">Select your interests!</span>
                    <SelectInterestList 
                        interests={getFilteredInterests()} 
                        selectedInterests={selectedInterests}
                        toggleSelect={toggleSelect}
                    />
                </div>
            </div>

            <div className="interest-btns">
                <RoundButton 
                    label="Continue"
                    backgroundColor="#EB3AA7"
                    onClick={(e: any) => { onContinue() }}
                    height="1rem"
                    customStyle={{ textTransform: "uppercase"}}
                />
            </div>
        </div>
    );
};

export default SelectInterest;