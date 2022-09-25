import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-afm-button',
  templateUrl: './afm-button.component.html',
  styleUrls: ['./afm-button.component.scss'],
})
export class AfmButtonComponent implements OnInit {
  @Input() label: string;
  @Output() click = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  buttonClick() {
    this.click.emit();
  }
}
