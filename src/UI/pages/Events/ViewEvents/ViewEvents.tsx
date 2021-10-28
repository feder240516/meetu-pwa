import { useContext, useEffect, useState } from "react";
import PeopleEvent from "../../../../Core/Entities/PeopleEvent";
import Card from "../../../components/Card/Card"
import EventCard from "../../../components/EventCard/EventCard"
import RobocupImg from '../../../../assets/Robocup.png';
import './ViewEvents.scss';
import CreateButton from "../../../components/CreateButton/CreateButton";
import { useHistory } from "react-router-dom";
import EventsService from "../../../../Data/Services/EventsService";
import getPeopleEventMapper from "../../../../Data/Mapper/getPeopleEventMapper";
import { UserContext } from "../../../../Data/Context/UserContext/UserContextProvider";
import { EventsContext } from "../../../../Data/Context/EventsContext/EventsContextProvider";

const ViewEvents: React.FC = () => {
  const history = useHistory();
  const [user, setUser] = useContext(UserContext);
  const [allEvents, setAllEvents] = useContext(EventsContext);
  const [todayEvents, setTodayEvents] = useState<PeopleEvent[]>([])
  const [eventsAround, setEventsAround] = useState<PeopleEvent[]>([])

  /*const todayEvents: PeopleEvent[] = [{
    id: 1,
    name: 'Robocup meeting',
    time: new Date(),
    place: 'B Building',
    image: RobocupImg,
  }];*/
  /*const eventsAround: PeopleEvent[] = [{
    id: 2,
    name: 'Soccer match',
    time: new Date(new Date().valueOf() + 10000000),
    place: 'Soccer field',
    image: RobocupImg,
  }]*/;

  useEffect(() => {
    if (user) {
      const groupIDs = user.groups.map(group => group.id);
      const interests = user.interests.map(interest => interest.name);
      Promise.all([
        EventsService().getEventsByGroup({groups:groupIDs}),
        EventsService().getEventsByInterest({interests})
      ]).then(([eventsByGroups, eventsByInterests]) => {
        const mappedEventsAround = eventsByGroups.data.map(event => getPeopleEventMapper(event))
        const mappedTodayEvents = eventsByInterests.data.map(event => getPeopleEventMapper(event))
        setEventsAround(mappedEventsAround);
        setTodayEvents(mappedTodayEvents);
        setAllEvents([...mappedTodayEvents, ...mappedEventsAround]);
      })
    } else {
      history.push('/login');
    }
  }, [])

  const navigateToCreateEvent = () => {
    history.push('/events/create');
  }

  const navigateToEventDetails = (event: PeopleEvent) => {
    history.push(`/events/${event.id}`);
  }

  return (
    <div className="view-events">
      <h1 className="view-events-title">Events</h1>
      <Card>
        <h4 className="view-events-subtitle">Your events</h4>
        {todayEvents.map(thisEvent => (
          <div className="event-card-margin-wrapper" key={thisEvent.id}>
            <EventCard peopleEvent={thisEvent} onClick={() => navigateToEventDetails(thisEvent)} />
          </div>
        ))}
      </Card>
      <Card>
        <h4 className="view-events-subtitle">Events around you</h4>
        {eventsAround.map(thisEvent => (
          <div className="event-card-margin-wrapper" key={thisEvent.id}>
            <EventCard peopleEvent={thisEvent} onClick={() => navigateToEventDetails(thisEvent)} />
          </div>
        ))}
      </Card>
      <CreateButton text="Create new event" onClick={navigateToCreateEvent} />
    </div>
  )
}

export default ViewEvents;