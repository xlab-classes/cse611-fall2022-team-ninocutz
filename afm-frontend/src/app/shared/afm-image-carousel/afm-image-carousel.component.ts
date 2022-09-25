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
  @Output() imageClick = new EventEmitter();

  getScreenWidth: any;
  noOfImages: number;

  constructor() {}

  ngOnInit(): void {
    this.setNoOfImages(window.innerWidth);
  }

  setNoOfImages(windowSize: number) {
    this.noOfImages = windowSize <= 480 ? 1 : 4;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.setNoOfImages(window.innerWidth);
  }

  imageClicked(image: ImageCarouselModel) {
    this.imageClick.emit(image);
  }
}
