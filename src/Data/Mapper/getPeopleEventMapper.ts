import PeopleEvent from "../../Core/Entities/PeopleEvent";
import { GetPeopleEventApi } from "../../Core/Entities/Service/Read/GetPeopleEvents";

export default function getPeopleEventMapper(response: GetPeopleEventApi): PeopleEvent {
  /**
   * 
   * @param dateString YYYY/MM/DD
   * @param timeString hh:mmPM
   */
  function getDateFromString(dateString: string, timeString: string): Date {
    const [year, month, day] = dateString.split("/").map(val => +val);
    let hour = +timeString.slice(0,2);
    const minute = +timeString.slice(3,5);
    const ampm = timeString.slice(5,7);
    if (ampm.toUpperCase() === "PM") {
      hour += 12;
    }
    return new Date(year, month + 1, day, hour, minute)
  }
  return {
    id: response.id,
    name: response.message,
    place: response.place,
    time: getDateFromString(response.date, response.time),
    image: '/images/event-covers/Robocup.png'
  }
}