import { Component, OnInit } from '@angular/core';
import { ImageCarouselModel } from 'src/app/core/models/image-carousel.model';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { DataService } from 'src/app/core/services/data.service';
import { FutureEventsModel } from 'src/app/core/models/future-events.model';
import { PastEventsModel } from 'src/app/core/models/past-events.model';
import { GalleryImagesModel } from 'src/app/core/models/gallery-images.model';
import { SharingService } from 'src/app/core/services/sharing.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
  providers: [MessageService],
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
    private dataService: DataService,
    private sharingService: SharingService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.retrieveFutureEventsData();
    this.retrievePastEventsData();
    this.retrieveGalleryData();
  }

  retrieveFutureEventsData() {
    this.dataService.getAllFutureEvents().subscribe((data) => {
      this.futureEvents = data.events;
    });
  }

  retrievePastEventsData() {
    this.dataService.getAllPastEvents().subscribe((data) => {
      this.pastEvents = data.events;
    });
  }

  retrieveGalleryData() {
    this.dataService.getAllGalleryImages().subscribe((data) => {
      this.galleryImages = data.images;
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

  futureEventClicked(event: ImageCarouselModel) {
    this.sharingService.setData(event);
    this.router.navigate(['/admin/edit-future-event']);
  }

  pastEventClicked(event: ImageCarouselModel) {
    this.sharingService.setData(event);
    this.router.navigate(['/admin/edit-past-event']);
  }

  deleteGalleryImage(event: ImageCarouselModel) {
    this.dataService.deleteGalleryImage(event.Id).subscribe((data) => {
      this.showDeleteSuccess();
      this.retrieveGalleryData();
    });
  }

  showDeleteSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Deleted Image',
    });
  }
}
