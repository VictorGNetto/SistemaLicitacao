import { Component, Input, OnInit } from '@angular/core';

interface Correcao {
  correcaoID: string;
  conteudo: string;
  status: 'Em Correção' | 'Em Análise' | 'Corrigido';
}

@Component({
  selector: 'app-correcoes',
  templateUrl: './correcoes.component.html',
  styleUrls: ['./correcoes.component.css'],
})
export class CorrecoesComponent implements OnInit {
  @Input() modoExibicao: 'aberto' | 'fechado' = 'fechado';

  listaCorrecoes: Correcao[] = [
    { correcaoID: '', conteudo: 'Corrigir o último parágrafo da Seção 14', status: 'Em Correção' },
    { correcaoID: '', conteudo: 'Corrigir o último parágrafo da Seção 14', status: 'Em Análise' },
    { correcaoID: '', conteudo: 'Corrigir o último parágrafo da Seção 14', status: 'Corrigido' },
  ]

  constructor() {}

  ngOnInit(): void {}
}
