import { Injectable } from "@angular/core";
import { signal } from "@angular/core";
import { RehearsalService } from "../services/rehearsal-service";
import { Rehearsal } from "../models/rehearsal-model";
import { MediaService } from "../services/media-service";
import { Media } from "../models/media-model";

@Injectable({ providedIn: 'root' })

export class MediaStore {

    private _medias = signal<Media[]>([]);
    private _media = signal<Media | undefined>(undefined);
    private _loading = signal<boolean>(false);
    private _error = signal<string | null>(null);

    medias = this._medias.asReadonly();
    media = this._media.asReadonly();
    loading = this._loading.asReadonly();
    error = this._error.asReadonly();
    

    public constructor(private mediaService: MediaService){}

    public getAllMedias(): void {
        this._loading.set(true);
        this.mediaService.getAll().subscribe({
            next: (data) => {
                this._medias.set(data);
                this._loading.set(false);

            },
            error: (err) => {
                this._error.set("erreur lors du chargement des medias : " + err);
                this._loading.set(false);
            }
        })
    }
    
    public getMedia(id: number): void {
        this._loading.set(true);
        this.mediaService.get(id).subscribe({
            next: (data) => {
                this._media.set(data);
                this._loading.set(false);

            },
            error: (err) => {
                this._error.set("erreur lors du chargement de ce media avec l'id : " + id + " " + err);
                this._loading.set(false);
            }
        })
    }
}