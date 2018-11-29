import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { AudioService } from 'src/app/services/audio.service';
import { AudioComponent } from 'src/app/components/audio/audio.component';
import { Audio } from 'src/app/models/audio';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-audio-list',
  templateUrl: './audio-list.component.html',
  styleUrls: ['./audio-list.component.css']
})
export class AudioListComponent implements OnInit {

  constructor(private service: AudioService,
    private dialog: MatDialog,
    private notificationService: NotificationService) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['bitrate', 'contentSize', 'contentURI', 'duration', 'encodingFormat', 'label', 'uploadDate', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
    this.service.getAll().subscribe(list => {
      this.service.audios = list as Audio[];
      let array = this.service.audios.map(item => {
        return {
          _id: item._id,
          bitrate: item.bitrate,
          contentSize: item.contentSize,
          contentURI: item.contentURI,
          duration: item.duration,
          encodingFormat: item.encodingFormat,
          label: item.label,
          uploadDate: item.uploadDate
        }
      });
      this.listData = new MatTableDataSource(array);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    });
    /*  this.getAll(); */
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AudioComponent, dialogConfig);
    /*  this.getAll(); */
  }

  onEdit(row) {
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AudioComponent, dialogConfig);
    /* this.getAll(); */
  }

  onDelete(id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.service.delete(id);
      /* this.getAll(); */
     /*  this.notificationService.warn('! Deleted successfully'); */
    }
  }

  getAll() {
    this.service.getAll().subscribe(res => {
      this.service.audios = res as Audio[];
      let inner_array = this.service.audios.map(item => {
        return {
          _id: item._id,
          bitrate: item.bitrate,
          contentSize: item.contentSize,
          contentURI: item.contentURI,
          duration: item.duration,
          encodingFormat: item.encodingFormat,
          label: item.label,
          uploadDate: item.uploadDate
        }
      });
      this.listData = new MatTableDataSource(inner_array);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      this.listData.filterPredicate = (data, filter) => {
        return this.displayedColumns.some(ele => {
          return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
        });
      };
    });
  }
}
