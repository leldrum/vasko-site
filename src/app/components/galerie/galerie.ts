import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PictureCard } from '../picture-card/picture-card';

export interface Photo {
  id: number;
  image: string;
  titre: string;
  description: string;
  date: string;
  categorie: 'concert' | 'studio' | 'backstage' | 'evenement';
  lieu: string;
}

@Component({
  selector: 'app-galerie',
  imports: [PictureCard],
  templateUrl: './galerie.html',
  styleUrl: './galerie.css'
})
export class Galerie implements OnInit {

  filtreActif: string = 'tous';
  lightboxActive: boolean = false;
  photoSelectionnee: Photo | null = null;
  indexPhotoActuelle: number = 0;

  filtres = [
    { nom: 'Tous', valeur: 'tous' },
    { nom: 'Concerts', valeur: 'concert' },
    { nom: 'Studio', valeur: 'studio' },
    { nom: 'Backstage', valeur: 'backstage' }
  ];

  fotos: Photo[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Photo[]>('data/photos.json').subscribe(data => {
      this.fotos = data;
    });
  }

  public setFiltre(filtre: string): void {
    this.filtreActif = filtre;
  }

  public getFotosFiltrees(): Photo[] {
    if (this.filtreActif === 'tous') {
      return this.fotos;
    }
    return this.fotos.filter(foto => foto.categorie === this.filtreActif);
  }

  public ouvrirLightbox(photo: Photo): void {
    this.photoSelectionnee = photo;
    this.indexPhotoActuelle = this.getFotosFiltrees().findIndex(f => f.id === photo.id);
    this.lightboxActive = true;
    document.body.style.overflow = 'hidden';
  }

  public fermerLightbox(): void {
    this.lightboxActive = false;
    this.photoSelectionnee = null;
    document.body.style.overflow = 'auto';
  }

  public precedent(): void {
    const fotos = this.getFotosFiltrees();
    this.indexPhotoActuelle = (this.indexPhotoActuelle - 1 + fotos.length) % fotos.length;
    this.photoSelectionnee = fotos[this.indexPhotoActuelle];
  }

  public suivant(): void {
    const fotos = this.getFotosFiltrees();
    this.indexPhotoActuelle = (this.indexPhotoActuelle + 1) % fotos.length;
    this.photoSelectionnee = fotos[this.indexPhotoActuelle];
  }

  ngOnDestroy(): void {
    document.body.style.overflow = 'auto';
  }

}
