import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-afm-image',
  templateUrl: './afm-image.component.html',
  styleUrls: ['./afm-image.component.scss'],
})
export class AfmImageComponent implements OnInit {
  @Input() src: string;
  @Input() width = '250';
  @Input() maxWidth = '100%';

  constructor() {}

  ngOnInit(): void {}
}
