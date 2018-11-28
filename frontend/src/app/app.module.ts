import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
/* import { ToastrModule } from 'ngx-toastr'; */

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule} from '@angular/material';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { DataTableComponent } from './components/data-table/data-table.component';
import { AudioComponent } from './components/audio/audio.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    DataTableComponent,
    AudioComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    FormsModule
    /* ,
    ToastrModule */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
