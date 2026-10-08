import { Service } from '@angular/core';
import { TaskStatus } from '../enums/taskStatus';
import { TaskPriority } from '../enums/taskPriority';
import type { TaskModel } from '../task/task.model';

@Service()
export class Todo {

    tasks: TaskModel[] = [];

    GetTasks(): TaskModel[] {
        return this.tasks;
    }

    AddTask(task: TaskModel){
        this.tasks.push(task);
    }

    DeleteTask(taskId: number){
        this.tasks = this.tasks.filter(task => task.id !== taskId);
    }
}
