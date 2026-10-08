import { Component, signal } from '@angular/core';
import { TaskList } from './task-list/task-list';

@Component({
  imports: [
    TaskList
  ],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('todo-app');
}
