import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterOutlet } from '@angular/router';
import { RechercheArticlesComponent } from "./recherche-articles/recherche-articles.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RechercheArticlesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Bienvenue chez ecommerce';
  msgToSecond = 'Welcome in second component';

  constructor(private router : Router, private route: ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute=()=> false;
  }

  invocation() {
    this.router.navigate(['/panier'])
  }
}
