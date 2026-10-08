import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { TaskForm } from '../task/task.form';
import { TaskModel } from '../task/task.model';
import { Todo } from '../service/todo.service';
import { TaskPriority, TaskStatus } from '../enums';
import { SelectListItem } from '../shared/models/selectListItem';

declare var bootstrap: any;

@Component({
  imports: [
    ReactiveFormsModule
  ],
  selector: 'app-task',
  styleUrl: './task.css',
  templateUrl: './task.html',
})
export class Task {

  form: TaskForm;
  taskPriority: SelectListItem[] = Object.values(TaskPriority).map((value) => ({
    value,
    text: value,
  }));
  taskStatus: SelectListItem[] = Object.values(TaskStatus).map((value) => ({
    value,
    text: value,
  }));

  constructor(private fb: FormBuilder, private todoService: Todo) {
    this.form = new TaskForm(this.fb);
  }

  ngOnInit() {
    this.form.setData({
      id: 0,
      task: '',
      description: '',
      priority: TaskPriority.Low,
      status: TaskStatus.New,
      dueDate: new Date()
    } as TaskModel);
  }

  save() {
    if(this.form.valid) {
      const taskData = this.getFormData();
      this.todoService.addTask(taskData);

      const modalElement = document.getElementById('addTaskModal');
      if (modalElement) {
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide();
      }

      this.form.reset();}
    else {
      this.form.markAllAsTouched();
    }
  }

  cancel() {
    this.form.reset();
  }

  getFormData(): TaskModel{
    const data = this.form.getRawValue();

    return {
      id: 0,
      task: data.task ?? '',
      description: data.description ?? '',
      priority: data.priority ?? 0,
      status: data.status ?? 0,
      dueDate: data.dueDate
        ? this.toDate(data.dueDate)
        : new Date()
    } as TaskModel;
  }

  private toDate(date: string): Date {
    const [year, month, day] = date.split('-').map(Number);
    return new Date(year, month - 1, day);
  }
}
