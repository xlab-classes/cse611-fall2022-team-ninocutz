import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {
  private data: string = '';

  setConfirmation(data: string) {
    this.data = data;
  }

  checkConfirmation(): string {
    const tempData = this.data;
    this.removeData();
    return tempData;
  }

  removeData() {
    this.data = '';
  }
}
