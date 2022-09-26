import { ImageCarouselModel } from './image-carousel.model';

export class FutureEventsModel extends ImageCarouselModel {
  id: number;
  imageId: number;
  name: string;
  lattitude: number;
  longitude: number;
  address: string;
  zipCode: string;
  date: string;
  timeSlot: string;
}
