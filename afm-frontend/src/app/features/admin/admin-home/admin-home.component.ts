import { Component, OnInit } from '@angular/core';
import { ImageCarouselModel } from 'src/app/shared/models/image-carousel.model';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent implements OnInit {
  test: ImageCarouselModel[] = [];
  faEdit = faEdit;
  faTrash = faTrash;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.test = [
      {
        src: '/assets/20220414_130358.jpg',
        name: 'first',
        text: 'First Image',
      },
      {
        src: '/assets/20220414_130452.jpg',
        name: 'Second',
        text: 'Second Image',
      },
      {
        src: '/assets/20220722_185050.jpg',
        name: 'Third',
        text: 'Third Image',
      },
      {
        src: '/assets/20220722_185054.jpg',
        name: 'Fourth',
        text: 'Fourth Image',
      },
    ];
  }

  shareLocationButtonClick() {
    this.router.navigate(['/admin/current-event']);
  }

  openFutureEventsPage() {
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
