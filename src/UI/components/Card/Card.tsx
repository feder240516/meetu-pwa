import React from 'react';
import "./Card.scss";

interface IProps {
  children: any;
  className?: string
}

const Card: React.FC<IProps> = ({children, className}) => {
  return (
    <div className={`card-component ${className}`}>
      {children}
    </div>
  )
}

export default Card