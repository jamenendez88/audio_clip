import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  /**
   * Later use online API REST ur
   * l
   */
  readonly url = "http://localhost:3000/api/audioclips";

  getAudios(){
  return this.http.get(this.url);
  }

  getAudioById(audioId){
    return this.http.get(this.url+`/${audioId}`);
  }
}
