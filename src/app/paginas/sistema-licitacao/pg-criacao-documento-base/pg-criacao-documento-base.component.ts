import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DocumentoBaseService } from 'src/app/providers/sistema-licitacao/documento-base.service';

interface Item {
  tipo: string;
  itemID: string;
}

interface Secao {
  nome: string;
  itens: Item[];
}

interface DocumentoBase {
  nomeDocumentoBase: string,
  secoes: Secao[]
}

@Component({
  selector: 'app-pg-criacao-documento-base',
  templateUrl: './pg-criacao-documento-base.component.html',
  styleUrls: ['./pg-criacao-documento-base.component.css'],
})
export class PgCriacaoDocumentoBaseComponent implements OnInit {
  nomeDocumentoBase: string = '';
  documentoBaseID: string = '';
  secoes: Secao[] = [
    {
      nome: '1ª Seção',
      itens: [
        // { tipo: 'nota', itemID: 'item novo 255' },
        // { tipo: 'texto', itemID: 'item novo 256' },
        // { tipo: 'opcoes', itemID: 'item novo 257' },
      ],
    },
  ];
  secaoSelecionada = 0;
  itensCriados = 0;

  constructor(
    private route: ActivatedRoute,
    private documentoBaseProvider: DocumentoBaseService
  ) {}

  ngOnInit(): void {
    this.documentoBaseID = this.route.snapshot.paramMap.get('documentoBaseID') ?? "";

    this.documentoBaseProvider.carregarDocumentoBase(this.documentoBaseID).subscribe({
      next: (documentoBase: DocumentoBase) => {
        this.nomeDocumentoBase = documentoBase.nomeDocumentoBase;
        this.secoes = documentoBase.secoes; 
      }
    });
  }

  adicionarSecao() {
    let qtdSecoes = this.secoes.length;
    let novaSecao: Secao = {
      nome: `${qtdSecoes + 1}ª Seção`,
      itens: [],
    };
    this.secoes.push(novaSecao);
  }

  removerSecao() {
    this.secoes.splice(this.secaoSelecionada, 1);
  }

  salvaNomeSecao(index: number, event: FocusEvent) {
    let target = event.target as HTMLInputElement;
    this.secoes[index].nome = target.value;
  }

  onMudancaSecao(selectedIndex: number) {
    this.secaoSelecionada = selectedIndex;
  }

  adicionarItem(tipo: string) {
    let index = this.secaoSelecionada;
    this.secoes[index].itens.push({
      tipo: tipo,
      itemID: `item novo ${this.itensCriados}`,
    });
    this.itensCriados++;
  }

  deletaItem(id: string) {
    const item = document.getElementById(id);
    let indexSecao = this.secaoSelecionada;
    let indexItem = this.secoes[indexSecao].itens.findIndex(
      (elem) => elem.itemID === id
    );
    this.secoes[indexSecao].itens.splice(indexItem, 1);
  }
}
