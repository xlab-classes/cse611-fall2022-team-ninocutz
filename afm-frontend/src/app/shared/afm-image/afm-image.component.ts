import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-afm-image',
  templateUrl: './afm-image.component.html',
  styleUrls: ['./afm-image.component.scss'],
})
export class AfmImageComponent implements OnInit {
  @Input() src: string;

  constructor() {}

  ngOnInit(): void {}
}
