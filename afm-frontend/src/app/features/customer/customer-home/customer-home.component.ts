import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CurrentEventModel } from 'src/app/core/models/current-event.model';
import { GalleryImagesModel } from 'src/app/core/models/gallery-images.model';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.scss'],
  providers: [MessageService],
})
export class CustomerHomeComponent implements OnInit {
  currentEvent: CurrentEventModel | undefined;
  images: GalleryImagesModel[];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getCurrentLocationOfRv();
    this.getGalleryImages();
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
}
