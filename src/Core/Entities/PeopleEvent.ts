export default interface PeopleEvent {
  id: number;
  name: string;
  time: Date;
  duration: string;
  place: string;
  image?: string;
}