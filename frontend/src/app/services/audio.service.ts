import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Audio } from '../models/audio';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  readonly URL_API = 'http://localhost:3000/api/audioClips';
  selected: Audio;
  audios: Audio[];

  form: FormGroup = new FormGroup({
    _id: new FormControl(null),
    bitrate: new FormControl(''/* , Validators.required */),
    contentSize: new FormControl(''),
    contentURI: new FormControl('', Validators.required),
    /* location: { X: { type: Number }, Y: { type: Number } }, */
    encodingFormat: new FormControl('', Validators.required),
    uploadDate: new FormControl('', Validators.required),
    duration: new FormControl('', Validators.required),
    label: new FormControl('', Validators.required),
  });

  initializeFormGroup() {
    this.form.setValue({
      _id: null,
      bitrate: 0,
      contentSize: 0,
      contentURI: 'https://www.google.com.mx',
      encodingFormat: 'mp4',
      uploadDate: '',
      duration: 0,
      label: 'angular fire database',
    });
  }

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

  populateForm(audio) {
    this.form.setValue(audio);
  }
}