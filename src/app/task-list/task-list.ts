import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Todo } from '../service/todo.service';
import { TaskModel } from '../task/task.model';
import { Task } from '../task/task'

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

  tasks: TaskModel[] = [];

  constructor(private todoService: Todo) { }

  ngOnInit() {
    const tasks = this.todoService.GetTasks();
    this.tasks = tasks;
  }

  DeleteTask(taskId: number) {
    this.todoService.DeleteTask(taskId);
    this.tasks = this.todoService.GetTasks();
  }
}
