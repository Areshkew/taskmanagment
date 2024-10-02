import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTaskComponent } from './CreateTask/create-task.component';
import { ListTasksComponent } from './ListTasks/list-tasks.component';

const routes: Routes = [
  { path: '', component: CreateTaskComponent},
  { path: 'list', component: ListTasksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
