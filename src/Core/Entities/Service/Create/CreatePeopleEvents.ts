import PeopleEvent from "../../PeopleEvent";

export interface CreatePeopleEventRequest {
  id: number;
  name: string;
  hairStyle: number;
  skinColor: number;
  gender: string;
}

export interface CreatePeopleEventResponse {}