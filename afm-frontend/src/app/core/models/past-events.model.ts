import { ImageCarouselModel } from './image-carousel.model';

export class PastEventsModel extends ImageCarouselModel {
  Name: string;
  Address: string;
  EventDate: string;
  EventTimeSlot: string;
  Latitude: string;
  Longitude: string;
  Zipcode: string;
}
