import { TaskStatus } from "../enums/taskStatus";
import { TaskPriority } from "../enums/taskPriority";

export interface TaskModel {
    id: number;
    task: string;
    description: string;
    priority: TaskPriority;
    status: TaskStatus;
    dueDate: Date;
}

export interface TaskResponse extends BaseResponse {
    tasks: TaskModel[];
}

export interface BaseResponse {
    success: boolean;
    message: string;
}