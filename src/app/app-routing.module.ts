import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListItemComponent } from './list/list-item/list-item.component';
import { ListComponent } from './list/list/list.component';


const routes: Routes = [
  {path: 'add-item', component: ListItemComponent},
  {path: 'item-list', component: ListComponent},
  {path: 'edit/:itemId', component: ListItemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
