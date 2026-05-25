import { Injectable, signal } from "@angular/core";
import { ConcertService } from "../services/concert-service";
import { Concert } from "../components/concert/concert";

@Injectable({ providedIn: 'root' })

export class ConcertStore {

    private _concerts = signal<Concert[]>([]);
    private _concert = signal<Concert | undefined>(undefined);
    private _loading = signal<boolean>(false);
    private _error = signal<string | null>(null);

    concerts = this._concerts.asReadonly();
    concert = this._concert.asReadonly();
    loading = this._loading.asReadonly();
    error = this._error.asReadonly();
    

    public constructor(private concertService: ConcertService){}

    public getAllConcerts(): void {
        this._loading.set(true);
        this.concertService.getAll().subscribe({
            next: (data) => {
                this._concerts.set(data);
                this._loading.set(false);
            },
            error: (err) => {
                this._error.set("Erreur de chargement des concerts");
                this._loading.set(false);
            }
        })
    }


    
}