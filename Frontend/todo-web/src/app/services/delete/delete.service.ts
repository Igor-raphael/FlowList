import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DeleteService {
  constructor(private httpClient: HttpClient) {}

  private readonly API = environment.apiUrl;

  delete(id: number) {
    return this.httpClient.delete<void>(`${this.API}/${id}`);
  }
}
