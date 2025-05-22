import { Component, inject } from '@angular/core';
import { PanierStore } from '../panier.store';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-panier',
  imports: [],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css'
})
export class PanierComponent {
  panier = inject(PanierStore);

  constructor(protected router: Router, protected route: ActivatedRoute) {
    
  }
  viderPanier() {
    this.panier.vierPanier();
    this.router.navigate([''])
  }
}
