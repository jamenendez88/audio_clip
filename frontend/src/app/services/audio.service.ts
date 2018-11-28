import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Audio } from '../models/audio';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  readonly URL_API = 'http://localhost:3000/api/audioClips';
  selected: Audio;
  audios: Audio[];

  constructor(private http: HttpClient) {
    this.selected = new Audio();
  }

  getAll() {
    return this.http.get(this.URL_API);
  }

  post(audio: Audio) {
    return this.http.post(this.URL_API, audio);
  }

  put(audio: Audio) {    
    return this.http.put(this.URL_API + `/${audio._id}`, audio);
  }

  delete(_id: String) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}