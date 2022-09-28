import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setLocalStorage(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getLocalStorage(key: string) {
    let data = localStorage.getItem(key);
    return data ? JSON.parse(data) : undefined;
  }

  removeLocalStorage(key: string) {
    localStorage.removeItem(key);
  }
}
