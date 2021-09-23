import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Item {
  tipo: string,
  id: string,
}

interface Secao {
  nome: string,
  itens: Item[]
}

@Component({
  selector: 'app-pg-criacao-documento-base',
  templateUrl: './pg-criacao-documento-base.component.html',
  styleUrls: ['./pg-criacao-documento-base.component.css']
})
export class PgCriacaoDocumentoBaseComponent implements OnInit {

  nomeDocumentoBase: string = "";
  documentoBaseID: string | null = "";
  secoes: Secao[] = [
    {
      nome: '1ª Seção',
      itens: [
        // { tipo: 'nota', id: 'item novo 255' },
        // { tipo: 'texto', id: 'item novo 256' },
        // { tipo: 'opcoes', id: 'item novo 257' },
      ]
    }
  ];
  secaoSelecionada = 0;
  itensCriados = 0;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.documentoBaseID = this.route.snapshot.paramMap.get('documentoBaseID');
  }

  adicionarSecao() {
    let qtdSecoes = this.secoes.length;
    let novaSecao: Secao = {
      nome: `${qtdSecoes + 1}ª Seção`,
      itens: []
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
      tipo: tipo, id: `item novo ${this.itensCriados}`
    });
    this.itensCriados++;
  }

  deletaItem(id: string) {
    const item = document.getElementById(id);
    let indexSecao = this.secaoSelecionada;
    let indexItem = this.secoes[indexSecao].itens.findIndex(elem => elem.id === id);
    this.secoes[indexSecao].itens.splice(indexItem, 1);
  }
}