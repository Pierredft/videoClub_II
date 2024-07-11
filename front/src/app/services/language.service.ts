import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Language from '../models/language.model';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private apiUrl = 'http://localhost:3000/api/language';
  constructor(private htppClient:HttpClient) { }

  getLanguages() : Observable<Language[]>{
    return this.htppClient.get<Language[]>(`${this.apiUrl}/language`);
  }

  getLanguage(id: number) : Observable<Language>{
    return this.htppClient.get<Language>(`${this.apiUrl}/language/${id}`);
  }

  addLanguage(language: Language) : Observable<Language>{
    return this.htppClient.post<Language>(`${this.apiUrl}/language/`, language);
  }

  updateLanguage(language: Language) : Observable<Language>{
    return this.htppClient.put<Language>(`${this.apiUrl}/language/${language.id}`, language);
  }

  delateLanguage(id: number) : Observable<Language>{
    return this.htppClient.delete<Language>(`${this.apiUrl}/language/${id}`);
  }
}
