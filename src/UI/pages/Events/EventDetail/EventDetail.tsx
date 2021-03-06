import React, { useContext, useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import PeopleEvent from "../../../../Core/Entities/PeopleEvent";
import { EventsContext } from "../../../../Data/Context/EventsContext/EventsContextProvider";
import { UserContext } from "../../../../Data/Context/UserContext/UserContextProvider";
import AxiosServer from "../../../../Data/Http/AxiosServer";
import GroupsService from "../../../../Data/Services/InterestsService";
import { groups } from "../../../../Data/Static/Groups";
import RoundButton from "../../../components/RoundButton/RoundButton";
import dayjs from "dayjs";
import './EventDetail.scss';
interface IProps {

}

const randomIntFromInterval = (min: number, max: number) => { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const EventDetail: React.FC<IProps> = (props: any) => {
  const isMounted = React.useRef(true);
  const history = useHistory();
  const [userProfile, setUserProfile] = useContext(UserContext);
  const [allEvents, setAllEvents] = useContext(EventsContext);
  const [thisEvent, setThisEvent] = useState<PeopleEvent>();

  const idEvent = props?.match?.params?.idEvent;

  const [participants, setParticipants] = useState<string[]>([]);

  useEffect(() => {
    const event = allEvents.filter(event => event.id.toString() === idEvent)[0];
    if (event) {
      setThisEvent(event);
      setParticipants([
        "John Doe",
        "Pedro Gomez",
        "Luis Miguel",
      ])
    }
  }, [idEvent, allEvents]);

  // const getParticipants = async () => {
  //   try {
  //     const groups_participants: any = [];

  //     const { data } = await AxiosServer.get<any[]>("/students");
  //     data.forEach((student: any) => {
  //       student.groups.forEach((g: any) => {
  //         if (group.title === g.title) {
  //           groups_participants.push(`${student.name} ${student.lastName}`);
  //         }
  //       })
  //     });

  //     if (isMounted.current) {
  //       setParticipants(groups_participants);
  //     }

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // const join = async () => {
  //   console.log("Joining group...");

  //   if (userProfile && group) {
  //     const modifiedUser = (await enterToGroup(
  //       userProfile,
  //       {
  //         id: group.id,
  //         title: group.title,
  //         description: group.description,
  //         participants: []
  //       }
  //     )).data;
  //     setUserProfile(modifiedUser);
  //     getParticipants();
  //   } else {
  //     history.push("/login");
  //   }
  // }

  const isMember = () => {
    //   let isMember = false;

    //   if (userProfile) {
    //     userProfile.groups.forEach((g: any) => {
    //       if (group.title === g.title) {
    //         isMember = true;
    //       }
    //     })
    //   }

    //   return isMember;
    return false;
  }

  const locateInMap = () => {
    history.push(`/?location=${thisEvent?.place}`)
  }

  useEffect(() => {
    // getParticipants();

    return () => {
      isMounted.current = false;
    };
  }, [])

  return (
    <div className="SingleEvent">
      <div
        className="EventImg"
        style={{
          backgroundImage: `url(${thisEvent?.image})`,
          backgroundSize: "cover"
        }}
      >
        <img src="/images/arrow_back_ios_24px_outlined.svg" onClick={() => history.goBack()}></img>
      </div>
      <div className="SingleEventContainer">
        <h1 className="-highlighted">{thisEvent?.name}</h1>
        <hr />
        <p className="event-headline"> 
          <i className="material-icons">event</i> 
          <span>{dayjs(thisEvent?.time).format('MMM DD, YYYY - hh:mma')}</span>
        </p>
        <p className="event-headline bot-margin"> 
          <i className="material-icons">location_on</i> 
          <span>{thisEvent?.place}</span> 
          <RoundButton
          label={"Go to location"}
          backgroundColor={isMember() ? "#4D1568" : "#EB3AA7"}
          height="0.75rem"
          width={isMember() ? "150px" : "120px"}
          customStyle={isMember() ? { pointerEvents: "none" } : {}}
          onClick={(e: any) => { locateInMap() }}
        />
        </p>
        <hr />
        
        <h1>Assistants</h1>
        
        
        <ul>
          {
            participants.map((participant: string, i: number) => {
              const avatar_face_option = randomIntFromInterval(1, 3);
              return (<li key={i}>
                <img src={`/images/avatar-faces/avatar-face-${avatar_face_option}.png`}></img>
                <span>{participant}</span>
              </li>)
            }
            )

          }
        </ul>
      </div>
    </div>
  );
}

export default EventDetail;