import { HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../task/tutorial.model';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [HttpClientModule, NgFor, NgIf],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  constructor(private taskService: TaskService) { }
  ngOnInit(): void {
    this.getAll();
  }

  @ViewChild('closebutton') closebutton: ElementRef | undefined;

  tasks: Task[] = [];
  taskTodelete: number = 0;

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

  showDialog(id: number) {
    this.taskTodelete = id;
  }

}
