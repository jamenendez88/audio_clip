import { Component } from '@angular/core';
/* import { Component, OnInit } from '@angular/core'; */
/* import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
const URL = 'http://localhost:3000/api/audioClips' */;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
 /*  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'audio' }); */

  ngOnInit() {
   /*  this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:', item, status, response);
      alert('File uploaded successfully');
    }; */
  }
}
