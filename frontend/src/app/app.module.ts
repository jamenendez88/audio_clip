import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MyOwnCustomMaterialModule } from '../app/material.config';
import { FileSelectDirective } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { DetailsComponent } from './components/details/details.component';
import { AudioComponent } from './components/audio/audio.component';
import { TableComponent } from './components/table/table.component';
import { AudioService } from './services/audio.service';
import { MaterialModule } from './material/material.module';

const routes: Routes = [
  {
    path: 'audio',
    component: AudioComponent
  },
  {
    path: 'form',
    component: FormComponent
  }, 
  {
    path: 'table',
    component: TableComponent
  },  
  {
    path: 'details/:id',
    component: DetailsComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    AudioComponent,
    FormComponent,
    FileSelectDirective,
    TableComponent
  ],
  imports: [
    BrowserModule,
    MyOwnCustomMaterialModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MaterialModule
  ],
  providers: [AudioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
