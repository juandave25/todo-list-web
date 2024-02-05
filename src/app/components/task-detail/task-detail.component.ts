import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../task/tutorial.model';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [HttpClientModule, FormsModule, NgIf],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent {

  constructor(private taskService: TaskService) { }

  @Input() selectedTask: Task = {id:0};
  @Input() showForm: boolean | undefined;

  updateTask(){
    const data = {
      id: this.selectedTask.id,
      name: this.selectedTask.name,
      description: this.selectedTask.description,
      priority: this.selectedTask.priority,
      date: this.selectedTask.date,
    };

    this.taskService.update(data, this.selectedTask.id)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.showForm = false;
      },
      error: (e) => console.error(e)
    });
  }



}
