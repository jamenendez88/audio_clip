import { Component, OnInit } from '@angular/core';

import { AudioService } from '../../services/audio.service';
import { NgForm } from '@angular/forms';
import { Audio } from 'src/app/models/audio';

declare var M: any;

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(private audioService: AudioService) { }

  audio$: Audio;

  ngOnInit() {
    this.getAll();
  }

  update(form: NgForm) {
    this.audioService.put(form.value).subscribe(res => {
      this.getAll();
      this.reset(form);
      M.toast({ html: "Successfuly saved" });
    });
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
    console.log(audio);
    this.audioService.selected = audio;
  }

  reset(form: NgForm) {
    if (form) {
      form.reset();
      this.audioService.selected = new Audio();
    }
  }

}
