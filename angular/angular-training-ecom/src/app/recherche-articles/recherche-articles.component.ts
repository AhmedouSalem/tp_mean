import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recherche-articles',
  imports: [NgFor, FormsModule],
  templateUrl: './recherche-articles.component.html',
  styleUrl: './recherche-articles.component.css'
})
export class RechercheArticlesComponent implements OnInit{
  rayons: string[] = [];
  marques: string[] = [];
  selectedRayon: string = "*";
  selectedMarque: string = "*";
  selectedPrix: string = "*";
  intervallesPrix: any[] = [];

  constructor(protected articleServie: ApiService,protected router: Router) {}

  async ngOnInit() {
    try {
      this.rayons = await this.articleServie.getRayons();
      this.marques = await this.articleServie.getMarques();
    
    } catch (error) {
      console.error("An error occurred:", error);
    }

    this.generateIntervallesPrix();
  }

  onSubmit() {
    console.log('Formulaire soumis avec', this.selectedRayon, 'et', this.selectedMarque);
    this.router.navigate(['/catalogue', this.selectedRayon, this.selectedMarque, this.selectedPrix]);
  }

  generateIntervallesPrix() {
    let i = 0, max = 0;
    for (i = 0; i < 15; i++) {
      max = (i + 1) * 100;
      this.intervallesPrix.push({max: max, label: `Jusqu'à ${max}€`})
    }
    this.intervallesPrix.push({max: 100000, label: `Plus de ${max}€`})
  }
}
