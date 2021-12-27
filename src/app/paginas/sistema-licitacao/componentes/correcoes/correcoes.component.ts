import { Component, Input, OnInit } from '@angular/core';

import { SalvarDados } from 'src/app/classes/salvar-dados';
import { CorrecoesService } from 'src/app/providers/sistema-licitacao/correcoes.service';

interface Correcao {
  conteudo: string;
  status: 'Em Correção' | 'Em Análise' | 'Corrigido';
}

@Component({
  selector: 'app-correcoes',
  templateUrl: './correcoes.component.html',
  styleUrls: ['./correcoes.component.css'],
})
export class CorrecoesComponent implements OnInit {
  @Input() documentoID = '';
  @Input() modoExibicao: 'aberto' | 'fechado' = 'fechado';

  listaCorrecoes: Correcao[] = [
    // {
    //   conteudo: 'Corrigir o último parágrafo da Seção 14',
    //   status: 'Em Correção',
    // },
  ];
  salvandoCorrecoes = false;

  permissaoAdmin = false;
  classeSubitem = 'subitem';

  constructor(
    private salvarDados: SalvarDados,
    private correcoesProvider: CorrecoesService
  ) {}

  ngOnInit(): void {
    this.permissaoAdmin = this.salvarDados.get('permissaoAdmin');

    this.correcoesProvider.carregarCorrecoes(this.documentoID).subscribe({
      next: (res) => {
        const dados = JSON.parse(res.dados);
        this.listaCorrecoes = dados['listaCorrecoes'];
      },
    });
  }

  salvarListaCorrecoes() {
    const dados = JSON.stringify({
      listaCorrecoes: this.listaCorrecoes,
    });

    this.correcoesProvider.salvarCorrecoes(this.documentoID, dados).subscribe({
      next: (res) => (this.salvandoCorrecoes = false),
    });
  }

  obterTituloCheckbox(status: 'Em Correção' | 'Em Análise' | 'Corrigido') {
    switch (status) {
      case 'Em Correção':
        return 'Marcar como corrigido';
      case 'Em Análise':
        return 'Marcar como não corrigido';
      case 'Corrigido':
        return 'Corrigido';
    }
  }

  salvarCorrecao(
    index: number,
    status: 'Em Correção' | 'Em Análise' | 'Corrigido'
  ) {
    if (status === 'Corrigido') return;

    if (status === 'Em Correção') {
      this.listaCorrecoes[index].status = 'Em Análise';
    } else {
      this.listaCorrecoes[index].status = 'Em Correção';
    }

    this.salvandoCorrecoes = true;
    this.salvarListaCorrecoes();
  }

  excluirCorrecao(index: number) {
    this.listaCorrecoes.splice(index, 1);

    this.salvandoCorrecoes = true;
    this.salvarListaCorrecoes();
  }

  mudarStatus(
    index: number,
    status: 'Em Correção' | 'Em Análise' | 'Corrigido'
  ) {
    this.listaCorrecoes[index].status = status;

    this.salvandoCorrecoes = true;
    this.salvarListaCorrecoes();
  }

  adicionarCorrecao(textarea: HTMLTextAreaElement) {
    const conteudo = textarea.value;
    textarea.value = '';
    if (conteudo === '') return;

    this.listaCorrecoes.push({
      conteudo: conteudo,
      status: 'Em Correção',
    });

    this.salvandoCorrecoes = true;
    this.salvarListaCorrecoes();
  }
}
