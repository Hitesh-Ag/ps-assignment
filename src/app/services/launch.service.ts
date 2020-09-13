import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class LaunchService {

  constructor(
    private http: HttpClient
  ) { }


  /**
   * @description for getting launch data
   * @param url url for getting launch data according to condition
   */
  allLaunchAPI(url) {
    return this.http.get(url);
  }
}
