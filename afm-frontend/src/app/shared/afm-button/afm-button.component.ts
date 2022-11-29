import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-afm-button',
  templateUrl: './afm-button.component.html',
  styleUrls: ['./afm-button.component.scss'],
})
export class AfmButtonComponent implements OnInit {
  @Input() disable = false;
  @Input() label: string;
  @Output() buttonClicked = new EventEmitter();
  constructor() {} 

  ngOnInit(): void {}

  buttonClick() {
    this.buttonClicked.emit();
  }
}
