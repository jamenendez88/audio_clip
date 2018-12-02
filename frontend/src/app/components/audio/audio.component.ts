import { Component, OnInit } from '@angular/core';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import * as RecordRTC from 'recordrtc';
import { DomSanitizer } from '@angular/platform-browser';
import { AudioService } from '../../services/audio.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.css'],
  providers: [AudioService]
})

export class AudioComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({ url: 'http://localhost:3000/api/audioClips', itemAlias: 'audio' });
  attachments: any = [];

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('FileUpload:uploaded:', item, status, response);
      this.attachments.push(JSON.parse(response));
      console.log(this.attachments);
      alert('File uploaded successfully');
    };
  }

  private record;
  //Will use this flag for detect recording
  private recording = false;
  //Url of Blob
  private url;
  private error;
  constructor(private domSanitizer: DomSanitizer, private audioService: AudioService) { }

  
  download(index) {
    var filename = this.attachments[index].uploadname;

    this.audioService.downloadFile(filename)
      .subscribe(
        data => saveAs(data, filename),
        error => console.error(error)
      );
  }

  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }
  /**
   * Start recording.
   */
  initiateRecording() {

    this.recording = true;
    let mediaConstraints = {
      video: false,
      audio: true
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }
  /**
   * Will be called automatically.
   */
  successCallback(stream) {
    var options = {
      mimeType: "audio/wav",
      numberOfAudioChannels: 1
    };
    //Start Actuall Recording
    var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    this.record.record();
  }
  /**
   * Stop recording.
   */
  stopRecording() {
    this.recording = false;
    this.record.stop(this.processRecording.bind(this));
  }
  /**
   * processRecording Do what ever you want with blob
   * @param  {any} blob Blog
   */
  processRecording(blob) {
    this.url = URL.createObjectURL(blob);
  }
  /**
   * Process Error.
   */
  errorCallback(error) {
    this.error = 'Can not play audio in your browser';
  }
}
