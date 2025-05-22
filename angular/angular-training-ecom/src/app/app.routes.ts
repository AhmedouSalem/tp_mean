import { Routes } from '@angular/router';
import { SecondComponent } from './second/second.component';
import { AppComponent } from './app.component';
import { ArticlesComponent } from './articles/articles.component';
import { PanierComponent } from './panier/panier.component';

export const routes: Routes = [
    {
        path: '',  // renvoie tous les articles
        component: ArticlesComponent,
        pathMatch: 'full'
    },
    {
        path: 'catalogue/:rayon/:marque/:prixMax',
        component: ArticlesComponent,
        pathMatch: 'full'
    },
    {
        path: 'second',
        component: SecondComponent,
        pathMatch: 'full',
    },
    {
        path: 'panier',
        component: PanierComponent,
        pathMatch: 'full',
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    },
];
