import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CurrentEventModel } from 'src/app/core/models/current-event.model';
import { FutureEventsModel } from 'src/app/core/models/future-events.model';
import { GalleryImagesModel } from 'src/app/core/models/gallery-images.model';
import { PastEventsModel } from 'src/app/core/models/past-events.model';
import { DataService } from 'src/app/core/services/data.service';
import SwiperCore, { Keyboard, Pagination, Navigation, Autoplay } from 'swiper';
import { CustomerFutureEventComponent } from '../customer-future-event/customer-future-event.component';
import { CustomerPastEventComponent } from '../customer-past-event/customer-past-event.component';

SwiperCore.use([Keyboard, Pagination, Navigation, Autoplay]);
@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.scss'],
  providers: [MessageService, DialogService],
  encapsulation: ViewEncapsulation.None,
})
export class CustomerHomeComponent implements OnInit {
  @ViewChild('parentContainer') container: ElementRef<HTMLElement>;
  currentEvent: CurrentEventModel | undefined;
  galleryImages: GalleryImagesModel[] = [];
  pastEvents: PastEventsModel[] = [];
  futureEvents: FutureEventsModel[] = [];
  imageHeight = '500px';

  constructor(
    private dataService: DataService,
    private activeRoute: ActivatedRoute,
    public dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.setHeightOfGalleryImages(window.innerWidth);
    this.getCurrentLocationOfRv();
    this.getFutureEvents();
    this.getPastEvents();
    this.getGalleryImages();
  }

  ngAfterViewInit(): void {
    this.activeRoute.params.subscribe((param) => {
      if (param['pageSec']) {
        const section = this.container.nativeElement.querySelector(
          `#${param['pageSec']}`
        );
        console.log(section);

        section?.scrollIntoView();
      }
    });
  }

  getCurrentLocationOfRv() {
    this.dataService.getCurrentLocation().subscribe((data) => {
      this.currentEvent = data.events ? data.events[0] : undefined;
    });
  }

  bookNowClicked() {
    window.open(
      'https://square.site/book/1G35M2ZHB258R/architect-for-men-buffalo-ny'
    );
  }

  getGalleryImages() {
    this.dataService.getAllGalleryImages().subscribe((data) => {
      this.galleryImages = data.images;
    });
  }

  getPastEvents() {
    this.dataService.getAllPastEvents().subscribe((data) => {
      this.pastEvents = data.events;
    });
  }

  getFutureEvents() {
    this.dataService.getAllFutureEvents().subscribe((data) => {
      this.futureEvents = data.events;
    });
  }

  futureEventClicked(event: FutureEventsModel) {
    const ref = this.dialogService.open(CustomerFutureEventComponent, {
      header: 'Future Event',
      width: '80%',
      style: {
        maxWidth: '700px',
      },
      data: {
        event: event,
      },
    });
  }

  pastEventClicked(event: PastEventsModel) {
    const ref = this.dialogService.open(CustomerPastEventComponent, {
      header: 'Past Event',
      width: '80%',
      style: {
        maxWidth: '700px',
      },
      data: {
        event: event,
      },
    });
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.setHeightOfGalleryImages(window.innerWidth);
  }

  setHeightOfGalleryImages(windowSize: number) {
    this.imageHeight =
      windowSize <= 320 ? '200px' : windowSize <= 425 ? '300px' : '500px';
  }
}
