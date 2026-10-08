import { Service } from '@angular/core';
import type { TaskModel } from '../task/task.model';

@Service()
export class Todo {

    tasks: TaskModel[] = [];

    getTasks(): TaskModel[] {
        return this.tasks;
    }

    addTask(task: TaskModel){
        this.tasks.push(task);
    }

    deleteTask(taskId: number){
        this.tasks = this.tasks.filter(task => task.id !== taskId);
    }
}
