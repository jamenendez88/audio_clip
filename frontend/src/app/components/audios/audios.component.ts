import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-audios',
  templateUrl: './audios.component.html',
  styleUrls: ['./audios.component.scss']
})
export class AudiosComponent implements OnInit {

  audios$: Object;
  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getAudios().subscribe(
      data => this.audios$ = data
    );
  }

}
