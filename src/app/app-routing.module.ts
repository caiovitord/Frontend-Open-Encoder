import { UserStepsComponent } from './user-steps/user-steps.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UniqueLinkPlayerComponent } from './unique-link-player/unique-link-player.component';


const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "steps", component: UserStepsComponent},
  {path: "video/:id", component: UniqueLinkPlayerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
