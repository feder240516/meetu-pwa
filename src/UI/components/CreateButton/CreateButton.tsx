import React from 'react';
import './CreateButton.scss';

interface IProps {
  text: string;
  onClick?: () => any;
}
const CreateButton: React.FC<IProps> = ({text, onClick}) => {
  const handleClick = () => {
    if (onClick) { onClick() }
  }

  return (
    <div className="create-button-component">
      <span className="create-button-label">{text}</span>
      <button className="circle-button" style={{position: "relative"}} onClick={handleClick}>
        <i className="material-icons" style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>add</i>
      </button>
    </div>
  )
}

export default CreateButton;