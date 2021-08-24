import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-metadadosdocumento',
  templateUrl: './metadadosdocumento.component.html',
  styleUrls: ['./metadadosdocumento.component.css']
})
export class MetadadosdocumentoComponent implements OnInit {

  servidor: string = "Januário de Fevereiro Márcio";
  tipo: string = "Termo de Referência - Compra Direta";
  codigo: string = "xxx-xxxx-xxx";
  status: string = "preenchimento"

  constructor() { }

  ngOnInit(): void {
  }

}
