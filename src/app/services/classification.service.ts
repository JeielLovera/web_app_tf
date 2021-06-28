import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClassifyData } from '../models/classify-data';

@Injectable({
  providedIn: 'root'
})
export class ClassificationService {

  private readonly url: string = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  postClassification(body: ClassifyData): Observable<ClassifyData> {
    return this.http.post<ClassifyData>(this.url + 'api/classification', body);
  }
}
