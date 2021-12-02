import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Páginas do sistema
import { PgSistemaLicitacaoComponent } from './paginas/sistema-licitacao/pg-sistema-licitacao/pg-sistema-licitacao.component';
import { PgDocumentoBaseComponent } from './paginas/sistema-licitacao/pg-documento-base/pg-documento-base.component';
import { PgCriacaoDocumentoBaseComponent } from './paginas/sistema-licitacao/pg-criacao-documento-base/pg-criacao-documento-base.component';
import { PgPreenchimentoDocumentoComponent } from './paginas/sistema-licitacao/pg-preenchimento-documento/pg-preenchimento-documento.component';

import { ItemNotaComponent } from './paginas/sistema-licitacao/componentes/item-nota/item-nota.component';
import { ItemTextoComponent } from './paginas/sistema-licitacao/componentes/item-texto/item-texto.component';
import { ItemOpcoesComponent } from './paginas/sistema-licitacao/componentes/item-opcoes/item-opcoes.component';
import { TextareaAutoresizeDirective } from './diretivas/textarea-autoresize.directive';
import { PgEntradaSistemaLicitacaoComponent } from './paginas/sistema-licitacao/pg-entrada-sistema-licitacao/pg-entrada-sistema-licitacao.component';
import { PgDocumentoComponent } from './paginas/sistema-licitacao/pg-documento/pg-documento.component';
import { ListaDocumentoBaseDialog } from './paginas/sistema-licitacao/pg-documento/pg-documento.component';
import { ConfirmacaoExclusaoDocumentoBaseDialog } from './paginas/sistema-licitacao/pg-documento-base/pg-documento-base.component';
import { ConfirmacaoExclusaoDocumentoDialog } from './paginas/sistema-licitacao/pg-documento/pg-documento.component';
import { PgPortalAbcComponent } from './paginas/sistema-licitacao/pg-portal-abc/pg-portal-abc.component';
import { PgAnaliseDocumentoComponent } from './paginas/sistema-licitacao/pg-analise-documento/pg-analise-documento.component';
import { PgVisualizacaoDocumentoComponent } from './paginas/sistema-licitacao/pg-visualizacao-documento/pg-visualizacao-documento.component';
import { ItemListaComponent } from './paginas/sistema-licitacao/componentes/item-lista/item-lista.component';
import { CorrecoesComponent } from './paginas/sistema-licitacao/componentes/correcoes/correcoes.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/sistemaLicitacao',
    pathMatch: 'full',
  },
  {
    path: 'entradaSistemaLicitacao',
    component: PgEntradaSistemaLicitacaoComponent,
  },
  {
    path: 'sistemaLicitacao',
    component: PgSistemaLicitacaoComponent,
  },
  {
    path: 'sistemaLicitacao/documento',
    component: PgDocumentoComponent,
  },
  {
    path: 'sistemaLicitacao/documentoBase',
    component: PgDocumentoBaseComponent,
  },
  {
    path: 'sistemaLicitacao/analiseDocumento',
    component: PgAnaliseDocumentoComponent,
  },
  {
    path: 'sistemaLicitacao/criacaoDocumentoBase/:documentoBaseID',
    component: PgCriacaoDocumentoBaseComponent,
  },
  {
    path: 'sistemaLicitacao/preenchimentoDocumento/:documentoID',
    component: PgPreenchimentoDocumentoComponent,
  },
  {
    path: 'sistemaLicitacao/visualizacaoDocumento/:documentoID',
    component: PgVisualizacaoDocumentoComponent,
  },
  {
    path: 'portalABC',
    component: PgPortalAbcComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    PgCriacaoDocumentoBaseComponent,
    PgPreenchimentoDocumentoComponent,
    ItemNotaComponent,
    ItemTextoComponent,
    ItemOpcoesComponent,
    PgSistemaLicitacaoComponent,
    PgDocumentoBaseComponent,
    TextareaAutoresizeDirective,
    PgEntradaSistemaLicitacaoComponent,
    PgDocumentoComponent,
    ListaDocumentoBaseDialog,
    ConfirmacaoExclusaoDocumentoBaseDialog,
    ConfirmacaoExclusaoDocumentoDialog,
    PgPortalAbcComponent,
    PgAnaliseDocumentoComponent,
    PgVisualizacaoDocumentoComponent,
    ItemListaComponent,
    CorrecoesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTabsModule,
    MatRadioModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
