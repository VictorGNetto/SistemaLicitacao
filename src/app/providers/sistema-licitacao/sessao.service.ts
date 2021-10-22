import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessaoService {

  constructor(private http: HttpClient) {}

  // - Recebe o ID de uma sessão e requisita ao backend
  //   as informações dessa sessão
  obterInfoSessao(sessaoID: string) {
    const url = environment.urlBase + `obter-info-sessao.php?sessaoID=${sessaoID}`;

    interface respostaInfoSessao {
      infoSessao: any
    }

    return this.http
      .get<respostaInfoSessao>(url)
      .pipe(map(res => res.infoSessao));
  }
}
