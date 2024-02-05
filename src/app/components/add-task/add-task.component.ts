import { FormsModule } from '@angular/forms';
import { Task } from '../../task/tutorial.model';
import { TaskService } from './../../services/task.service';
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {

  task: Task = {
    description : '',
    name: '',
    priority: '',
  }

  submitted = false;

  constructor(private taskService: TaskService) {}

  saveTask(): void {
    const data = {
      name: this.task.name,
      description: this.task.description,
      priority: this.task.priority,
    };

    this.taskService.add(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newTask(): void {
    this.submitted = false;
    this.task = {
      name: '',
      description: '',
      priority: ''
    };
  }

}
