import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharingService {
  private data: any = undefined;

  setData(data: any) {
    this.data = data;
  }

  getData(): any {
    const tempData = this.data;
    this.removeData();
    return tempData;
  }

  removeData() {
    this.data = undefined;
  }
}
