import { ImageCarouselModel } from './image-carousel.model';

export class FutureEventsModel extends ImageCarouselModel {
  Id: number;
  Name: string;
  EventType: string;
  Address: string;
  EventDate: string;
  EventTimeSlot: string;
  Latitude: string;
  Longitude: string;
  Zipcode: string;
}
