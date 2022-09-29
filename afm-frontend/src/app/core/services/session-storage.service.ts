import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  constructor() {}

  setSessionStorage(key: string, data: any) {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  getSessionStorage(key: string) {
    let data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : undefined;
  }

  removeSessionStorage(key: string) {
    sessionStorage.removeItem(key);
  }
}
