import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  serveur = "http://localhost:4000/";

  constructor(protected httpClient : HttpClient) {

  }

  public getArticles(rayon: string, marque: string, prixMax: string) : Promise<Object[]> {
    let route = this.serveur + "catalogue/"+rayon+"/"+marque+"/"+prixMax;
    console.log(route);
    return firstValueFrom(this.httpClient.get<Object[]>(route))
  }

  public getRayons() : Promise<string[]> {
    return firstValueFrom(this.httpClient.get<string[]>(this.serveur+"catalogue/rayons"))
  }

  public getMarques(): Promise<string[]> {
    return firstValueFrom(this.httpClient.get<string[]>(this.serveur+"catalogue/marques"))
  }
}
