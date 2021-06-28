import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fitknn } from '../models/fitknn';
import { Parameters } from '../models/parameters';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private readonly url: string = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  postTraining(body: Parameters): Observable<Fitknn> {
    return this.http.post<Fitknn>(this.url + 'api/training', body);
  }
}
