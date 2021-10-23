import { useEffect, useState } from "react";
import PeopleEvent from "../../../../Core/Entities/PeopleEvent";
import Card from "../../../components/Card/Card"
import EventCard from "../../../components/EventCard/EventCard"
import RobocupImg from '../../../../assets/Robocup.png';
import './ViewEvents.scss';
import CreateButton from "../../../components/CreateButton/CreateButton";
import { useHistory } from "react-router-dom";
import EventsService from "../../../../Data/Services/EventsService";
import getPeopleEventMapper from "../../../../Data/Mapper/getPeopleEventMapper";

const ViewEvents: React.FC = () => {
  const history = useHistory();
  const { getEvents } = EventsService();
  const [todayEvents, setTodayEvents] = useState<PeopleEvent[]>([])
  /*const todayEvents: PeopleEvent[] = [{
    id: 1,
    name: 'Robocup meeting',
    time: new Date(),
    place: 'B Building',
    image: RobocupImg,
  }];*/
  const eventsAround: PeopleEvent[] = [/*{
    id: 2,
    name: 'Soccer match',
    time: new Date(new Date().valueOf() + 10000000),
    place: 'Soccer field',
    image: RobocupImg,
  }*/];

  useEffect(() => {
    getEvents({}).then(events => {
      const mappedEvents = events.data.map(event => getPeopleEventMapper(event))
      setTodayEvents(mappedEvents);
    })
  }, [])

  const navigateToCreateEvent = () => {
    history.push('/events/create');
  }

  return (
    <div className="view-events">
      <h1 className="view-events-title">Events</h1>
      <Card>
        <h4 className="view-events-subtitle">Your events today</h4>
        {todayEvents.map(thisEvent => (
          <EventCard peopleEvent={thisEvent} key={thisEvent.id}/>
        ))}
      </Card>
      <Card>
        <h4 className="view-events-subtitle">Events around you</h4>
        {eventsAround.map(thisEvent => (
          <EventCard peopleEvent={thisEvent} key={thisEvent.id}/>
        ))}
      </Card>
      <CreateButton text="Create new event" onClick={navigateToCreateEvent} />
    </div>
  )
}

export default ViewEvents;