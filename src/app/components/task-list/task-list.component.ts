import { HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../task/tutorial.model';
import { NgFor, NgIf } from '@angular/common';
import { TaskDetailComponent } from '../task-detail/task-detail.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [HttpClientModule, NgFor, NgIf, TaskDetailComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  constructor(private taskService: TaskService) { }
  ngOnInit(): void {
    this.getAll();
  }

  @ViewChild('closebutton') closebutton: ElementRef | undefined;

  @Component({
    selector: 'app-task-detail',
  })

  tasks: Task[] = [];
  taskTodelete: number = 0;
  taskToUpdate :Task = {};

  getAll() {
    this.taskService.getAll().subscribe({
      next: (res) => {
        this.tasks = res;
        console.log(res);
      },
      error: (e) => console.error(e)
    });
  }

  deleteTask(isDelete: boolean) {
    if (isDelete && this.taskTodelete > 0) {
      this.taskService.delete(this.taskTodelete).subscribe({
        next: (res) => {
          console.log(res);
          this.closebutton?.nativeElement.click();
          this.getAll();
        },
        error: (e) => console.error(e)
      });
    }
  }

  trackById(index: number, task: Task) { // 👈
    return task.id;
  }

  showDialog(id: number) {
    this.taskTodelete = id;
  }

  viewTask(id:number){
    this.taskService.getById(id).subscribe({
      next: (res) => {
        console.log(res);
        this.taskToUpdate = res;
      },
      error: (e) => console.error(e)
    });
  }


}
