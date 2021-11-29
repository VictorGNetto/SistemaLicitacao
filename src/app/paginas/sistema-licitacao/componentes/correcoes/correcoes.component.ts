import { Component, Input, OnInit } from '@angular/core';
import { SalvarDados } from 'src/app/classes/salvar-dados';
import { PermissaoService } from 'src/app/providers/sistema-licitacao/permissao.service';

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
  @Input() modoExibicao: 'aberto' | 'fechado' = 'fechado';

  listaCorrecoes: Correcao[] = [
    {
      conteudo:
        'Corrigir o último parágrafo da Seção 14 Corrigir o último parágrafo da Seção 14 Corrigir o último parágrafo da Seção 14 Corrigir o último parágrafo da Seção 14 Corrigir o último parágrafo da Seção 14 Corrigir o último parágrafo da Seção 14',
      status: 'Em Correção',
    },
    {
      conteudo: 'Corrigir o último parágrafo da Seção 14',
      status: 'Em Análise',
    },
    {
      conteudo: 'Corrigir o último parágrafo da Seção 14',
      status: 'Corrigido',
    },
    {
      conteudo: 'Corrigir o último parágrafo da Seção 14',
      status: 'Corrigido',
    },
    {
      conteudo: 'Corrigir o último parágrafo da Seção 14',
      status: 'Corrigido',
    },
    {
      conteudo: 'Corrigir o último parágrafo da Seção 14',
      status: 'Corrigido',
    },
    {
      conteudo: 'Corrigir o último parágrafo da Seção 14',
      status: 'Corrigido',
    },
    {
      conteudo: 'Corrigir o último parágrafo da Seção 14',
      status: 'Corrigido',
    },
    {
      conteudo: 'Corrigir o último parágrafo da Seção 14',
      status: 'Corrigido',
    },
    {
      conteudo: 'Corrigir o último parágrafo da Seção 14',
      status: 'Em Análise',
    },
  ];
  salvandoCorrecoes = false;

  permissaoRealizacaoAnalise = false;
  classeSubitem = 'subitem';

  constructor(
    private salvarDados: SalvarDados,
    private permissao: PermissaoService
  ) {}

  ngOnInit(): void {
    const infoSessao = this.salvarDados.get('infoSessao');
    const usuarioID = infoSessao['id'];

    this.permissao.obterPermissoes(usuarioID).subscribe({
      next: (res) => {
        this.permissaoRealizacaoAnalise = res.realizacaoAnalise;
        if (res.realizacaoAnalise) {
          this.classeSubitem = 'subitemAnalista';
        }
      },
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
      this.listaCorrecoes[index].status = "Em Análise";
    } else {
      this.listaCorrecoes[index].status = "Em Correção";
    }

    this.salvandoCorrecoes = true;
    setTimeout(() => {
      this.salvandoCorrecoes = false;
    }, 1000);
  }

  excluirCorrecao(index: number) {
    this.salvandoCorrecoes = true;

    setTimeout(() => {
      this.listaCorrecoes.splice(index, 1);
      this.salvandoCorrecoes = false;
    }, 2000);

  }

  mudarStatus(
    index: number,
    status: 'Em Correção' | 'Em Análise' | 'Corrigido'
  ) {
    this.listaCorrecoes[index].status = status;
    
    this.salvandoCorrecoes = true;
    setTimeout(() => {
      this.salvandoCorrecoes = false;
    }, 1000);
  }

  adicionarCorrecao(textarea: HTMLTextAreaElement) {
    const conteudo = textarea.value;
    textarea.value = "";

    if (conteudo === "") return;

    const index = this.listaCorrecoes.length;

    this.listaCorrecoes.push({
      conteudo: conteudo, status: 'Em Correção'
    });
    this.salvandoCorrecoes = true;

    setTimeout(() => this.salvandoCorrecoes = false, 500);
  }

}
