export interface CreatePeopleEventByInterestRequest {
  interest:string,
  place:string,
  date:string,
  time:string,
  message:string,
};

export interface CreatePeopleEventByGroupRequest {
  place:string,
  date:string,
  time:string,
  message:string,
  group: Group
};

export interface CreatePeopleEventResponse {}

export interface Group {
  id:           number;
  title:        string;
  description:  string;
  participants: string[];
}
