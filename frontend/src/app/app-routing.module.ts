import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AudiosComponent } from './components/audios/audios.component';
import { DetailsComponent } from './components/details/details.component';

const routes: Routes = [
  {
    path:"",
    component: AudiosComponent
  },
  {
    path:"details/:id",
    component: DetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
