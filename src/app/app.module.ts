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

import { PgCriacaoDocumentoBaseComponent } from './paginas/sistema-licitacao/pg-criacao-documento-base/pg-criacao-documento-base.component';
import { PgPreenchimentoDocumentoComponent } from './paginas/sistema-licitacao/pg-preenchimento-documento/pg-preenchimento-documento.component';

import { PgTesteComponenteMensagemComponent } from './paginas/sistema-licitacao/pg-teste-componente-mensagem/pg-teste-componente-mensagem.component';
import { MensagemComponent } from './paginas/sistema-licitacao/componentes/mensagem/mensagem.component';
import { ItemNotaComponent } from './paginas/sistema-licitacao/componentes/item-nota/item-nota.component';
import { ItemTextoComponent } from './paginas/sistema-licitacao/componentes/item-texto/item-texto.component';
import { ItemOpcoesComponent } from './paginas/sistema-licitacao/componentes/item-opcoes/item-opcoes.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/sistemaLicitacao/criacaoDocumentoBase',
    pathMatch: 'full',
  },
  {
    path: 'sistemaLicitacao/criacaoDocumentoBase',
    component: PgCriacaoDocumentoBaseComponent,
  },
  {
    path: 'testeMensagens',
    component: PgTesteComponenteMensagemComponent,
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PgCriacaoDocumentoBaseComponent,
    PgPreenchimentoDocumentoComponent,
    PgTesteComponenteMensagemComponent,
    MensagemComponent,
    ItemNotaComponent,
    ItemTextoComponent,
    ItemOpcoesComponent
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
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
