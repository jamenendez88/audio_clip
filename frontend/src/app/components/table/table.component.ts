import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { AudioService } from 'src/app/services/audio.service';
import { Audio } from 'src/app/models/audio';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = [
    'label', 'bitrate', 'contentURI', 'latitude',
    'longitude', 'encodingFormat', 'uploadDate', 'duration',
  ];
  listData: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchKey: string;

  constructor(private service: AudioService) {
   }

   ngOnInit() {
    this.service.getAll().subscribe(
      list => {
        this.service.audios = list as Audio[];
        let array = this.service.audios.map(item => {
          return {
            _id: item._id,
            bitrate: item.bitrate,
            contentSize: item.contentSize,
            contentURI: item.contentURI,
            latitude: item.latitude,
            longitude: item.longitude,
            encodingFormat: item.encodingFormat,
            uploadDate: item.uploadDate,
            duration: item.duration,
            label: item.label
          }
        });
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      });
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }


}
