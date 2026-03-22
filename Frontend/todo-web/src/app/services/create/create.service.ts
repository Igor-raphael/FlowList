import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TarefaDTO } from '../../model/TarefaDTO';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CreateService {
  private readonly API = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  create(payload: TarefaDTO) {
    return this.httpClient.post(`${this.API}/create`, payload);
  }
}
