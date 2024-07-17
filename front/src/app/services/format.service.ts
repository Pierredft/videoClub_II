import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Format from '../models/format.model';

@Injectable({
  providedIn: 'root'
})
export class FormatService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  constructor(private httpClient:HttpClient) { }

  getFormats() : Observable<Format[]>{
    return this.httpClient.get<Format[]>(`${this.apiUrl}/format`);
  }

  getFormat(id: number) : Observable<Format>{
    return this.httpClient.get<Format>(`${this.apiUrl}/format/${id}`);
  }

  addFormat(format: Format) : Observable<Format>{
    return this.httpClient.post<Format>(`${this.apiUrl}/format`, format);
}

  updateFormat(format: Format) : Observable<Format>{
    return this.httpClient.put<Format>(`${this.apiUrl}/format/${format.id}`, format);
  }

  deleteFormat(id: number) : Observable<Format>{
    return this.httpClient.delete<Format>(`${this.apiUrl}/format/${id}`);
  }
}
