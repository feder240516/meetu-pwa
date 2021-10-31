import ImageWithShadow from "../../components/ImageWithShadow/ImageWithShadow";
import Card from "../../components/Card/Card";
import Input from "../../components/Input/Input";
import SelectInput from "../../components/SelectInput/SelectInput";
import './CreateSOS.scss';
import DateModal from "../../components/DateModal/DateModal";
import TimeModal from "../../components/TimeModal/TimeModal";
import { useHistory } from "react-router";
import { useContext, useState } from "react";
import { CreatePeopleEventByInterestRequest } from "../../../Core/Entities/Service/Create/CreatePeopleEvents";
import DayjsUtils from "@date-io/dayjs";
import dayjs from 'dayjs'
import EventsService from "../../../Data/Services/EventsService";
import { UserContext } from "../../../Data/Context/UserContext/UserContextProvider";



const CreateSOS: React.FC<any> = ({onCreateSOS}) => {
  const history = useHistory();
  const [user, setUser] = useContext(UserContext);
  const [interest, setInterest] = useState<string | null>(null)
  const [place, setPlace] = useState<string | null>(null)
  const [date, setDate] = useState<Date | null>(null)
  const [time, setTime] = useState<Date | null>(null)
  const [message, setMessage] = useState("")

  const places = [
    { value: 'B Building', label: 'B Building' },
    { value: 'C Building', label: 'C Building' },
    { value: 'Green point', label: 'Green point' },
    { value: 'Restaurant', label: 'Restaurant' },
    { value: 'Audiovisuals', label: 'Audiovisuals' },
  ]
  
  const emergencies = [
    { value: 'Medical emergency', label: 'Medical emergency' },
    { value: 'Environmental emergency', label: 'Environmental emergency' },
    { value: 'Suicide alert', label: 'Suicide alert' },
    { value: 'Other', label: 'Other' },
  ]

  const createSOS = () => {
    onCreateSOS();
    history.push('/');
  }

  return (
    <div className="create-event-page">
      <div className="create-event__header-wrapper">
        <h1 className="create-event__header">Do you have an emergency?</h1>
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
            label="Describe your emergency"
            // onChange={(value) => setMessage(value)}
          />
          <SelectInput
            label="Select your type of emergency"
            options={emergencies || []}
            // onChange={(value) => setInterest(value)}
          />
          <p>Your current location will be shared</p>
        </div>
      </Card>
      <div className="create-event__create-button-wrapper">
        <button
          className="create-event__create-button"
          onClick={createSOS}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreateSOS;