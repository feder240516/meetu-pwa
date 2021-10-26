import PeopleEvent from "../../PeopleEvent";

export interface GetPeopleEventsRequest {
  // id: number
}

export interface GetPeopleEventsByInterestRequest {
  interests: string[];
}

export interface GetPeopleEventsByGroupRequest {
  groups: number[];
}

export interface GetPeopleEventsResponse {
  interest?: string; // interest, si es de un interest
  message:  string;
  date:     string;
  time:     string;
  place:    string;
  title?:    string; // grupo, si es de un grupo
  id:       number;
}
