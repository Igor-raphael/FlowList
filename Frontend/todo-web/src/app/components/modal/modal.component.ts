import { Component, EventEmitter, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { TarefaDTO } from '../../model/TarefaDTO';
import { CreateService } from '../../services/create/create.service';
import { Tarefas } from '../../model/tarefas';
import { UpdateService } from '../../services/update/update.service';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [NgIf, FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  toast = inject(ToastrService);

  constructor(
    private createService: CreateService,
    private updateService: UpdateService,
  ) {}

  showForm: boolean = false;
  overlay: boolean = false;

  EditID: number | null = null;

  tarefa: string = '';
  descricao: string = '';
  realizado: boolean = false;

  prioridades = {
    prioridade: null as 'BAIXA' | 'MEDIA' | 'ALTA' | null,
  };

  @Output() reload = new EventEmitter<void>();

  mode: 'create' | 'edit' = 'create';

  get submitLabel(): string {
    return this.mode === 'edit' ? 'Alterar tarefa' : 'Criar Tarefa';
  }

  createTarefa() {
    this.mode = 'create';
    this.EditID = null;
    this.tarefa = '';
    this.descricao = '';
    this.prioridades.prioridade = null;
    this.formToggle();
  }

  editTarefa(t: Tarefas) {
    this.mode = 'edit';
    this.EditID = t.id;
    this.tarefa = t.nome;
    this.descricao = t.descricao;
    this.prioridades.prioridade = t.prioridade;
    this.formToggle();
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;
    if (this.prioridades.prioridade === null) return;

    if (this.EditID === null) {
      const payloadCreate: TarefaDTO = {
        nome: form.value.tarefa,
        descricao: form.value.descricao,
        realizado: false,
        prioridade: form.value.prioridade,
      };

      this.createService.create(payloadCreate).subscribe({
        next: () => {
          this.reload.emit();
          form.resetForm({ prioridade: null });
          this.formToggle();
          this.toast.success('Tarefa criada com sucesso.');
        },

        error: () => {
          this.toast.error('Error ao criar tarefa.');
        },
      });
    } else {
      const payloadUpdate = {
        id: this.EditID,
        nome: this.tarefa,
        descricao: this.descricao,
        realizado: this.realizado,
        prioridade: this.prioridades.prioridade,
      };

      this.updateService.update(this.EditID, payloadUpdate).subscribe({
        next: () => {
          this.reload.emit();
          this.formToggle();
          this.toast.success('Tarefa alterada com sucesso.');
        },

        error: () => {
          this.toast.error('Error ao alterar tarefa.');
        },
      });
    }
  }

  formToggle() {
    this.showForm = !this.showForm;
    this.overlay = !this.overlay;
  }
}
