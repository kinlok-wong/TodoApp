import { Injectable } from '@angular/core';
import type { TaskModel, TaskResponse } from '../task/task.model';
import type { BaseResponse } from '../shared/models/baseResponse';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TodoWebApi {

    readonly baseUrl: string = `${environment.apiUrl}/TodoApp`;
    private readonly headers = new HttpHeaders({
        'x-api-key': environment.apiKey,
    });

    constructor(private http: HttpClient) {}

    getTasks(): Observable<TaskResponse> {
        return this.http.get<TaskResponse>(`${this.baseUrl}/GetAllTasks`, { headers: this.headers });
    }

    addTask(task: TaskModel): Observable<BaseResponse> {
        return this.http.post<BaseResponse>(`${this.baseUrl}/AddTask`, task, { headers: this.headers });
    }

    deleteTask(taskId: number){
        return this.http.post(`${this.baseUrl}/DeleteTask`, { id: taskId }, { headers: this.headers });
    }
}
