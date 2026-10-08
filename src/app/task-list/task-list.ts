import { Component, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Todo } from '../service/todo.service';
import { TaskModel } from '../task/task.model';
import { Task } from '../task/task';
import { TodoWebApi } from '../service/todoWebApi.service';

@Component({
  imports: [
    DatePipe,
    Task
  ],
  selector: 'app-task-list',
  styleUrl: './task-list.css',
  templateUrl: './task-list.html',
})
export class TaskList {

  tasks = signal<TaskModel[]>([]);
  errorMessage: string = '';

  constructor(private todoService: Todo, private todoWebApiService: TodoWebApi) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.todoWebApiService.getTasks().subscribe({
      next: response => {
        if (response.success) {
          this.tasks.set(response.tasks);
          this.errorMessage = '';
        } else {
          this.errorMessage = response.message || 'Unable to load tasks.';
        }
      },
      error: error => {
        this.errorMessage = error.message || 'An error occurred while loading tasks.';
      },
    });
  }

  deleteTask(taskId: number) {
    this.todoWebApiService.deleteTask(taskId).subscribe(() => {
      this.tasks.update(tasks => tasks.filter(task => task.id !== taskId));
    });
  }
}
