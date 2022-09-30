import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {
  private data: boolean = false;

  setConfirmation(data: boolean) {
    this.data = data;
  }

  checkConfirmation(): boolean {
    const tempData = this.data;
    this.removeData();
    return tempData;
  }

  removeData() {
    this.data = false;
  }
}
