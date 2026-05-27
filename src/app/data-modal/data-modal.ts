import { Component, inject } from '@angular/core';
import { Button } from 'primeng/button';
import { Router } from '@angular/router';


@Component({
  selector: 'app-data-modal',
  imports: [Button],
  templateUrl: './data-modal.html',
  styleUrl: './data-modal.css',
})
export class DataModal {

  private router = inject(Router)


  public link(chaine: string){
    this.router.navigate(['/creation/'+ chaine])
  }


  
}