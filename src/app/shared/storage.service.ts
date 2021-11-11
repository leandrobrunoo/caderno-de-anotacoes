import { Task } from './modal';
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  datepipe: DatePipe = new DatePipe('en-US')
  task = new Task();

  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  set(tarefa: any): boolean {

    if (this.storage) {
      this.task = this.get(this.getDay());

      if(!this.task.descricoes) {
        this.task = new Task();
      }

      this.task.data = this.getDay();
      this.task.descricoes.push(tarefa.descricao);

      this.storage.setItem(this.getDay(), JSON.stringify(this.task));
      return true;
    }
    return false;
  }

  get(key: string) {
    if (this.storage) {
       let dados = JSON.parse(localStorage.getItem(key) || '[]')
       return dados;
    }
    return [];
  }

  remove(key: string): boolean {
    if (this.storage) {
      this.storage.removeItem(key);
      return true;
    }
    return false;
  }

  clear(): boolean {
    if (this.storage) {
      this.storage.clear();
      return true;
    }
    return false;
  }

  getDay(): any {
    console.log(this.datepipe.transform(new Date(), 'dd/MM/YYYY'))
    return this.datepipe.transform(new Date(), 'dd/MM/YYYY');
  }

}
