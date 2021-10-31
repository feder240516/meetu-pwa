import { useContext } from "react";
import { EventsContext } from "../../Data/Context/EventsContext/EventsContextProvider";
import { UserContext } from "../../Data/Context/UserContext/UserContextProvider";

type IProps = {
  Component: any,
  props: any
}

const AllContext: React.FC<IProps> = ({Component, props}) => {
  const userContextData = useContext(UserContext);
  const eventsContextData = useContext(EventsContext);

  return (
    <Component 
      userContextData={userContextData}
      eventsContextData={eventsContextData}
      {...props}
    />
  );
}

export const WithContextHOC = (Component: any) => {
  return (props: any) => (
    <AllContext Component={Component} props={props} />
  );
};
