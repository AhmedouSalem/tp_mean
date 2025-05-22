import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-second',
  imports: [],
  templateUrl: './second.component.html',
  styleUrl: './second.component.css'
})
export class SecondComponent {
  msg = '';
  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.msg = nav?.extras?.state?.['msg'] ?? 'Aucun message reçu';
  }
}
