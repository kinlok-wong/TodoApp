import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { TaskPriority } from '../enums/taskPriority';
import { TaskStatus } from '../enums/taskStatus';
import { TaskModel } from './task.model';

function toDateInputValue(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export class TaskForm  extends FormGroup<TaskFormGroup>{

    constructor(private fb: FormBuilder) {
        const form = fb.nonNullable.group<TaskFormGroup>({
            id: fb.control<number | null>(null),
            task: fb.control<string | null>(null, Validators.required),
            description: fb.control<string | null>(null, Validators.required),
            priority: fb.control<TaskPriority | null>(null, Validators.required),
            status: fb.control<TaskStatus | null>(null, Validators.required),
            dueDate: fb.control<string | null>(toDateInputValue(new Date()), Validators.required)
        });
        super(form.controls);
    }

    setData(data: TaskModel) {
        this.patchValue({
            id: data.id,
            task: data.task,
            description: data.description,
            priority: data.priority,
            status: data.status,
            dueDate: toDateInputValue(data.dueDate)
        });
    }
}

type TaskFormGroup = {
    id: FormControl<number | null>;
    task: FormControl<string | null>;
    description: FormControl<string | null>;
    priority: FormControl<TaskPriority | null>;
    status: FormControl<TaskStatus | null>;
    dueDate: FormControl<string | null>;
}