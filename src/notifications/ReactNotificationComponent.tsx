import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReactNotificationComponent = (props : any) => {
  useEffect(() => {

    const Display = () => 
    (<div>
        <h4 style={{color: "black"}}>{props.title}</h4>
        <p style={{color: "black"}}>{props.body}</p>
    </div>)

    toast(<Display />);
  }, [props.title, props.body])

  return (
    <ToastContainer />
  );
};

export default ReactNotificationComponent;