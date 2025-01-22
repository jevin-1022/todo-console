import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPageComponent } from './list-page/list-page.component';
import { CreateTaskComponent } from './create-task/create-task.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'todo-list',
    pathMatch: 'full',
  },
  {
    path: 'todo-list',
    component: ListPageComponent,
  },
  {
    path: 'task/:taskId',
    component: CreateTaskComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
