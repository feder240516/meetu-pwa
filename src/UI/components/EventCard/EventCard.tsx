import React from 'react';
import PeopleEvent from '../../../Core/Entities/PeopleEvent';
import CreateButton from '../CreateButton/CreateButton';
import "./EventCard.scss";

interface IProps {
  children?: any;
  className?: string;
  peopleEvent: PeopleEvent;
}

const EventCard: React.FC<IProps> = ({children, className, peopleEvent}) => {
  const {name, time, place, image} = peopleEvent;
  return (
    <div className={`event-card-component ${className}`}>
      <div className="event-card-image-wrapper">
        <img src={image} alt={name} className='event-card-image' />
      </div>
      <div className="event-card-content">
        <p className="event-card-title">Robocup</p>
        <p className="event-card-text">{time.getHours()}:{time.getMinutes()} @ {place}</p>
      </div>
    </div>
  )
}

export default EventCard;