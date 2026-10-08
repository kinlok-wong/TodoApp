import { Component, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TaskModel } from '../task/task.model';
import { Task } from '../task/task';
import { TodoWebApi } from '../service/todoWebApi.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

@Component({
  imports: [
    DatePipe,
    Task,
    NgxSpinnerModule,
  ],
  selector: 'app-task-list',
  styleUrl: './task-list.css',
  templateUrl: './task-list.html',
})
export class TaskList {

  tasks = signal<TaskModel[]>([]);
  errorMessage: string = '';

  constructor(private todoWebApiService: TodoWebApi, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.spinner.show();
    this.todoWebApiService.getTasks().pipe(
      finalize(() => this.spinner.hide())
    ).subscribe({
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
      }
    });
  }

  onDeleteClick(taskId: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.deleteTask(taskId);
    }
  }

  deleteTask(taskId: number) {
    this.spinner.show();
    this.todoWebApiService.deleteTask(taskId).pipe(
      finalize(() => this.spinner.hide())
    ).subscribe(() => {
      this.tasks.update(tasks => tasks.filter(task => task.id !== taskId));
    });
  }
}
