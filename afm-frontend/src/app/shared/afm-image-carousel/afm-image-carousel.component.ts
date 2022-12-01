import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ImageCarouselModel } from '../../core/models/image-carousel.model';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-afm-image-carousel',
  templateUrl: './afm-image-carousel.component.html',
  styleUrls: ['./afm-image-carousel.component.scss'],
})
export class AfmImageCarouselComponent implements OnInit {
  @Input() data: ImageCarouselModel[];
  @Input() displayIcon = false;
  @Input() faIcon = faEdit;
  @Input() divId = 'div-id';
  @Output() imageClick = new EventEmitter();

  getScreenWidth: any;
  noOfImages: number;
  imageWidth = '250';

  constructor() {}

  ngOnInit(): void {
    this.setNoOfImages(window.innerWidth);
  }

  setNoOfImages(windowSize: number) {
    this.noOfImages =
      windowSize <= 635
        ? 1
        : windowSize <= 900
        ? 2
        : windowSize <= 1230
        ? 3
        : windowSize <= 1441
        ? 4
        : 5;

    this.imageWidth = windowSize < 370 ? '150' : '250';
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.setNoOfImages(window.innerWidth);
  }

  imageClicked(image: ImageCarouselModel) {
    this.imageClick.emit(image);
  }

  getDivId(item: ImageCarouselModel): string {
    return this.divId + '-' + this.data.indexOf(item);
  }
}
