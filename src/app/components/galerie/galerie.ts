import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PictureCard } from '../picture-card/picture-card';
import { MediaStore } from '../../stores/media-store';
import { Media } from '../../models/media-model';



@Component({
  selector: 'app-galerie',
  imports: [PictureCard],
  templateUrl: './galerie.html',
  styleUrl: './galerie.css'
})
export class Galerie implements OnInit {

  mediaStore = inject(MediaStore);


  filtres = [
    { nom: 'Tous', valeur: 'tous' },
    { nom: 'Concerts', valeur: 'concert' },
    { nom: 'Studio', valeur: 'studio' },
    { nom: 'Backstage', valeur: 'backstage' }
  ];



  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.mediaStore.getAllMedias();
  }



}
