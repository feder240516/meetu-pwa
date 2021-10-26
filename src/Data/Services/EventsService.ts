import { GetPeopleEventsByGroupRequest, GetPeopleEventsByInterestRequest, GetPeopleEventsRequest, GetPeopleEventsResponse } from "../../Core/Entities/Service/Read/GetPeopleEvents";
import { CreatePeopleEventByGroupRequest, CreatePeopleEventByInterestRequest, CreatePeopleEventResponse  } from "../../Core/Entities/Service/Create/CreatePeopleEvents";
import AxiosServer from "../Http/AxiosServer"

export default function EventsService () {

  const getEventsByInterest = async (params: GetPeopleEventsByInterestRequest) => {
    let url = `/events/interest?`
    params.interests.forEach(interest => {
      url += `Params=${interest}&`
    })
    const response = await AxiosServer.get<GetPeopleEventsResponse[]>(url);
    return response;
  }

  const getEventsByGroup = async (params: GetPeopleEventsByGroupRequest) => {
    let url = `/events/groups?`
    params.groups.forEach(group => {
      url += `Params=${group}&`
    })
    const response = await AxiosServer.get<GetPeopleEventsResponse[]>(url);
    return response;
  }

  const createEventByInterest = async (newEvent: CreatePeopleEventByInterestRequest) => {
    const response = await AxiosServer.post<CreatePeopleEventResponse>(`/university/events`, {
      body: newEvent,
    });
    return response;
  }

  const createEventByGroup = async (newEvent: CreatePeopleEventByGroupRequest) => {
    const response = await AxiosServer.post<CreatePeopleEventResponse>(`/university/events`, {
      body: newEvent,
    });
    return response;
  }

  return {
    getEventsByInterest,
    getEventsByGroup,
    createEventByInterest,
    createEventByGroup,
  }
}