import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SessaoService {
  constructor(private http: HttpClient) {}

  /**
   * Recebe o ID de uma sessão, requisita ao backend as informações dessa
   * sessão e então retorna essas informações
   * 
   * @param sessaoID é o ID da sessão
   * @returns as informações da sessão
   */
  obterInfoSessao(sessaoID: string): Observable<{ infoSessao: any }> {
    const url =
      environment.urlBase + `obter-info-sessao.php?sessaoID=${sessaoID}`;

    interface respostaInfoSessao {
      infoSessao: any;
    }

    return this.http.get<respostaInfoSessao>(url).pipe(
      map((res) => {
        return { infoSessao: res.infoSessao };
      })
    );
  }
}
