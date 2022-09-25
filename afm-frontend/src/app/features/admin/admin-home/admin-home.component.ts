import { Component, OnInit } from '@angular/core';
import { ImageCarouselModel } from 'src/app/shared/models/image-carousel.model';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent implements OnInit {
  test: ImageCarouselModel[] = [];

  constructor() {}

  ngOnInit(): void {
    this.test = [
      {
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

  buttonClicked() {
    // Action of what needs to be done after button click can be added here
  }
}
