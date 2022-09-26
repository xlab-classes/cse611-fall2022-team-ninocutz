import { Component, OnInit } from '@angular/core';
import { ImageCarouselModel } from 'src/app/core/models/image-carousel.model';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { DataService } from 'src/app/core/services/data.service';
import { FutureEventsModel } from 'src/app/core/models/future-events.model';
import { PastEventsModel } from 'src/app/core/models/past-events.model';
import { GalleryImagesModel } from 'src/app/core/models/gallery-images.model';
import { SharingService } from 'src/app/core/services/sharing.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent implements OnInit {
  test: ImageCarouselModel[] = [];
  faEdit = faEdit;
  faTrash = faTrash;

  futureEvents: FutureEventsModel[] = [];
  pastEvents: PastEventsModel[] = [];
  galleryImages: GalleryImagesModel[] = [];

  constructor(
    private router: Router,
    private dateService: DataService,
    private sharingService: SharingService
  ) {}

  ngOnInit(): void {
    this.retrieveFutureEventsData();
    this.retrievePastEventsData();
    this.retrieveGalleryData();
  }

  retrieveFutureEventsData() {
    this.dateService.getAllFutureEvents().subscribe((data) => {
      setTimeout(() => {
        this.futureEvents = data;
      }, 1000);
    });
  }

  retrievePastEventsData() {
    this.dateService.getAllPastEvents().subscribe((data) => {
      setTimeout(() => {
        this.pastEvents = data;
      }, 1000);
    });
  }

  retrieveGalleryData() {
    this.dateService.getAllGalleryImages().subscribe((data) => {
      setTimeout(() => {
        this.galleryImages = data;
      }, 1000);
    });
  }

  shareLocationButtonClick() {
    this.router.navigate(['/admin/current-event']);
  }

  openFutureEventsPage() {
    this.sharingService.setData(this.futureEvents);
    this.router.navigate(['/admin/future-events']);
  }

  openPastEventsPage() {
    this.router.navigate(['/admin/past-events']);
  }

  openGalleryPage() {
    this.router.navigate(['/admin/gallery']);
  }

  futureEventClicked(event: ImageCarouselModel) {}

  pastEventClicked(event: ImageCarouselModel) {}
}
