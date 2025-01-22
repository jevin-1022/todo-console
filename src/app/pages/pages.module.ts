import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { ListPageComponent } from './list-page/list-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListPageComponent, NavbarComponent, CreateTaskComponent],
  imports: [CommonModule, PagesRoutingModule, FormsModule, ReactiveFormsModule],
  exports: [],
})
export class PagesModule {}
