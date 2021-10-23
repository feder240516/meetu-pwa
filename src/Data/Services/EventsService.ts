import { GetPeopleEventsRequest, GetPeopleEventsResponse } from "../../Core/Entities/Service/Read/GetPeopleEvents";
import { CreatePeopleEventRequest, CreatePeopleEventResponse  } from "../../Core/Entities/Service/Create/CreatePeopleEvents";
import AxiosServer from "../Http/AxiosServer"

export default function EventsService () {
  const getEvents = async (params: GetPeopleEventsRequest) => {
    const response = await AxiosServer.get<GetPeopleEventsResponse>(`/university/events`);
    return response;
  }
  const createEvent = async (newEvent: CreatePeopleEventRequest) => {
    const response = await AxiosServer.put<CreatePeopleEventResponse>(`/university/events`, {
      body: newEvent,
    });
    return response;
  }
  return {
    getEvents,
    createEvent,
  }
}