import ImageWithShadow from "../../../components/ImageWithShadow/ImageWithShadow";
import Card from "../../../components/Card/Card";
import Input from "../../../components/Input/Input";
import SelectInput from "../../../components/SelectInput/SelectInput";
import './CreateEvent.scss';
import DateModal from "../../../components/DateModal/DateModal";
import TimeModal from "../../../components/TimeModal/TimeModal";
import { useHistory } from "react-router";
import { useContext, useState } from "react";
import { CreatePeopleEventByInterestRequest } from "../../../../Core/Entities/Service/Create/CreatePeopleEvents";
import DayjsUtils from "@date-io/dayjs";
import dayjs from 'dayjs'
import EventsService from "../../../../Data/Services/EventsService";
import { UserContext } from "../../../../Data/Context/UserContext/UserContextProvider";

const CreateEvent: React.FC = () => {
  const history = useHistory();
  const [user, setUser] = useContext(UserContext);
  const [interest, setInterest] = useState<string | null>(null)
  const [place, setPlace] = useState<string | null>(null)
  const [date, setDate] = useState<Date | null>(null)
  const [time, setTime] = useState<Date | null>(null)
  const [message, setMessage] = useState("")
  const myInterests = [
    { value: 'Football', label: 'Football' },
    { value: 'Basketball', label: 'Basketball' },
    { value: 'Baseball', label: 'Baseball' },
    { value: 'Hockey', label: 'Hockey' },
    { value: 'Soccer', label: 'Soccer' },
  ]

  const places = [
    { value: 'B Building', label: 'B Building' },
    { value: 'C Building', label: 'C Building' },
    { value: 'Green point', label: 'Green point' },
    { value: 'Restaurant', label: 'Restaurant' },
    { value: 'Audiovisuals', label: 'Audiovisuals' },
  ]

  const createEvent = () => {
    
    const newTime = dayjs(time).format('hh:mma');
    const newDate = dayjs(date).format('YYYY-MM-DD');
    const newEvent: CreatePeopleEventByInterestRequest = {
      interest: interest || '',
      place: place || '',
      date: `${newDate} ${newTime}`,
      message,
      time: '30mn',
    }
    console.log({ newEvent });
    EventsService().createEventByInterest(newEvent)
      .then(() => {
        history.push('/events');
      }).catch(err => {
        console.log({ err });
      });
    
  }

  return (
    <div className="create-event-page">
      <div className="create-event__header-wrapper">
        <h1 className="create-event__header">Create new event</h1>
        <div className="fill-space-for-decoration" />
      </div>
      <Card>
        <div className="create-event__content">
          <div className="create-event__decorative-avatar">
            <ImageWithShadow
              src="/images/MaleTanBrown1.png"
              alt=""
              height="86px"
            />
          </div>
          <Input
            id="message-for-event"
            label="Add a message"
            onChange={(value) => setMessage(value)}
          />
          <SelectInput
            label="Choose an interest"
            options={user?.interests.map(interest => ({
              label: interest.name,
              value: interest.name,
            })) || []}
            onChange={(value) => setInterest(value)}
          />
          <SelectInput
            label="Choose a place"
            options={places}
            onChange={(value) => setPlace(value)}
          />
          <p>Select Date and Time</p>
          <div className="create-event__place-and-time-wrapper">
            <div className="flex-grow-1">
              <DateModal
                id="date-for-new-event"
                onChange={(value) => setDate(value)}
              />
            </div>
            <div className="flex-grow-1">
              <TimeModal
                id="time-for-new-event"
                onChange={(value) => setTime(value)}
              />
            </div>
          </div>
        </div>
      </Card>
      <div className="create-event__create-button-wrapper">
        <button
          className="create-event__create-button"
          onClick={createEvent}
          disabled={!interest || !place || !date || !time || !message}
        >
          Create Event
        </button>
      </div>
    </div>
  );
};

export default CreateEvent;