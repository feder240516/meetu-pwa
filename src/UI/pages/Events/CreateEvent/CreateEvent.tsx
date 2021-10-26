import ImageWithShadow from "../../../components/ImageWithShadow/ImageWithShadow";
import Card from "../../../components/Card/Card";
import Input from "../../../components/Input/Input";
import SelectInput from "../../../components/SelectInput/SelectInput";
import './CreateEvent.scss';
import DateModal from "../../../components/DateModal/DateModal";
import TimeModal from "../../../components/TimeModal/TimeModal";
import { useHistory } from "react-router";
import { useState } from "react";
import { CreatePeopleEventByInterestRequest } from "../../../../Core/Entities/Service/Create/CreatePeopleEvents";
import DayjsUtils from "@date-io/dayjs";
import dayjs from 'dayjs'
import EventsService from "../../../../Data/Services/EventsService";

const CreateEvent: React.FC = () => {
  const history = useHistory();
  const [interest, setInterest] = useState<string | null>(null)
  const [place, setPlace] = useState<string | null>(null)
  const [date, setDate] = useState<Date | null>(null)
  const [time, setTime] = useState<Date | null>(null)
  const [message, setMessage] = useState("")
  const myInterests = [
    { value: 1, label: 'Football' },
    { value: 2, label: 'Basketball' },
    { value: 3, label: 'Baseball' },
    { value: 4, label: 'Hockey' },
    { value: 5, label: 'Soccer' },
    { value: 6, label: 'Football' },
    { value: 7, label: 'Basketball' },
    { value: 8, label: 'Baseball' },
    { value: 9, label: 'Hockey' },
    { value: 10, label: 'Soccer' },
    { value: 11, label: 'Football' },
    { value: 12, label: 'Basketball' },
    { value: 13, label: 'Baseball' },
    { value: 14, label: 'Hockey' },
    { value: 15, label: 'Soccer' },
  ]

  const places = [
    { value: 1, label: 'B Building' },
    { value: 2, label: 'C Building' },
    { value: 3, label: 'Green point' },
    { value: 4, label: 'Restaurant' },
    { value: 5, label: 'Audiovisuals' },
  ]

  const createEvent = () => {
    
    const newTime = dayjs(time).format('HH:mma');
    const newDate = dayjs(date).format('YYYY-MM-DD');
    const newEvent: CreatePeopleEventByInterestRequest = {
      interest: interest || '',
      place: place || '',
      date: newDate,
      message,
      time: newTime,
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
          <SelectInput
            label="Choose an interest"
            options={myInterests}
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
          <Input
            id="message-for-event"
            label="Add a message"
          />
        </div>
      </Card>
      <div className="create-event__create-button-wrapper">
        <button
          className="create-event__create-button"
          onClick={createEvent}
          disabled={!interest || !place || !date || !time}
        >
          Create Event
        </button>
      </div>
    </div>
  );
};

export default CreateEvent;