import { StorageService } from './shared/storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'web-caderno-anotacoes';

  constructor(storageService: StorageService) {

  }

  ngOnInit(): void {

  }
}
