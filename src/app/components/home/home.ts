import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PictureCard } from '../picture-card/picture-card';
import { RehearsalService } from '../../services/rehearsal-service';
import { RehearsalStore } from '../../stores/rehearsal-store';
import { ConcertService } from '../../services/concert-service';
import { ConcertStore } from '../../stores/concert-store';
import { MediaStore } from '../../stores/media-store';

@Component({
  selector: 'app-home',
  imports: [FormsModule, PictureCard, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  private heureConcert: Date | null = new Date("2026-06-21T20:30:00");
  private dateActuelle: Date = new Date();
  private stringDecompte: string = "Pas de concert de prévu...";
  private lieuConcert: string = "à " + " la fête de la musique d'Argences";
  private lienMaps: string = "https://maps.app.goo.gl/DNuxG6UBrrDvTutTA";
  
  // YouTube video
  private youtubeVideoId: string = "JGBokIr_tPw";
  youtubeEmbedUrl: SafeResourceUrl;
  
  // Newsletter
  newsletterEmail: string = '';
  newsletterMessage: string = '';
  newsletterStatus: 'success' | 'error' | '' = '';
  private isSubmitting: boolean = false;

  storeRehearsal = inject(RehearsalStore);
  concert = inject(ConcertStore);
  media = inject(MediaStore);

  constructor(private sanitizer: DomSanitizer){
    this.youtubeEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${this.youtubeVideoId}?rel=0&modestbranding=1`
    );
    if(this.heureConcert !== null && this.dateActuelle < this.heureConcert){
      this.dateActuelle = new Date();
      this.stringDecompte = this.reglageCompteur();
      setInterval(() => {
        this.dateActuelle = new Date();
        this.stringDecompte = this.reglageCompteur();
      }, 1000);
    }
    else
      this.heureConcert = null;
  }


  ngOnInit(): void {
    this.storeRehearsal.getAllRehearsals();
    this.storeRehearsal.getRehearsal(100);
    this.concert.getAllConcerts();
    this.media.getAllMedias();

  }

  private reglageCompteur(): string {
    if (this.heureConcert === null) {
      return "";
    }
    let diff = this.heureConcert.getTime() - this.dateActuelle.getTime();
    const diffJour = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
    diff -= diffJour * (1000 * 60 * 60 * 24)
    const diffHeure = Math.max(0, Math.floor(diff / (1000 * 60 * 60)));
    diff -= diffHeure * (1000 * 60 * 60)
    const diffMinute = Math.max(0, Math.floor(diff / (1000 * 60)));
    diff -= diffMinute * (1000 * 60)
    const diffSeconde = Math.max(0, Math.floor(diff / 1000 ));
    const deux = (n: number) => String(n).padStart(2, '0');
    return `${deux(diffJour)}j ${deux(diffHeure)}:${deux(diffMinute)}:${deux(diffSeconde)}`
  }

  public decompte(): string {
    return this.stringDecompte;
  }

  public getHeureConcert(){
    return this.heureConcert;
  }

  public getHeureActuelle(){
    return this.dateActuelle
  }

  public getLieuConcert(){
    return this.lieuConcert;
  }

  public ouvrirMaps(){
    window.open(this.lienMaps,"_blank");
  }

  public isSubmittingNewsletter(): boolean {
    return this.isSubmitting;
  }


  public getYouTubeEmbedUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${this.youtubeVideoId}?rel=0&modestbranding=1`
    );
  }

  public setYouTubeVideoId(videoId: string): void {
    this.youtubeVideoId = videoId;
  }
}
 