import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pg-criacao-documento-base',
  templateUrl: './pg-criacao-documento-base.component.html',
  styleUrls: ['./pg-criacao-documento-base.component.css']
})
export class PgCriacaoDocumentoBaseComponent implements OnInit {

  nomeDocumentoBase: string = "";
  secoes: string[] = [
    "1ª Seção"
  ];
  secaoSelecionada = 0;

  constructor() { }

  ngOnInit(): void {
  }

  adicionarSecao() {
    let qtdSecoes = this.secoes.length;
    this.secoes.push(`${qtdSecoes + 1}ª Seção`);
    console.log(this.secoes);
  }

  removerSecao() {
    this.secoes.splice(this.secaoSelecionada, 1);
  }

  salvaNomeSecao(index: number, event: FocusEvent) {
    let target = event.target as HTMLInputElement;
    this.secoes[index] = target.value;
  }

  onMudancaSecao(selectedIndex: number) {
    this.secaoSelecionada = selectedIndex;
  }

}
