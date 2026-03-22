import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tarefas } from '../../model/tarefas';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  constructor(private httpClient: HttpClient) {}

  private readonly API = environment.apiUrl;

  update(id: number, tarefas: Tarefas) {
    return this.httpClient.put<Tarefas>(`${this.API}/${id}`, tarefas);
  }

  checkUpdate(id: number, realizado: boolean) {
    return this.httpClient.put<void>(`${this.API}/${id}/realizado`, {
      realizado,
    });
  }
}
