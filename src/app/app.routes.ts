import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { AddTaskComponent } from './components/add-task/add-task.component';


export const routes: Routes = [
  { path: 'add', component: AddTaskComponent },
  { path: 'task', component: TaskListComponent },
  { path: 'task/:id', component: TaskDetailComponent },
  { path: '',   redirectTo: '/add', pathMatch: 'full' }
  ];
