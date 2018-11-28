import { Component, OnInit } from '@angular/core';

import { AudioService } from '../../services/audio.service';
import { NgForm } from '@angular/forms';
import { Audio } from 'src/app/models/audio';

declare var M: any;

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.css']
})
export class AudioComponent implements OnInit {

  constructor(private audioService: AudioService) { }

  ngOnInit() {
    this.getAll();
  }

  add(form: NgForm) {
    if (form.value._id != "" && form.value._id != null) {
      this.audioService.put(form.value).subscribe(res => {
        this.getAll();
        this.reset(form);
        M.toast({ html: "Successfuly updated" });
      });
    }
    else {
      this.audioService.post(form.value).subscribe(res => {
        this.getAll();
        this.reset(form);
        M.toast({ html: "Successfuly saved" });
      });
    }
  }

  delete(_id: String) {
    if (confirm("Are you sure you want to delete it")) {
      this.audioService.delete(_id).subscribe(res => {
        this.getAll();
        M.toast({ html: "Successfuly deleted" });
      });
    }
  }

  getAll() {
    this.audioService.getAll().subscribe(res => {
      this.audioService.audios = res as Audio[];
    });
  }

  edit(audio: Audio) {
    this.audioService.selected = audio;
  }

  reset(form: NgForm) {
    if (form) {
      form.reset();
      this.audioService.selected = new Audio();
    }

  }

}