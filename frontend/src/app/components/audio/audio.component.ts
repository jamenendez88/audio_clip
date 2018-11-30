import { Component, OnInit } from '@angular/core';

import { AudioService } from '../../services/audio.service';
import { NgForm } from '@angular/forms';
import { Audio } from 'src/app/models/audio';
import { NotificationService } from '../../services/notification.service';
import { MatDialogRef } from '@angular/material';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
const URL = 'http://localhost:3000/api/audioClips';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.css']
})
export class AudioComponent implements OnInit {

  constructor(private service: AudioService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<AudioComponent>) { }

  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'audio' });

  ngOnInit() {
    this.getAll();
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:', item, status, response);
      alert('File uploaded successfully');
    };
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onClose() {
    this.getAll();
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.service.form.valid) {
      if (!this.service.form.get('_id').value) {
        this.service.post(this.service.form.value).subscribe(res => {
          this.notificationService.success(':: Submitted successfully');
          this.onClose();
        });
      }
      else {
        this.service.put(this.service.form.value).subscribe(res => {
          this.onClose();
          this.notificationService.success(':: Submitted successfully');
        });
      }
    }
  }


  /* add(form: NgForm) {
    console.log(form.value);
    if (this.service.form.valid) {
      if (form.value._id != "" && form.value._id != null) {
        this.service.put(form.value).subscribe(res => {
          this.getAll();
        });
      }
      else {
        this.service.post(form.value).subscribe(res => {
          this.getAll();
        });
      }
      this.service.form.reset();
      this.notificationService.success(':: Submitted successfully');
    }
  } */

  delete(_id: String) {
    if (confirm("Are you sure you want to delete it")) {
      this.service.delete(_id).subscribe(res => {
        this.getAll();
        this.notificationService.success(':: Successfully deleted');
      });
    }
  }

  getAll() {
    this.service.getAll().subscribe(res => {
      this.service.audios = res as Audio[];
    });
  }

  edit(audio: Audio) {
    this.service.selected = audio;
  }

  /*  reset(form: NgForm) {
     if (form) {
       form.reset();
       this.service.selected = new Audio();
     }
 
   } */

}