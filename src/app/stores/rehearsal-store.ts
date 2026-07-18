import { Injectable } from "@angular/core";
import { signal } from "@angular/core";
import { RehearsalService } from "../services/rehearsal-service";
import { Rehearsal } from "../models/rehearsal-model";

@Injectable({ providedIn: 'root' })

export class RehearsalStore {

    private _rehearsals = signal<Rehearsal[]>([]);
    private _rehearsal   = signal<Rehearsal | undefined>(undefined);
    private _loading    = signal<boolean>(false);
    private _error      = signal<string | null>(null);

    rehearsals = this._rehearsals.asReadonly();
    rehearsal   = this._rehearsal.asReadonly();
    loading    = this._loading.asReadonly();
    error      = this._error.asReadonly();
    

    public constructor(private rehearsalService: RehearsalService){}

    public getAllRehearsals(): void {
        this._loading.set(true);
        this.rehearsalService.getAll().subscribe({
            next: (data) => {
                this._rehearsals.set(data);
                this._loading.set(false);

            },
            error: (err) => {
                this._error.set("erreur lors du chargement des repettes : " + err);
                this._loading.set(false);
            }
        })
    }

    public getRehearsal(id: number): void {
        this._loading.set(true);
        this.rehearsalService.get(id).subscribe({
            next: (data) => {
                this._rehearsal.set(data);
                this._loading.set(false);

            },
            error: (err) => {
                this._error.set("erreur lors du chargement de cette repette avec l'id : " + id + " " + err);
                this._loading.set(false);
            }
        })
    }
}