import PeopleEvent from "../../PeopleEvent";

export interface GetPeopleEventsRequest {
  // id: number
}

export type GetPeopleEventsResponse = GetPeopleEventApi[];

export interface GetPeopleEventApi {
  interest: string;
  message:  string;
  date:     string;
  time:     string;
  place:    string;
  title:    string | null;
  id:       number;
}