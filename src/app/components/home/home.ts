import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  private heureConcert: Date | null = new Date("2026-06-21T20:30:00");
  private dateActuelle: Date = new Date();
  private stringDecompte: string = "Pas de concert de prévu...";
  private lieuConcert: string = "à " + " la fête de la musique d'Argences";
  private lienMaps: string = "https://maps.app.goo.gl/DNuxG6UBrrDvTutTA";
  
  // YouTube video
  private youtubeVideoId: string = "JGBokIr_tPw?si=bESoHfaKl3vU9ATG"; 
  
  // Newsletter
  newsletterEmail: string = '';
  newsletterMessage: string = '';
  newsletterStatus: 'success' | 'error' | '' = '';
  private isSubmitting: boolean = false;

  constructor(private sanitizer: DomSanitizer){
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

  public subscriberNewsletter(): void {
    if (!this.newsletterEmail || !this.newsletterEmail.includes('@')) {
      this.newsletterMessage = 'Veuillez entrer une adresse email valide';
      this.newsletterStatus = 'error';
      return;
    }

    this.isSubmitting = true;
    this.newsletterMessage = '';
    this.newsletterStatus = '';

    // Simule un appel API (à remplacer par un vrai service)
    setTimeout(() => {
      // Pour l'instant, on suppose que ça marche
      this.newsletterMessage = `✓ Merci ! Un email de confirmation a été envoyé à ${this.newsletterEmail}`;
      this.newsletterStatus = 'success';
      this.newsletterEmail = '';
      this.isSubmitting = false;

      // Efface le message après 5 secondes
      setTimeout(() => {
        this.newsletterMessage = '';
        this.newsletterStatus = '';
      }, 5000);
    }, 1000);
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
 