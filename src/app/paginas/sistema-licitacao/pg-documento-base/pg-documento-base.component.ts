import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DocumentoBaseService } from 'src/app/providers/sistema-licitacao/documento-base.service';

@Component({
  selector: 'app-pg-documento-base',
  templateUrl: './pg-documento-base.component.html',
  styleUrls: ['./pg-documento-base.component.css'],
})
export class PgDocumentoBaseComponent implements OnInit {
  documentosBase = [
    { nome: 'Termo de Referência - Compra Direta', id: 'qwe-rtyu-iop' },
    { nome: 'Termo de Referência - Licitação', id: 'asd-fghj-klc' },
    { nome: 'Estudo Técnico Preliminar - Licitação', id: 'zxc-vbnm-zxc' },
  ];

  constructor(
    private documentoBaseProvider: DocumentoBaseService,
    private route: Router
  ) {}

  ngOnInit(): void {}

  // - Pede ao DocumentoBaseService que seja criado um Documento Base
  // - Acessa a página de criação de Documento Base utilizando o ID devolvido pelo DocumentoBaseService
  criarDocumentoBase() {
    let documentoBaseID = this.documentoBaseProvider.criaDocumentoBase();

    this.route.navigate([`/sistemaLicitacao/criacaoDocumentoBase/${documentoBaseID}`]);
  }
}
