import { useState } from "react";
import PeopleEvent from "../../../../Core/Entities/PeopleEvent";
import Card from "../../../components/Card/Card"
import EventCard from "../../../components/EventCard/EventCard"
import RobocupImg from '../../../../assets/Robocup.png';
import './ViewEvents.scss';
import CreateButton from "../../../components/CreateButton/CreateButton";

const ViewEvents: React.FC = () => {
  const todayEvents: PeopleEvent[] = [{
    name: 'Robocup meeting',
    time: new Date(),
    place: 'B Building',
    image: RobocupImg,
  }];
  const eventsAround: PeopleEvent[] = [{
    name: 'Soccer match',
    time: new Date(new Date().valueOf() + 10000000),
    place: 'Soccer field',
    image: RobocupImg,
  }];

  return (
    <div className="view-events">
      <h1 className="view-events-title">Events</h1>
      <Card>
        <h4 className="view-events-subtitle">Your events today</h4>
        {todayEvents.map(thisEvent => (
          <EventCard peopleEvent={thisEvent}/>
        ))}
      </Card>
      <Card>
        <h4 className="view-events-subtitle">Events around you</h4>
        {eventsAround.map(thisEvent => (
          <EventCard peopleEvent={thisEvent}/>
        ))}
      </Card>
      <CreateButton text="Create new event" />
    </div>
  )
}

export default ViewEvents;