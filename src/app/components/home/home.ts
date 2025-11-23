import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  private heureConcert: Date | null = new Date("2025-12-05T20:30:00");
  private dateActuelle: Date = new Date();
  private stringDecompte: string = "Pas de concert de prévu...";
  private lieuConcert: string = "à " + " la salle multiraquettes de Moult ";
  private lienMaps: string = "https://maps.app.goo.gl/izcZarRvjXhap3nx9";

  constructor(){
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


}
