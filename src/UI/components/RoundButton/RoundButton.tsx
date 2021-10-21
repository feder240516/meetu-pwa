import React from 'react';
import "./RoundButton.scss";

const RoundButton = (props: any) => {
    return (
        <button 
            className="RoundButton" 
            onClick={props.onClick} 
            style={{
                background: props.backgroundColor,  
                ...props.width ? { width: props.width } : {},
                ...props.height ? { padding: `${props.height} 0rem` }:{},
                ...props.customStyle ? { ...props.customStyle }:{}
            }}
        >
            <div 
                className="circle-btn-left" 
                style={{ background: props.backgroundColor}} 
            />
            <span>{props.label}</span>
            <div 
                className="circle-btn-right" 
                style={{ background: props.backgroundColor}} 
            />
        </button>
    );
};

export default RoundButton;