import PeopleEvent from "../../Core/Entities/PeopleEvent";
import { GetPeopleEventsResponse } from "../../Core/Entities/Service/Read/GetPeopleEvents";
import dayjs from 'dayjs';

export default function getPeopleEventMapper(response: GetPeopleEventsResponse): PeopleEvent {
  /**
   * 
   * @param dateString YYYY/MM/DD
   * @param timeString hh:mmPM
   */
  function getDateFromString(dateString: string): Date {
    return dayjs(dateString, 'YYYY-MM-DD HH:mma').toDate();
  }
  return {
    id: response.id,
    name: response.message,
    place: response.place,
    time: getDateFromString(response.date),
    duration: response.time,
    image: `/images/event-covers/${(response.title || response.interest || '').toLowerCase()}.png`,
    group: response.title,
    interest: response.interest,
  }
}