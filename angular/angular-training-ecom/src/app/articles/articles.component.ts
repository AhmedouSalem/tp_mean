import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { PanierStore } from '../panier.store';

@Component({
  selector: 'app-articles',
  imports: [NgFor],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent implements OnInit{
  articles: any[] = [];
  rayon: string = "*";
  marque: string = "*"
  prixMax: string = "*";
  panier = inject(PanierStore);

  constructor(protected articleService: ApiService,
    protected route: ActivatedRoute,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = ()=>false;
  }

  async ngOnInit() {
    this.route.params.subscribe(params => {
      if(params['rayon'] !== undefined) this.rayon = params['rayon'];
      if(params['marque'] !== undefined) this.marque = params['marque'];
      if(params['prixMax'] !== undefined) this.prixMax = params['prixMax'];
    });

    console.log("Liste des articles de rayon", this.rayon, "de marque", this.marque, "et de prix max", this.prixMax);

    try {
      //this.articles = await this.articleService.getArticles()
      this.articles = await this.articleService.getArticles(this.rayon, this.marque, this.prixMax);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  ajouterProduit(nom: string) {
    this.panier.ajouterProduit(nom);
  }
}
