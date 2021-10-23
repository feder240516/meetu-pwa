import ImageWithShadow from "../../../components/ImageWithShadow/ImageWithShadow";
import Card from "../../../components/Card/Card";
import Input from "../../../components/Input/Input";
import SelectInput from "../../../components/SelectInput/SelectInput";
import './CreateEvent.scss';
import DateModal from "../../../components/DateModal/DateModal";
import TimeModal from "../../../components/TimeModal/TimeModal";
import { useHistory } from "react-router";

const CreateEvent: React.FC = () => {
  const history = useHistory();
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

  const handleChange = (value: any) => {
    console.log(value);
  }

  const createEvent = () => {
    history.push('/events');
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
          />
          <SelectInput
            label="Choose a place"
            options={places}
          />
          <p>Select Date and Time</p>
          <div className="create-event__place-and-time-wrapper">
            <div className="flex-grow-1">
            <DateModal id="date-for-new-event" />
            </div>
            <div className="flex-grow-1">
            <TimeModal id="time-for-new-event" />
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
        >
          Create Event
        </button>
      </div>
    </div>
  );
};

export default CreateEvent;