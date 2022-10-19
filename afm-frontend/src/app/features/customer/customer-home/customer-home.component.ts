import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CurrentEventModel } from 'src/app/core/models/current-event.model';
import { FutureEventsModel } from 'src/app/core/models/future-events.model';
import { GalleryImagesModel } from 'src/app/core/models/gallery-images.model';
import { PastEventsModel } from 'src/app/core/models/past-events.model';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.scss'],
  providers: [MessageService],
})
export class CustomerHomeComponent implements OnInit {
  @ViewChild('parentContainer') container: ElementRef<HTMLElement>;
  currentEvent: CurrentEventModel | undefined;
  images: GalleryImagesModel[] = [];
  pastEvents: PastEventsModel[] = [];
  futureEvents: FutureEventsModel[] = [];
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];

  constructor(
    private dataService: DataService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCurrentLocationOfRv();
    this.getFutureEvents();
    this.getPastEvents();
    this.getGalleryImages();
  }

  ngAfterViewInit(): void {
    this.activeRoute.params.subscribe((param) => {
      // alert(param.pageSec)
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
      this.images = data.images;
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
}
