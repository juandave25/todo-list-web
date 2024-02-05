import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../task/tutorial.model';

const baseUrl = 'http://localhost:5000/api/v1/task';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(baseUrl);
  }

  getById(id: any): Observable<Task> {
    return this.http.get<Task>(`${baseUrl}/${id}`);
  }

  add(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(data: any, id: number | undefined): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

}
