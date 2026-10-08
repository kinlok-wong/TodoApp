import { Component } from '@angular/core';
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

  tasks: TaskModel[] = [];

  constructor(private todoService: Todo, private todoWebApiService: TodoWebApi) { }

  ngOnInit() {
    this.todoWebApiService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  deleteTask(taskId: number) {
    this.todoWebApiService.deleteTask(taskId).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
    });
  }
}
