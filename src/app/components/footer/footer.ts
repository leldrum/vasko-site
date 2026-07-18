import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {

  currentYear: number = new Date().getFullYear();

}
