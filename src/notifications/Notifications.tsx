import React, { useState, useEffect } from "react";
import { getToken }from "../firebaseInit";

const Notifications = (props: any) => {
    const [isTokenFound, setTokenFound] = useState(false);   

    console.log("Token found", isTokenFound);
    useEffect(() => {
      let data;
      async function tokenFunc() {
        data = await getToken(setTokenFound);
        if (data) {
          console.log("Token is", data);

          // Send notification?
        }
        return data;
      }
      tokenFunc();
    }, [setTokenFound]);
    
    return <></>;
   };

export default Notifications;