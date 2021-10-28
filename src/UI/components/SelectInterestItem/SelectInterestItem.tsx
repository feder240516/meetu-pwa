import React, { useState } from 'react';
import "./SelectInterestItem.scss";

const SelectInterestItem = (props: any) => {
    //const [isChecked, setIsChecked] = useState(false);

    const onChange = (e: any) => {
        //setIsChecked(!isChecked);
        props.onToggle(props.id);
    }
    
    return (
        <li className="SelectInterestItem">
            <label className="-RadioItem">
                <input
                    className="-RadioInput"
                    type="checkbox"
                    name="interest_name"
                    value={props.name}
                    onChange={onChange}
                    checked={props.isChecked}
                />
                <div className="-InterestItem">
                    <div className="circle" style={{ background: props.isChecked ? "#EB3AA7" : props.backgroundColor }}>
                        <img src={props.src} alt=""></img>
                    </div>
                    <span>{props.name}</span>
                </div>
            </label>
        </li>
    );
};

export default SelectInterestItem;