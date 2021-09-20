import { Component, OnInit } from '@angular/core';

interface Item {
  nome: string,
  itens: string[]
}

@Component({
  selector: 'app-pg-criacao-documento-base',
  templateUrl: './pg-criacao-documento-base.component.html',
  styleUrls: ['./pg-criacao-documento-base.component.css']
})
export class PgCriacaoDocumentoBaseComponent implements OnInit {

  nomeDocumentoBase: string = "";
  secoes: Item[] = [
    {
      nome: '1ª Seção',
      itens: [
        'item 1',
        'item 2',
        'item 3',
      ]
    }
  ];
  secaoSelecionada = 0;

  constructor() { }

  ngOnInit(): void {
  }

  adicionarSecao() {
    let qtdSecoes = this.secoes.length;
    let novaSecao: Item = {
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
}