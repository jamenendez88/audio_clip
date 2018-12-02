import { Component, OnInit } from '@angular/core';
import { AudioService } from 'src/app/services/audio.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  audio$: Object;

  constructor(private data: AudioService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => { this.audio$ = params.id });
  }

  ngOnInit() {
    this.data.getOne(this.audio$).subscribe(
      data => {
        this.audio$ = data
      }
    )
  }

}
