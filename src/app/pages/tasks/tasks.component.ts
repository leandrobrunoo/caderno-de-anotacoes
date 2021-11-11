
import { StorageService } from './../../shared/storage.service';
import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/shared/modal';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  formulario: any;

  tasks: Task[] = [];

  constructor(
    public storageService: StorageService,
    private title: Title,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.reloadTasks();

    this.configurarFormulario();
    this.title.setTitle('Lista de tarefas');
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      descricao: [null, [ this.validarObrigatoriedade, this.validarTamanhoMinimo(5) ]]
    });
  }

  validarObrigatoriedade(input: FormControl) {
    return (input.value ? null : { obrigatoriedade: true });
  }

  validarTamanhoMinimo(valor: number) {
    return (input: FormControl) => {
      return (!input.value || input.value.length >= valor) ? null : { tamanhoMinimo: { tamanho: valor } };
    };
  }

  salvar() {
    this.adicionarTasks(this.formulario.value);
    history.back();
    this.reloadTasks();
    this.formulario.reset();
  }

  adicionarTasks(tarefa: any) {
    this.storageService.set(tarefa);
  }

  temErro(control: FormControl, error: string): boolean {
    return control.hasError(error) && this.formulario.dirty;
  }

  private reloadTasks() {
    this.tasks = [];
    this.tasks.push(this.storageService.get(this.storageService.getDay()));
  }


}
