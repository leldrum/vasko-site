import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

export interface ConcertData {
  id: number;
  nom: string;
  lieu: string;
  date: string;
  description: string;
  image: string | null;
  lienMaps: string | null;
  type: string;
}

@Component({
  selector: 'app-concert',
  imports: [RouterLink],
  templateUrl: './concert.html',
  styleUrl: './concert.css'
})
export class Concert implements OnInit, OnDestroy {

  concerts: ConcertData[] = [];
  prochainConcert: ConcertData | null = null;
  decompte: string = '';
  filtreAnnee: string = 'tous';
  annees: string[] = ['tous'];

  totalConcerts: number = 0;
  totalVilles: number = 0;
  totalAnnees: number = 0;

  private intervalId: any;

  private moisNoms = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
  private moisComplets = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<ConcertData[]>('data/concerts.json').subscribe(data => {
      this.concerts = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      this.calculerStats();
      this.extraireAnnees();
      this.trouverProchainConcert();
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private calculerStats(): void {
    const maintenant = new Date();
    const concertsPasses = this.concerts.filter(c => new Date(c.date) < maintenant);
    this.totalConcerts = concertsPasses.length;
    this.totalVilles = new Set(concertsPasses.map(c => c.lieu)).size;
    const anneesSet = new Set(concertsPasses.map(c => new Date(c.date).getFullYear()));
    this.totalAnnees = anneesSet.size;
  }

  private extraireAnnees(): void {
    const anneesSet = new Set(this.concerts.map(c => String(new Date(c.date).getFullYear())));
    this.annees = ['tous', ...Array.from(anneesSet).sort((a, b) => Number(b) - Number(a))];
  }

  private trouverProchainConcert(): void {
    const maintenant = new Date();
    const futurs = this.concerts
      .filter(c => new Date(c.date) > maintenant)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    if (futurs.length > 0) {
      this.prochainConcert = futurs[0];
      this.majDecompte();
      this.intervalId = setInterval(() => this.majDecompte(), 1000);
    }
  }

  private majDecompte(): void {
    if (!this.prochainConcert) return;
    const cible = new Date(this.prochainConcert.date).getTime();
    let diff = cible - new Date().getTime();

    if (diff <= 0) {
      this.decompte = "C'est maintenant !";
      if (this.intervalId) clearInterval(this.intervalId);
      return;
    }

    const jours = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= jours * (1000 * 60 * 60 * 24);
    const heures = Math.floor(diff / (1000 * 60 * 60));
    diff -= heures * (1000 * 60 * 60);
    const minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * (1000 * 60);
    const secondes = Math.floor(diff / 1000);

    const pad = (n: number) => String(n).padStart(2, '0');
    this.decompte = `${pad(jours)}j ${pad(heures)}:${pad(minutes)}:${pad(secondes)}`;
  }

  setFiltreAnnee(annee: string): void {
    this.filtreAnnee = annee;
  }

  getConcertsAVenir(): ConcertData[] {
    const maintenant = new Date();
    let futurs = this.concerts
      .filter(c => new Date(c.date) > maintenant)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    if (this.filtreAnnee !== 'tous') {
      futurs = futurs.filter(c => String(new Date(c.date).getFullYear()) === this.filtreAnnee);
    }
    return futurs;
  }

  getConcertsPasses(): ConcertData[] {
    const maintenant = new Date();
    let passes = this.concerts
      .filter(c => new Date(c.date) <= maintenant)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    if (this.filtreAnnee !== 'tous') {
      passes = passes.filter(c => String(new Date(c.date).getFullYear()) === this.filtreAnnee);
    }
    return passes;
  }

  getDateFormatee(dateStr: string): string {
    const d = new Date(dateStr);
    return `${d.getDate()} ${this.moisComplets[d.getMonth()]} ${d.getFullYear()}`;
  }

  getJour(dateStr: string): string {
    return String(new Date(dateStr).getDate()).padStart(2, '0');
  }

  getMois(dateStr: string): string {
    return this.moisNoms[new Date(dateStr).getMonth()];
  }

  getAnnee(dateStr: string): string {
    return String(new Date(dateStr).getFullYear());
  }

  getHeure(dateStr: string): string {
    const d = new Date(dateStr);
    return `${String(d.getHours()).padStart(2, '0')}h${String(d.getMinutes()).padStart(2, '0')}`;
  }

  getTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      'fete-musique': 'Fête de la musique',
      'festival': 'Festival',
      'soiree': 'Soirée',
      'prive': 'Privé'
    };
    return labels[type] || type;
  }

  ouvrirMaps(lien: string): void {
    window.open(lien, '_blank');
  }
}
