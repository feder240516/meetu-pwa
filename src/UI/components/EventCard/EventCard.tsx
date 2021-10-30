import React from 'react';
import PeopleEvent from '../../../Core/Entities/PeopleEvent';
import CreateButton from '../CreateButton/CreateButton';
import dayjs from 'dayjs';
import "./EventCard.scss";

interface IProps {
  children?: any;
  className?: string;
  peopleEvent: PeopleEvent;
  onClick?: () => any;
}

const EventCard: React.FC<IProps> = ({children, className, peopleEvent, onClick}) => {
  const {name, time, place, image} = peopleEvent;
  
  const handleClick = () => {
    if (onClick) onClick()
  }

  return (
    <div className={`event-card-component ${className}`} onClick={() => { handleClick() }}>
      <div className="event-card-image-wrapper">
        <img src={image} alt={name} className='event-card-image' />
      </div>
      <div className="event-card-content">
        <p className="event-card-title">Robocup</p>
        <p className="event-card-text">{dayjs(time).format('hh:mma')} @ {place}</p>
      </div>
    </div>
  )
}

export default EventCard;